// this is a test file
export class NamedExport1 {
    name: string;
}

export module NamedExport1 {
    export function MyFunction() {
        return "";
    }
}

export default class DefaultExport {
    name: string;
}
