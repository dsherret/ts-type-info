TSTypeInfo
==========

[![Build Status](https://travis-ci.org/dsherret/ts-type-info.svg?branch=master)](https://travis-ci.org/dsherret/ts-type-info?branch=master)
[![Coverage Status](https://coveralls.io/repos/dsherret/ts-type-info/badge.svg?branch=master&service=github)](https://coveralls.io/github/dsherret/ts-type-info?branch=master)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

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
    myMethod(myParam: string, myDefaultParam = 15) {
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
                name: "myParam",
                decorators: [],
                isRestParameter: false,
                isOptional: false,
                defaultExpression: undefined,
                typeExpression: { text: "string" }
            }, {
                name: "myDefaultParam",
                decorators: [],
                isRestParameter: false,
                isOptional: true,
                defaultExpression: { text: "15" },
                typeExpression: { text: "number" }
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
