var utils_1 = require("./../../utils");
var enum_member_definition_1 = require("./enum-member-definition");
var base_1 = require("./../base");
var EnumDefinition = (function () {
    function EnumDefinition(typeChecker, symbol) {
        this.members = [];
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillIsAmbient(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }
    EnumDefinition.prototype.fillMembers = function (typeChecker, symbol) {
        var _this = this;
        Object.keys(symbol.exports).forEach(function (memberName) {
            var member = symbol.exports[memberName];
            /* istanbul ignore else */
            if (enum_member_definition_1.EnumMemberDefinition.isEnumMemberDefinition(member)) {
                _this.members.push(new enum_member_definition_1.EnumMemberDefinition(typeChecker, member));
            }
            else {
                console.warn("Unknown enum member: " + symbol.name);
            }
        });
    };
    return EnumDefinition;
})();
exports.EnumDefinition = EnumDefinition;
utils_1.applyMixins(EnumDefinition, [base_1.NamedDefinition, base_1.ExportableDefinition, base_1.AmbientableDefinition]);

//# sourceMappingURL=enum-definition.js.map
