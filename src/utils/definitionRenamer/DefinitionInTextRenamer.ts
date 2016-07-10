import {DefinitionInTextFinder} from "./DefinitionInTextFinder";

export class DefinitionInTextRenamer {
    // todo: mark private in TS 2.0
    constructor(private text: string) {
    }

    static renameDefinitionInText(text: string, fromName: string, toName: string) {
        return new DefinitionInTextRenamer(text).getTextWithReplace(fromName, toName);
    }

    getTextWithReplace(fromName: string, toName: string) {
        const indexes = new DefinitionInTextFinder(this.text).indexOfAll(fromName);
        let currentIndex = 0;
        let newName = "";

        indexes.forEach(index => {
            newName += this.text.substring(currentIndex, index) + toName;
            currentIndex = index + fromName.length;
        });

        newName += this.text.substring(currentIndex, this.text.length);

        return newName;
    }
}
