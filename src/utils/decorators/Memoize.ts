export function Memoize(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    if (descriptor.value != null) {
        descriptor.value = getNewFunction(descriptor.value);
    }
    else if (descriptor.get != null) {
        descriptor.get = getNewFunction(descriptor.get);
    }
    else {
        throw "Only put a Memoize decorator on a method or get accessor.";
    }
}

let counter = 0;
function getNewFunction(originalFunction: () => void) {
    const identifier = ++counter;

    return function (this: any, ...args: any[]) {
        const propName = `__memoized_value_${identifier}`;
        let returnedValue: any;

        if (this.hasOwnProperty(propName)) {
            returnedValue = this[propName];
        }
        else {
            returnedValue = originalFunction.apply(this, args);
            Object.defineProperty(this, propName, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: returnedValue
            });
        }

        return returnedValue;
    };
}
