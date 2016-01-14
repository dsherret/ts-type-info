var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function myDecorator(str) {
    return function (target) {
        target.myStaticProperty = str;
    };
}
var MyClass = (function () {
    function MyClass() {
        this.myProperty = 253;
    }
    MyClass.prototype.myMethod = function (myParameter) {
        return "Test: " + myParameter;
    };
    MyClass = __decorate([
        myDecorator("My decorator value")
    ], MyClass);
    return MyClass;
})();
exports.MyClass = MyClass;
