import * as assert from "assert";

export function ensureNotNull<T>(obj: T | null, additionalTestsIfNotNull: () => void) {
    if (obj == null) {
        it(`should not be null`, () => {
            assert.notEqual(obj, null);
        });
    }
    else {
        additionalTestsIfNotNull();
    }
}
