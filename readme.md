TSTypeInfo
==========

[![Build Status](https://travis-ci.org/dsherret/ts-type-info.svg)](https://travis-ci.org/dsherret/ts-type-info)

Uses the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get the type and structure information of TypeScript code in an easily usable format.

This is a very experimental library.

```
npm install ts-type-info --save-dev
tsd link
```

## Example

### Input

```typescript
// V:/TestFile.ts
@myDecorator("My decorator value")
export class MyClass {
    myMethod(myParameter: string) {
        return `Test: ${myParameter}`;
    }
}
```

Get the file info:

```typescript
import * as TsTypeInfo from "ts-type-info";

console.log(TsTypeInfo.getFileInfo([ "V:/TestFile.ts" ]));
```

### Output

```text
[{
    fileName: "V:/TestFile.ts",
    classes: [{
        name: "MyClass",
        decorators: [{
            name: "myDecorator",
            arguments: [{ "text": "My decorator value" }]
        }],
        extends: [],
        implements: [],
        methods: [{
            name: "myMethod",
            decorators: [],
            parameters: [{
                name: "myParameter",
                decorators: [],
                isRestParameter: false,
                isOptional: false,
                typeExpression: { text: "string" }
            }],
            returnTypeExpression: {
                text: "string"
            },
            typeParameters: []
        }],
        staticMethods: [],
        staticProperties: [],
        typeParameters: [],
        isExported: true,
        properties: []
    }],
    enums: [],
    functions: [],
    interfaces: [],
    imports: [],
    reExports: []
}]
```
