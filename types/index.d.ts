/**
 * Type declarations and JSdocs for function operators and modules
 */

import type _PocketSelectors from "../libs/Pocket/Pocket.selectors"
import type _Pocket from "../libs/Pocket/PocketExit.module"
import type _Probe from "../libs/Probe/Probe"
export interface PocketType {
    new (): _Pocket
}

export type Pocket = new _Pocket 
export type Probe  = new _Probe
export namespace PocketSpace {
    export class PocketSelectors extends _PocketSelectors {}
}

