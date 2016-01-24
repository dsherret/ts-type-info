// this is a test file used in import-tests
/// <reference path="definition.d.ts" />

/* tslint:disable */
import * as TestClassModule from "./test-class";
import {TestEnum} from "./test-enum";
import {Class1, Class2} from "./test-multiple-classes";
import TestDefaultClass from "./test-default-class";
import * as definition from "definition";
import * as reexports from "./re-export";
import {MyInterface} from "./test-interface";
import * as definitionNamespace from "./definition-namespace";
import * as definitionVar from "definition-var";

// removes linting errors
function dummyFunction(t: any) {
    return t;
}

dummyFunction(new TestClassModule.TestClass());
dummyFunction(new TestDefaultClass());
dummyFunction(new Class1());
dummyFunction(new Class2());
dummyFunction(TestEnum);
dummyFunction(reexports.TestClass);
dummyFunction(reexports.TestEnum);

let myVar: definition.Test;
dummyFunction(myVar);
let myVar2: definitionNamespace.Test;
dummyFunction(myVar2);
let myInterface: MyInterface;
dummyFunction(myInterface);
