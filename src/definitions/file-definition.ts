import * as ts from "typescript";
import {TypeChecker, Serializable} from "./../utils";
import {ClassDefinition} from "./../definitions";

export class FileDefinition {
    private _name: string;
    private _classes: ClassDefinition[] = [];

    constructor(typeChecker: TypeChecker, file: ts.SourceFile) {
        this._name = file.fileName;

        const fileSymbol = typeChecker.getSymbolAtLocation(file);

        for (const exportName in fileSymbol.exports) {
            const currentExport = fileSymbol.exports[exportName]; 
            if (ClassDefinition.isClassDefinition(currentExport)) {
                this._classes.push(new ClassDefinition(typeChecker, currentExport));
            }
            else {
                throw "Currently only class exports are supported."
            }
        }

        this.checkAnyClassExports();
    }

    @Serializable
    get name() {
        return this._name;
    }

    @Serializable
    get classes() {
        return this._classes;
    }

    private checkAnyClassExports() {
        if (this.classes.length === 0) {
            console.warn(`${this.name}: No class exports. Please provide a file that contains class exports`);
        }
    }
}
