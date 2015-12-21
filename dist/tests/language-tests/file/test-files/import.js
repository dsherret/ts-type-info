var TestClassModule = require("./test-class");
var test_enum_1 = require("./test-enum");
var test_multiple_classes_1 = require("./test-multiple-classes");
var test_default_class_1 = require("./test-default-class");
var reexports = require("./re-export");
function dummyFunction(t) {
    return t;
}
dummyFunction(new TestClassModule.TestClass());
dummyFunction(new test_default_class_1.default());
dummyFunction(new test_multiple_classes_1.Class1());
dummyFunction(new test_multiple_classes_1.Class2());
dummyFunction(test_enum_1.TestEnum);
dummyFunction(reexports.TestClass);
dummyFunction(reexports.TestEnum);
var myVar;
dummyFunction(myVar);
var myVar2;
dummyFunction(myVar2);
var myInterface;
dummyFunction(myInterface);

//# sourceMappingURL=import.js.map
