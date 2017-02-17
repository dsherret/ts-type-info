import * as ts from "typescript";
import * as path from "path";
import {FileNotFoundError} from "./../../errors";
import {CompilerOptions} from "./../../options";
import {FileUtils, objectAssign} from "./../../utils";

export class CompilerOptionsResolver {
    getCompilerOptions(options: { compilerOptions?: CompilerOptions; tsConfigFilePath?: string; }) {
        let compilerOptions: CompilerOptions;

        if (options.compilerOptions != null)
            compilerOptions = objectAssign({}, options.compilerOptions || {}) as CompilerOptions;
        else if (options.tsConfigFilePath != null)
            compilerOptions = this.getCompilerOptionsFromTsConfig(options.tsConfigFilePath);
        else
            compilerOptions = {};

        return this.getTsCompilerOptionsWithDefaults(compilerOptions);
    }

    private getCompilerOptionsFromTsConfig(filePath: string) {
        this.verifyFileExists(filePath);
        const absoluteFilePath = FileUtils.getAbsolutePath(filePath);
        const text = FileUtils.readFileSync(absoluteFilePath);
        const result = ts.parseConfigFileTextToJson(absoluteFilePath, text, true);

        if (result.error != null)
            throw new Error(result.error.messageText.toString());

        const settings = ts.convertCompilerOptionsFromJson(result.config.compilerOptions, path.dirname(filePath));

        if (!settings.options)
            throw new Error(this.getErrorMessage(settings.errors));

        return settings.options;
    }

    private getTsCompilerOptionsWithDefaults(compilerOptions: CompilerOptions | undefined) {
        function getValue<T>(currentValue: T, newValue: T) {
            return (currentValue == null) ? newValue : currentValue;
        }

        let combinedOptions = (compilerOptions || {}) as any as ts.CompilerOptions;

        combinedOptions.allowJs = getValue(combinedOptions.allowJs, true);
        combinedOptions.noLib = getValue(combinedOptions.noLib, false);
        combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
        combinedOptions.suppressExcessPropertyErrors = getValue(combinedOptions.suppressExcessPropertyErrors, true);
        combinedOptions.suppressImplicitAnyIndexErrors = getValue(combinedOptions.suppressImplicitAnyIndexErrors, true);
        combinedOptions.noImplicitAny = getValue(combinedOptions.noImplicitAny, false);
        combinedOptions.target = getValue(combinedOptions.target, ts.ScriptTarget.ES2015);
        combinedOptions.moduleResolution = getValue(combinedOptions.moduleResolution, ts.ModuleResolutionKind.NodeJs);
        combinedOptions.strictNullChecks = getValue(combinedOptions.strictNullChecks, false);
        combinedOptions.types = getValue(combinedOptions.types, []);

        return combinedOptions;
    }

    private getErrorMessage(errors: ts.Diagnostic[]) {
        let message = "";
        errors.forEach(err => message += `${err.messageText}\n`);
        return message;
    }

    private verifyFileExists(filePath: string) {
        // unfortunately the ts compiler doesn't do things asynchronously so for now we won't either
        if (!FileUtils.fileExistsSync(filePath)) {
            throw new FileNotFoundError(FileUtils.getAbsolutePath(filePath));
        }
    }
}
