export function Serializable(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    target._serializableProperties = target._serializableProperties || [];
    target._serializableProperties.push(propertyName);

    target.toJSON = function() {
        const obj: any = {};

        for (const prop of target._serializableProperties) {
            obj[prop] = this[prop];
        }

        return obj;
    };
}
