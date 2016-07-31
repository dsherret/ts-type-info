export function indexOfAllDefinitionsInText(text: string, searchingText: string) {
    return new DefinitionInTextFinder(text).indexOfAll(searchingText);
}

class DefinitionInTextFinder {
    private stringCharStack: string[] = [];
    private currentIndex: number = 0;
    private validVarNameChars = /[A-Za-z0-9_]/;

    constructor(private text: string) {
    }

    indexOfAll(searchingText: string) {
        let currentMatchIndex = 0;
        const currentCharMatches = () => currentMatchIndex < searchingText.length && this.getCurrentChar() === searchingText[currentMatchIndex];
        const isValidFirstChar = () => !this.isValidVariableNameChar(this.getLastChar()) && this.getLastChar() !== ".";
        const foundIndexes: number[] = [];

        for (this.currentIndex = 0; this.currentIndex < this.text.length; this.currentIndex++) {
            this.handleStringChar();

            if (!this.isInString() && currentCharMatches() && (currentMatchIndex !== 0 || isValidFirstChar())) {
                currentMatchIndex++;
            }
            else {
                currentMatchIndex = 0;
            }

            if (currentMatchIndex === searchingText.length) {
                if (!this.isValidVariableNameChar(this.getNextChar())) {
                    foundIndexes.push((this.currentIndex + 1) - searchingText.length);
                }

                currentMatchIndex = 0;
            }
        }

        return foundIndexes;
    }

    private isValidVariableNameChar(char: string | null) {
        return char != null && this.validVarNameChars.test(char);
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
