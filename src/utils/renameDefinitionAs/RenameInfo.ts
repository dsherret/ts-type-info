export class RenameInfo {
    // ex. MyNamespace.MyClass
    fullNameFrom: string; // todo: mark readonly in TS 2.0
    // ex. MyNamespace.MyNewName
    fullNameTo: string; // todo: mark readonly in TS 2.0

    constructor(opts: { fullNameFrom: string; fullNameTo: string; }) {
        this.fullNameFrom = opts.fullNameFrom;
        this.fullNameTo = opts.fullNameTo;
    }

    static createFromNamespaces(opts: { nameFrom: string; nameTo: string; namespaceNames: string[]; }) {
        const namespacePrefix = opts.namespaceNames.length > 0 ? opts.namespaceNames.join(".") + "." : "";

        return new RenameInfo({
            fullNameFrom: namespacePrefix + opts.nameFrom,
            fullNameTo: namespacePrefix + opts.nameTo
        });
    }

    hasNamespaces() {
        return this.fullNameFrom.indexOf(".") !== -1;
    }

    getNumberOfNamespaces() {
        return (this.fullNameFrom.match(/\./g) || []).length;
    }

    isRootDefaultExportOfFile() {
        return this.getRootNameFrom() === "default";
    }

    getRootNameFrom() {
        return this.fullNameFrom.split(".")[0];
    }

    getRootNameTo() {
        return this.fullNameTo.split(".")[0];
    }

    getFirstXNamespacesFromFullName(numberNamespaces: number) {
        return this.getFullNameParts().slice(0, numberNamespaces).join(".");
    }

    getFullNameParts() {
        return this.fullNameFrom.split(".");
    }

    getFullReplaceParts() {
        return this.fullNameTo.split(".");
    }

    createCopy() {
        return new RenameInfo({
            fullNameFrom: this.fullNameFrom,
            fullNameTo: this.fullNameTo
        });
    }

    createWithoutFirstXNamespaces(numNamespaces: number) {
        return new RenameInfo({
            fullNameFrom: this.fullNameFrom.split(".").slice(numNamespaces).join("."),
            fullNameTo: this.fullNameTo.split(".").slice(numNamespaces).join(".")
        });
    }

    createWithPrependedNamespace(namespaceName: string) {
        return new RenameInfo({
            fullNameFrom: namespaceName + "." + this.fullNameFrom,
            fullNameTo: namespaceName + "." + this.fullNameTo
        });
    }

    createWithNewFirstNamespace(namespaceName: string) {
        const replace = (name: string) => {
            const parts = name.split(".");
            parts[0] = namespaceName;
            return parts.join(".");
        };

        return new RenameInfo({
            fullNameFrom: replace(this.fullNameFrom),
            fullNameTo: replace(this.fullNameTo)
        });
    }
}
