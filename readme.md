﻿TSTypeInfo
==========

[![npm version](https://badge.fury.io/js/ts-type-info.svg)](https://badge.fury.io/js/ts-type-info) [![Build Status](https://travis-ci.org/dsherret/ts-type-info.svg?branch=master)](https://travis-ci.org/dsherret/ts-type-info?branch=master)
[![Coverage Status](https://coveralls.io/repos/dsherret/ts-type-info/badge.svg?branch=master&service=github)](https://coveralls.io/github/dsherret/ts-type-info?branch=master)

"Reflection" and code generation in TypeScript.

Uses the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get information about TypeScript code in an easily usable format.

* [Version 2.0 information](https://github.com/dsherret/ts-type-info/wiki/What%27s-New)
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

    myStringProperty?: string;
    myNumberProperty = 253;

    myMethod(myParameter: string) {
        return `Test: ${myParameter}`;
    }
}

```

Get the file info:

```typescript
import * as TsTypeInfo from "ts-type-info";

const files = TsTypeInfo.getInfoFromFiles(["V:/TestFile.ts"]);
const property = files[0]
    .getClass("MyClass")                            // get first by name
    .getProperty(p => p.defaultExpression != null); // or first by what matches

console.log(property.name); // myNumberProperty
console.log(property.defaultExpression.text); // 253

// or access the arrays directly
const myMethod = files[0].classes[0].methods[0];

console.log(myMethod.name); // myMethod
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
            parameters: [{ name: "myParam", type: "string" }]
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
    writer.write(`if (myParam != null && myParam.length > 40)`).block(() => {
        writer.write("alert(myParam)");
    });
    writer.newLine().write("return myParam;");
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

console.log(file.write());
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

### Detailed Example

* [Server Bridge](https://github.com/dsherret/server-bridge) - Automatically generates client side code to communicate with the server from the server side code (out of date)
