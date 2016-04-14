TSTypeInfo
==========

[![npm version](https://badge.fury.io/js/ts-type-info.svg)](https://badge.fury.io/js/ts-type-info) [![Build Status](https://travis-ci.org/dsherret/ts-type-info.svg?branch=master)](https://travis-ci.org/dsherret/ts-type-info?branch=master)
[![Coverage Status](https://coveralls.io/repos/dsherret/ts-type-info/badge.svg?branch=master&service=github)](https://coveralls.io/github/dsherret/ts-type-info?branch=master)

Reflection and code generation in TypeScript.

Uses the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get the type and structure information of TypeScript code in an easily usable format.

## Info

* [Language support](https://github.com/dsherret/ts-type-info/wiki/Language-Support)

## Installing

```
npm install ts-type-info --save-dev
```

Use [typings](https://github.com/typings/typings) to get the definition file:

```
typings install npm:ts-type-info --save-dev
```

Use the `--save` flag on both commands if you need this library for more than just development.

## Reflection

```typescript
// V:/TestFile.ts
﻿
function myDecorator(str: string) {
    return (target: typeof MyClass) => {
        target.myStaticProperty = str;
    };
}

@myDecorator("My decorator value")
export class MyClass {
    static myStaticProperty: string | number;

    myProperty = 253;

    myMethod(myParameter: string) {
        return `Test: ${myParameter}`;
    }
}

```

Get the file info:

```typescript
import * as TsTypeInfo from "ts-type-info";

const files = TsTypeInfo.getInfoFromFiles(["V:/TestFile.ts"]);
const myPropertyName = files[0].getClass("MyClass").properties[0].name;

console.log(myPropertyName); // myProperty
```

## Code Generation

You can work with objects retrieved from "reflection" or start with your own new file definition:

```typescript
import * as TsTypeInfo from "ts-type-info";

// create whatever you like at the start
const file = TsTypeInfo.createFile({
    classes: [{
        name: "MyClass",
        methods: [{
            name: "myMethod",
            parameters: [{ name: "str", type: "string" }]
        }]
    }]
});

// add to it later
const myClass = file.getClass("MyClass");
myClass.isAbstract = true;
myClass.onBeforeWrite = writer => writer.write("@MyDecorator");

const myMethod = myClass.getMethod("myMethod");
myMethod.onBeforeWrite = writer => writer.write("// myMethod is here");
myMethod.onWriteFunctionBody = writer => {
    writer.write(`if (str != null && str.length > 40)`).block(() => {
        writer.write("alert(str)");
    });
    writer.newLine().write("return str;");
};

myClass.addProperties({
    name: "myProperty1"
    type: "string"
}, {
    name: "myProperty2",
    type: "number",
    defaultExpression: "4",
    isOptional: true
})

console.log(myClass.write());
```

Outputs:

```typeScript
@MyDecorator
abstract class MyClass {
    myProperty1: string;
    myProperty2?: number = 4;

    // myMethod is here
    myMethod(str: string) {
        if (str != null && str.length > 40) {
            alert(str);
        }

        return str;
    }
}
```

### Real Life Example

* [Server Bridge](https://github.com/dsherret/server-bridge) - Automatically generates client side code to communicate with the server from the server side code
