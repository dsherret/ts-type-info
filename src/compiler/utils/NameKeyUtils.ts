// These functions ensure that assigning to an object type always uses a unique key
export class NameKeyUtils {
    private constructor() {
    }

    static getNameFromNameKey(key: string) {
        return key.substring(2);
    }

    static getNameKeyFromName(name: string) {
        return "p_" + name;
    }
}
