
/** 
    * ### Architect
    * a more in depth project architecture setup, allowing more robust configuration, munipulation and data flows
*/
module.exports = (Pocket) => {
    const { objectSize, isFunction, onerror, warn, log, isString } = require('./utils')

    // work with 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

    /**
     * protected prototype exluded from `Architect`
     */
    function ArchitectModel() {
        this._architectVal = null
        this.architect = Object.create(ArchitectModel.prototype, {
            value: {
                enumerable: true,
                configurable: true,
                get: () => {
                    return this._architectVal
                },
                set: (v) => {
                    if (!objectSize(v)) return
                    this._architectVal = v
                    log(`[architect] updated`)
                }
            }
        })
    }

    return class Architect extends Pocket {
        constructor(opts, debug) {
            super(opts, debug)

            this.architectConfig = {}
            const archModel = new ArchitectModel()
            this.architectMod = archModel.architect
        }

        setArchitect(projectID, val) {
            if (this.architectConfig[projectID] === undefined) this.architectConfig[projectID] = this.architectMod
            this.architectConfig[projectID]['value'] = Object.assign({}, this.architectConfig[projectID]['value'], val)
            return this
        }

        getArchitect(projectID) {
            return (this.architectConfig[projectID] || {})['value']
        }

    /** 
       * @param assetName string, specify the name you chose in your `$architect(...)` declaration,
       * @param asCallback when exists, return asset as callback
       * @param projectID optional, update selector and return desired asset
       * @returns if callback is returned the same value is returned
      */
        asset(assetName, asCallback, projectID) {
            if (!isFunction(asCallback)) {
                if (this.debug) warn(`[$asset] asCallback must be a function`)
                return null
            }
            // reserved names
            if (assetName === 'project' || assetName === 'cache') {
                if (this.debug) warn(`[$asset] 'project, cache' are  restricted`)
                return undefined
            }
            const lastProject = this.lastProjectID(projectID) // in case we are calling `$architect` on existing project
            projectID = this.validProjectID(lastProject || projectID)

            if (this.getArchitect(projectID)) {
                if (this.getArchitect(projectID)[assetName] !== undefined) {
                    return asCallback.call(this, this.getArchitect(projectID)[assetName])
                } else {
                    if (this.debug) warn(`[$asset] assetName for architect doesnt exist`)
                    return null
                }
            } else {
                if (this.debug) warn(`[$asset] architectConfig for assetName doesnt exist`)
                return null
            }
        }

        /** 
          * - can be used as a project setter same as `$payload` or `$project`, but with additional configuration
          * 
          * @param cb required, must return project settings: `{project:{payloadData}, asset:{value, name}, cache:{project, asset}}
          * @param projectID optional
          * @returns self
         */
        architect(cb, projectID) {

            if (!isFunction(cb)) {
                if (this.debug) onerror(`[$architect] callback must be set`)
                return this
            }

            const config = cb.call(this/** ,?? */)

            if (!objectSize(config)) {
                if (this.debug) onerror(`[architect] must return a valid object settings {project, asset}, at least 1 is required`)
                return this
            }

            const configProjectID = (config['project'] || {}).id
            const lastProject = this.lastProjectID(projectID) // in case we are calling `$architect` on existing project
            projectID = this.validProjectID(lastProject || projectID || configProjectID)

            if (!projectID) {
                if (this.debug) onerror(`[$architect] if this is a new project, you must specify projectID`)
                return this
            }
            const validConfig = Object.entries(config).reduce((n, [k, value]) => {
                if (['project', 'asset', 'cache'].indexOf(k) !== -1) n[k] = value
                return n
            }, {})

            // default setting for `architect.cache` if getArchitect not stored
            if (!(this.getArchitect(projectID) || {})['cache']) {
                const defaults = { project: false, asset: false }
                if (!validConfig['cache']) validConfig['cache'] = defaults

                this.setArchitect(projectID, {
                    'cache': validConfig['cache']
                })

            } else validConfig['cache'] = this.getArchitect(projectID)['cache']

            for (let k in validConfig) {
                const item = validConfig[k]
                // get last cache overide
                const cached = validConfig['cache'][k] === true && (k === 'project' || k === 'asset')

                if (k === 'project') {
                    // item['async'] item['type'] .. can include `async` and `type` 
                    try {
                        if (cached && this.getArchitect(projectID)[k]) continue
                    } catch (err) {
                        // 
                    }

                    this.setArchitect(projectID,
                        { project: this.$payload(item, item['async'], item['type']).d }
                    )
                }

                if (k === 'asset') {
                    if (!isString(item['name']) || item['value'] === undefined) {
                        if (this.debug) warn(`[$architect] asset must include {value, name}`)
                        return this
                    }
                    if (item['name'] === 'project' || item['name'] === 'cache') {
                        if (this.debug) warn(`[$architect] asset props, "project, cache" are reserved`)
                        return this
                    }
                    try {
                        if (cached && this.getArchitect(projectID)[item['name']]) continue
                    } catch (err) {
                        // 
                    }

                    // if already exists, same assets will be overriten and new will be created
                    this.setArchitect(projectID, {
                        [item['name']]: item['value']
                    })
                }
            }
            return this
        }

    }
}
