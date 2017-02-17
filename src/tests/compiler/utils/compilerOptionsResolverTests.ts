import * as assert from "assert";
import * as path from "path";
import {Options} from "./../../../options";
import {CompilerOptionsResolver} from "./../../../compiler";
import {objectAssign} from "./../../../utils";

describe(nameof(CompilerOptionsResolver), () => {
    describe(nameof<CompilerOptionsResolver>(r => r.getCompilerOptions), () => {
        describe("nothing", () => {
            it(`should get the default compiler options when not providing anything`, () => {
                const resolver = new CompilerOptionsResolver();
                const compilerOptions = resolver.getCompilerOptions({});

                assert.deepEqual(compilerOptions, getDefaultCompilerOptions());
            });
        });

        describe(nameof<Options>(o => o.compilerOptions), () => {
            it(`should get the default compiler options when providing an empty compiler options object`, () => {
                const resolver = new CompilerOptionsResolver();
                const compilerOptions = resolver.getCompilerOptions({
                    compilerOptions: {}
                });

                assert.deepEqual(compilerOptions, getDefaultCompilerOptions());
            });

            it(`should use compiler options when providing a tsconfig path`, () => {
                const resolver = new CompilerOptionsResolver();
                const compilerOptions = resolver.getCompilerOptions({
                    tsConfigFilePath: "test.txt",
                    compilerOptions: {
                        rootDir: "test",
                        target: 1
                    }
                });

                assert.deepEqual(compilerOptions, objectAssign(getDefaultCompilerOptions(), { rootDir: "test", target: 1 }));
            });
        });

        describe(nameof<Options>(o => o.tsConfigFilePath), () => {
            it(`should use compiler options from the tsconfig when providing a tsconfig path`, () => {
                const resolver = new CompilerOptionsResolver();
                const compilerOptions = resolver.getCompilerOptions({
                    tsConfigFilePath: path.join(__dirname, "./../../../../src/tests/compiler/utils/tsconfigTestFile.txt")
                });

                assert.deepEqual(compilerOptions, objectAssign(getDefaultCompilerOptions(), {
                    module: 1,
                    noImplicitAny: true,
                    removeComments: true,
                    preserveConstEnums: true,
                    sourceMap: true
                }));
            });
        });
    });
});

function getDefaultCompilerOptions() {
    return {
        allowJs: true,
        experimentalDecorators: true,
        moduleResolution: 2,
        noImplicitAny: false,
        noLib: false,
        strictNullChecks: false,
        suppressExcessPropertyErrors: true,
        suppressImplicitAnyIndexErrors: true,
        target: 2,
        types: []
    };
}
