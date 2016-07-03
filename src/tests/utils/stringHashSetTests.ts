import {StringHashSet} from "./../../utils";
import * as assert from "assert";

describe("StringHashSet", () => {
    it("should not have something that wasn't added", () => {
        const hashSet = new StringHashSet();
        hashSet.add("myKey");
        assert.equal(hashSet.contains("myOtherKey"), false);
    });

    it("should have something that was added", () => {
        const hashSet = new StringHashSet();
        hashSet.add("myOtherKey");
        hashSet.add("myKey");
        assert.equal(hashSet.contains("myOtherKey"), true);
    });
});
