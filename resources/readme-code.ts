
function myDecorator(str: string) {
    return (target: typeof MyClass) => {
        target.myStaticProperty = str;
    };
}

@myDecorator("My decorator value")
export class MyClass {
    static myStaticProperty: string;

    myMethod(myParameter: string) {
        return `Test: ${myParameter}`;
    }

    myProperty = 253;
}
