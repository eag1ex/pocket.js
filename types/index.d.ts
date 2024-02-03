/**
 * Type declarations and JSdocs for function operators and modules
 */

import type _Pocket from "../libs/Pocket/PocketExit.module"
import type _Probe from "../libs/Probe/Probe"

export interface Pocket {
    new (): _Pocket
}
export interface Probe {
    new (): _Probe
}
