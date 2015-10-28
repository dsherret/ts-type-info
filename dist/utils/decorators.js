function Serializable(target, propertyName, descriptor) {
    target._serializableProperties = target._serializableProperties || [];
    target._serializableProperties.push(propertyName);
    target.toJSON = function () {
        var obj = {};
        for (var _i = 0, _a = target._serializableProperties; _i < _a.length; _i++) {
            var prop = _a[_i];
            obj[prop] = this[prop];
        }
        return obj;
    };
}
exports.Serializable = Serializable;
