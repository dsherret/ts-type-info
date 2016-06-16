export function renameDefinitionInText(text: string, fromName: string, toName: string) {
    const validChars = "A-Za-z0-9_$";
    const replaceRegEx = new RegExp(`(^|[^${validChars}])${fromName}([^${validChars}]|$)`, "g");

    return text.replace(replaceRegEx, `$1${toName}$2`);
}
