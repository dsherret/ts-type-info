import * as assert from "assert";

export function ensureNotNull(obj: any, additionalTestsIfNotNull: () => void) {
    if (obj == null) {
        it(`should not be null`, () => {
            assert.notEqual(obj, null);
        });
    }
    else {
        additionalTestsIfNotNull();
    }
}
