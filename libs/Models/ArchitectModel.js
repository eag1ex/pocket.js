const { objectSize, log } = require('x-utils-es/umd')
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
                log('[pocket]', `[architect] updated`)
            }
        }
    })
}

module.exports = ArchitectModel
