
/** 
    * ### Architect
    * a more in depth project architecture setup, allowing more robust configuration, munipulation and data flows
*/
module.exports = () => {
    const { objectSize, isFunction, onerror, warn, log } = require('./utils')

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

    return function Architect() {
        this.architectConfig = {}
        const archModel = new ArchitectModel()
        this.architect = archModel.architect

        this.setArchitect = (projectID, val) => {
            if (!this.architectConfig[projectID]) this.architectConfig[projectID] = this.architect
            this.architectConfig[projectID]['value'] = val
            return this
        }

        this.getArchitect = (projectID) => {
            return this.architectConfig[projectID]['value']
        }

        /** 
         * @param assetName string, specify the name you chose in your `$architect(...)` declaration
         * @param projectID optional, update selector and return desired asset
        */
        this.__asset = (assetName, projectID) => {

            const lastProject = this.lastProjectID(projectID) // in case we are calling `$architect` on existing project
            projectID = this.validProjectID(lastProject || projectID)

            if (this.getArchitect(projectID)) {
                if (this.getArchitect(projectID)[assetName]) return this.getArchitect(projectID)[assetName]
                else {
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
         * @param cb required, must return project settings: `{project:{payloadData}, asset:{value, name}}
         * @param projectID optional
         * @returns self
        */
        this.__architect = (cb, projectID) => {
            
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
                if (['project', 'asset'].indexOf(k) !== -1) n[k] = value
                return n
            }, {})

            for (let k in validConfig) {
                const item = validConfig[k]

                if (k === 'project') {
                    // item['async'] item['type'] .. can include `async` and `type`  
                    this.setArchitect(projectID,
                        { project: this.$payload(item, item['async'], item['type']).d }
                    )
                }

                if (k === 'asset') {
                    if (!item['name'] || !item['value']) {
                        if (this.debug) warn(`[$architect] asset must include {value, name}`)
                        return this
                    }
                    // if already exists, same assets will be overriten and new will be created
                    this.setArchitect(projectID, {
                        [item['name']]: item['value']
                    })
                    // if (!this.architectConfig[projectID]) this.architectConfig[projectID] = {}
                    // this.architectConfig[projectID][item['name']] = item['value']
                }
            }

            return this
        }
    }
}