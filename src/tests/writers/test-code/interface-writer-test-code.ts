const code = `
interface MyInterface {
    myString: string;
    myMethod(): void;
}

interface MyTypeParameterInterface<T> {
}

interface MyExtenedInterface extends MyTypeParameterInterface<string> {
}
`;

export default code;
