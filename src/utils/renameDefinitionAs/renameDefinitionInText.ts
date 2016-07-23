import {indexOfAllDefinitionsInText} from "./indexOfAllDefinitionsInText";

export function renameDefinitionInText(text: string, fromName: string, toName: string) {
    const indexes = indexOfAllDefinitionsInText(text, fromName);
    let currentIndex = 0;
    let newName = "";

    indexes.forEach(index => {
        newName += text.substring(currentIndex, index) + toName;
        currentIndex = index + fromName.length;
    });

    newName += text.substring(currentIndex, text.length);

    return newName;
}
