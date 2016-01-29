const code = `
function myFunction(str: string) {
    return "test";
}
function myFunction2<T extends string, U>(str: T, num: U) {
}
`;

export default code;
