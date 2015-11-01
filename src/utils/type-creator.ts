import * as ts from "typescript";
import {KeyValueCache, TypeChecker} from "./../utils";
import {Type} from "./../types";

export class TypeCreator {
    private fileCaches = new KeyValueCache<string, KeyValueCache<string, Type>>();
    private typeCache = new KeyValueCache<string, Type>();

    constructor(private typeChecker: TypeChecker) {
    }

    get(tsType: ts.Type) {
        const cache = this.getCache(tsType);
        const name = this.typeChecker.typeToString(tsType);
        let type = cache.get(name);

        if (type == null) {
            type = new Type(this.typeChecker, tsType);
            cache.add(type.name, type);
            type.fillTypeInformation(this.typeChecker);
        }

        return type;
    }

    private getCache(tsType: ts.Type) {
        const fileName = this.getFileName(tsType);

        return fileName == null ? this.typeCache : this.getFileCache(fileName);
    }

    private getFileCache(fileName: string) {
        let fileCache = this.fileCaches.get(fileName);

        if (fileCache == null) {
            fileCache = new KeyValueCache<string, Type>();
            this.fileCaches.add(fileName, fileCache);
        }

        return fileCache;
    }

    private getFileName(tsType: ts.Type) {
        let fileName: string = null;
        const symbol = tsType.getSymbol();

        if (symbol != null && symbol.valueDeclaration != null) {
            const sourceFile = symbol.valueDeclaration.getSourceFile();

            if (sourceFile != null) {
                fileName = sourceFile.fileName;
            }
        }

        return fileName;
    }
}
