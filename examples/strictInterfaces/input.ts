interface Person {
    firstName: string;
    lastName: string;
    address?: Address;
}

interface Address {
    firstLine: string;
    secondLine?: string;
    city: string;
}
