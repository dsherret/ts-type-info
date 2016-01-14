import {Moduled} from "./../base/";
import {Import} from "./import";
import {ReExport} from "./re-export";

export interface File extends Moduled {
    imports?: Import[];
    reExports?: ReExport[];
    fileName?: string;
}
