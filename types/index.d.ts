/**
 * Type declarations and JSdocs for function operators and modules
 */

import type _PocketSelectors from "../libs/Pocket/Pocket.selectors"
import type _Pocket from "../libs/Pocket/PocketExit.module"

export interface PocketType {
    new (): _Pocket
}

export namespace PocketSpace {
    export class PocketSelectors extends _PocketSelectors {}
}
