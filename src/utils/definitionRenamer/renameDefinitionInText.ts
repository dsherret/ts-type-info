export function renameDefinitionInText(text: string, fromName: string, toName: string) {
    const validVarNameChars = "A-Za-z0-9_$";
    const replaceRegEx = new RegExp(`(^|[^${validVarNameChars}\.])${fromName}([^${validVarNameChars}]|$)`, "g");

    return text.replace(replaceRegEx, `$1${toName}$2`);
}
