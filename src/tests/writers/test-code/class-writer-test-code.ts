const code = `
abstract class MyClass {
    myString: string;
    private myPrivateString: string;

    abstract myAbstractMethod(): string;

    myMethod() {
    }

    private myPrivateMethod() {
    }
}

class MyTypeParameterClass<T> {
}

class MyChildClass extends MyTypeParameterClass<string> {
}

class MyImplementsClass implements MyChildClass {
}

class MyExtendsImplementsClass extends MyChildClass implements MyImplementsClass {
}
`;

export default code;
