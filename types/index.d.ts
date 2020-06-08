
/**
 * @abstract Pocket
 * to help with pure javascript intellisense and minified script
 */
declare module Pocket {
    type Itype = "update" | "new"
    interface IdataFrom {
        data: any;
        ref: string
        status: string;
        error: any;
        campaign: string;
    }

    interface Itasks {
        data?: any;
        task: string;
        status?: string;
        error: string | Object;
        campaign?: string;
        ref: string;
    }

    interface Idata {
        id: string;
        tasks: Array[Object<Itasks>]
    }

    type IlistType = "self" | "list"

    export function $payload(data: Idata, async: boolean, type: Itype): boolean
    export function $project(data: Idata, async: boolean, type: Itype): boolean
    export function $probeStatusAsync(probeID: string): globalThis

    export function $get(probeID: string, self: boolean): globalThis
    export function $update(dataFrom: IdataFrom, mergeData: boolean, probeID: string): globalThis
    export function $activeTasks(projectID: string): globalThis
    export function $ready(projectID: string): globalThis

    // project and probe selectors
    export function $removeProject(projectID: string): globalThis
    export function $projectSet(projectID: string): boolean
    export function $projectSetAsync(projectID: string): Promise
    export function $of(probeID: string): globalThis
    export function $getByRef(projectID: string): Array[globalThis]
    export function $probe(projectID: string): globalThis
    export function $select(projectID: string): globalThis
    export function $filter(cb: Function, projectID: string): globalThis
    export function $list(projectID: string, cb: Function, type: string<IlistType>): Array[globalThis]
    export function $transfer(fromProbeID: string): globalThis
    export function $to(toProbeID: string, pointToThisProbe?: boolean, maxDelay?: number): globalThis
    export function $data(dataProp: Object | Array<string>, probeID: string, self: boolean): any
    export function $cached(dataProp: Object | Array<string>, probeID: string): any
    export function $compaign(probeID: string): string
    export function $ref(probeID: string): string
    export function $status(probeID: string): string
    export function $task(probeID: string): string
    export function $error(probeID: string): array[]
    export function $all(probeID: string): Object
    export function $architect(cb: Function, projectID: string): boolean | globalThis;
    export function $asset(assetName: string, projectID: string): any
    export function $condition(cb:Function, id:string): globalThis
    export function $exists(probeID: string): boolean
}


/**
 * @abstract Probe
 * to help with pure javascript intellisense and minified script
 */
declare module Probe {
    type Istatus = "open" | "updated" | "complete" | "send" | "error"
    interface Icomplete{
        status:string;
        id:string;
    }
    export const statusAsync: Promise<string: Istatus >
    export const completeAsync: Promise<Object<Icomplete>>
    export function update(data:any, merge:boolean):any
}

