import * as ts from "typescript";
import {TypeChecker, Serializable, DefinitionCache} from "./../utils";
import {ClassDefinition} from "./../definitions";

export class FileDefinition {
    private _name: string;
    private _classes: ClassDefinition[] = [];

    constructor(private typeChecker: TypeChecker, private definitionCache: DefinitionCache, private file: ts.SourceFile) {
        this._name = file.fileName;
        this.fillClasses();
    }

    fillClasses() {
        this.typeChecker.getSymbolsInScope(this.file, ts.SymbolFlags.Class).forEach((classSymbol) => {
            this._classes.push(this.definitionCache.getClassDefinition(classSymbol));
        });
    }

    @Serializable
    get name() {
        return this._name;
    }

    @Serializable
    get classes() {
        return this._classes;
    }
}
