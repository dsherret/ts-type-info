// this is a test file used in import-tests
import * as TestClassModule from "./test-class";
import {TestEnum} from "./test-enum";
import {Class1, Class2} from "./test-multiple-classes";
import TestDefaultClass from "./test-default-class";

// removes linting errors
function dummyFunction(t: any) {
    return t;
}

dummyFunction(new TestClassModule.TestClass());
dummyFunction(new TestDefaultClass());
dummyFunction(new Class1());
dummyFunction(new Class2());
dummyFunction(TestEnum);
