export class DefinitionInTextRenamer {
    private stringCharStack: string[] = [];
    private currentIndex: number = 0;

    // todo: mark private in TS 2.0
    constructor(private text: string) {
    }

    static renameDefinitionInText(text: string, fromName: string, toName: string) {
        return new DefinitionInTextRenamer(text).getTextWithReplace(fromName, toName);
    }

    getTextWithReplace(fromName: string, toName: string) {
        let newText = "";
        let currentMatch = "";
        const currentCharMatches = () => currentMatch.length < fromName.length && this.getCurrentChar() === fromName[currentMatch.length];
        const isValidFirstChar = () => !this.isValidVariableNameChar(this.getLastChar()) && this.getLastChar() !== ".";

        for (this.currentIndex = 0; this.currentIndex < this.text.length; this.currentIndex++) {
            this.handleStringChar();

            if (!this.isInString() && currentCharMatches() && (currentMatch.length !== 0 || isValidFirstChar())) {
                currentMatch += this.getCurrentChar();
            }
            else {
                currentMatch = "";
            }

            newText += this.getCurrentChar();

            if (currentMatch === fromName && !this.isValidVariableNameChar(this.getNextChar())) {
                currentMatch = "";
                newText = newText.substr(0, newText.length - fromName.length) + toName;
            }
        }

        return newText;
    }

    private isValidVariableNameChar(char: string) {
        const validVarNameChars = /A-Za-z0-9_/;

        return char != null && validVarNameChars.test(char);
    }

    private handleStringChar() {
        if (this.isCurrentStringChar()) {
            const lastStringChar = this.getLastStringCharOnStack();
            const currentChar = this.getCurrentChar();

            if (currentChar === lastStringChar || currentChar === "}") {
                this.stringCharStack.pop();
            }
            else {
                this.stringCharStack.push(currentChar);
            }
        }
    }

    private isCurrentStringChar() {
        const lastChar = this.getLastChar();
        const currentChar = this.getCurrentChar();
        const lastStringChar = this.getLastStringCharOnStack();

        if (lastChar === "\\") {
            return false;
        }
        else if (lastStringChar == null) {
            return currentChar === "`" || currentChar === "'" || currentChar === "\"";
        }
        else if (lastStringChar === "`" && lastChar === "$" && currentChar === "{") {
            return true;
        }
        else if (lastStringChar === "{" && currentChar === "}") {
            return true;
        }
        else {
            return currentChar === lastStringChar;
        }
    }

    private isInString() {
        return this.stringCharStack.length > 0 && this.stringCharStack[this.stringCharStack.length - 1] !== "{";
    }

    private getLastStringCharOnStack() {
        if (this.stringCharStack.length > 0) {
            return this.stringCharStack[this.stringCharStack.length - 1];
        }
        else {
            return null;
        }
    }

    private getLastChar() {
        return this.currentIndex - 1 < 0 ? null : this.text[this.currentIndex - 1];
    }

    private getCurrentChar() {
        return this.text[this.currentIndex];
    }

    private getNextChar() {
        return this.currentIndex + 1 >= this.text.length ? null : this.text[this.currentIndex + 1];
    }
}
