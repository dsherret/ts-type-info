"use strict";

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
"use strict";

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var ts = require("typescript");
var decorators_1 = require("./../utils/decorators");
var Type = (function () {
    function Type(typeChecker, type, node) {
        this._name = typeChecker.typeToString(type, node, 0);
    }
    Object.defineProperty(Type.prototype, "name", {
        get: function get() {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Type.prototype, "name", __decorate([decorators_1.Serializable], Type.prototype, "name", Object.getOwnPropertyDescriptor(Type.prototype, "name")));
    return Type;
})();
exports.Type = Type;
"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./types/type"));
"use strict";

var types_1 = require("./../types");
var TypeChecker = (function () {
    function TypeChecker(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
    }
    TypeChecker.prototype.getSymbolAtLocation = function (node) {
        return node.symbol;
    };
    TypeChecker.prototype.getTypeOfSymbol = function (symbol) {
        return new types_1.Type(this.typeChecker, this.typeChecker.getTypeOfSymbolAtLocation(symbol, this.node), this.node);
    };
    return TypeChecker;
})();
exports.TypeChecker = TypeChecker;
"use strict";

var TypeGuards = (function () {
    function TypeGuards() {}
    TypeGuards.isCallExpression = function (expression) {
        return expression != null && expression.arguments != null;
    };
    TypeGuards.isLiteralExpression = function (expression) {
        return expression != null && expression.text != null;
    };
    return TypeGuards;
})();
exports.TypeGuards = TypeGuards;
"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./utils/type-checker"));
__export(require("./utils/type-guards"));
__export(require("./utils/decorators"));
"use strict";

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var NamedDefinition = (function () {
    function NamedDefinition(symbol) {
        this._decorators = [];
        this._name = symbol.getName();
        this.fillDecorators(symbol);
    }
    NamedDefinition.prototype.fillDecorators = function (symbol) {
        if (symbol.valueDeclaration != null && symbol.valueDeclaration.decorators != null) {
            for (var _i = 0, _a = symbol.valueDeclaration.decorators; _i < _a.length; _i++) {
                var decorator = _a[_i];
                this._decorators.push(new definitions_1.DecoratorDefinition(decorator));
            }
        }
    };
    Object.defineProperty(NamedDefinition.prototype, "name", {
        get: function get() {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedDefinition.prototype, "decorators", {
        get: function get() {
            return this._decorators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NamedDefinition.prototype, "name", __decorate([utils_1.Serializable], NamedDefinition.prototype, "name", Object.getOwnPropertyDescriptor(NamedDefinition.prototype, "name")));
    Object.defineProperty(NamedDefinition.prototype, "decorators", __decorate([utils_1.Serializable], NamedDefinition.prototype, "decorators", Object.getOwnPropertyDescriptor(NamedDefinition.prototype, "decorators")));
    return NamedDefinition;
})();
exports.NamedDefinition = NamedDefinition;
"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var TypedDefinition = (function (_super) {
    __extends(TypedDefinition, _super);
    function TypedDefinition(typeChecker, symbol) {
        _super.call(this, symbol);
        this._type = typeChecker.getTypeOfSymbol(symbol);
    }
    Object.defineProperty(TypedDefinition.prototype, "type", {
        get: function get() {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypedDefinition.prototype, "type", __decorate([utils_1.Serializable], TypedDefinition.prototype, "type", Object.getOwnPropertyDescriptor(TypedDefinition.prototype, "type")));
    return TypedDefinition;
})(definitions_1.NamedDefinition);
exports.TypedDefinition = TypedDefinition;
"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var ClassDefinition = (function (_super) {
    __extends(ClassDefinition, _super);
    function ClassDefinition(typeChecker, symbol) {
        _super.call(this, symbol);
        this._methods = [];
        this._properties = [];
        this.createMembers(typeChecker, symbol);
    }
    Object.defineProperty(ClassDefinition.prototype, "methods", {
        get: function get() {
            return this._methods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassDefinition.prototype, "properties", {
        get: function get() {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    ClassDefinition.prototype.createMembers = function (typeChecker, symbol) {
        for (var memberName in symbol.members) {
            if (definitions_1.MethodDefinition.isClassMethod(symbol.members[memberName])) {
                this._methods.push(new definitions_1.MethodDefinition(typeChecker, symbol.members[memberName]));
            } else if (definitions_1.PropertyDefinition.isProperty(symbol.members[memberName])) {
                this._properties.push(new definitions_1.PropertyDefinition(typeChecker, symbol.members[memberName]));
            } else if (memberName === "__constructor") {
                throw "Constructors are currently not supported. Class: " + this.name;
            } else {
                throw "Not implemented '" + memberName + "'";
            }
        }
    };
    ClassDefinition.isClassDefinition = function (symbol) {
        return (symbol.flags & 32) !== 0;
    };
    Object.defineProperty(ClassDefinition.prototype, "methods", __decorate([utils_1.Serializable], ClassDefinition.prototype, "methods", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "methods")));
    Object.defineProperty(ClassDefinition.prototype, "properties", __decorate([utils_1.Serializable], ClassDefinition.prototype, "properties", Object.getOwnPropertyDescriptor(ClassDefinition.prototype, "properties")));
    return ClassDefinition;
})(definitions_1.NamedDefinition);
exports.ClassDefinition = ClassDefinition;
"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var MethodDefinition = (function (_super) {
    __extends(MethodDefinition, _super);
    function MethodDefinition(typeChecker, symbol) {
        _super.call(this, symbol);
        this._parameters = [];
        for (var _i = 0, _a = symbol.valueDeclaration.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var parameterSymbol = typeChecker.getSymbolAtLocation(param);
            this._parameters.push(new definitions_1.ParameterDefinition(typeChecker, parameterSymbol));
        }
    }
    Object.defineProperty(MethodDefinition.prototype, "parameters", {
        get: function get() {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    MethodDefinition.isClassMethod = function (symbol) {
        return (symbol.getFlags() & 8192) !== 0;
    };
    Object.defineProperty(MethodDefinition.prototype, "parameters", __decorate([utils_1.Serializable], MethodDefinition.prototype, "parameters", Object.getOwnPropertyDescriptor(MethodDefinition.prototype, "parameters")));
    return MethodDefinition;
})(definitions_1.NamedDefinition);
exports.MethodDefinition = MethodDefinition;
"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var definitions_1 = require("./../definitions");
var ParameterDefinition = (function (_super) {
    __extends(ParameterDefinition, _super);
    function ParameterDefinition(typeChecker, paramSymbol) {
        _super.call(this, typeChecker, paramSymbol);
    }
    return ParameterDefinition;
})(definitions_1.TypedDefinition);
exports.ParameterDefinition = ParameterDefinition;
"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var definitions_1 = require("./../definitions");
var PropertyDefinition = (function (_super) {
    __extends(PropertyDefinition, _super);
    function PropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
    }
    PropertyDefinition.isProperty = function (symbol) {
        return (symbol.getFlags() & 4) !== 0;
    };
    return PropertyDefinition;
})(definitions_1.TypedDefinition);
exports.PropertyDefinition = PropertyDefinition;
"use strict";

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var utils_1 = require("./../utils");
var definitions_1 = require("./../definitions");
var FileDefinition = (function () {
    function FileDefinition(typeChecker, file) {
        var _this = this;
        this._classes = [];
        this._name = file.fileName;
        var fileSymbol = typeChecker.getSymbolAtLocation(file);
        Object.keys(fileSymbol.exports).forEach(function (exportName) {
            var currentExport = fileSymbol.exports[exportName];
            if (definitions_1.ClassDefinition.isClassDefinition(currentExport)) {
                _this._classes.push(new definitions_1.ClassDefinition(typeChecker, currentExport));
            } else {
                throw "Currently only class exports are supported.";
            }
        });
        this.checkAnyClassExports();
    }
    Object.defineProperty(FileDefinition.prototype, "name", {
        get: function get() {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDefinition.prototype, "classes", {
        get: function get() {
            return this._classes;
        },
        enumerable: true,
        configurable: true
    });
    FileDefinition.prototype.checkAnyClassExports = function () {
        if (this.classes.length === 0) {
            console.warn(this.name + ": No class exports. Please provide a file that contains class exports");
        }
    };
    Object.defineProperty(FileDefinition.prototype, "name", __decorate([utils_1.Serializable], FileDefinition.prototype, "name", Object.getOwnPropertyDescriptor(FileDefinition.prototype, "name")));
    Object.defineProperty(FileDefinition.prototype, "classes", __decorate([utils_1.Serializable], FileDefinition.prototype, "classes", Object.getOwnPropertyDescriptor(FileDefinition.prototype, "classes")));
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;
"use strict";

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var definitions_1 = require("./../definitions");
var utils_1 = require("./../utils");
var DecoratorDefinition = (function () {
    function DecoratorDefinition(decorator) {
        this._arguments = [];
        var decoratorExpression = decorator.expression;
        this.fillName(decoratorExpression);
        if (utils_1.TypeGuards.isCallExpression(decoratorExpression)) {
            this.fillArguments(decoratorExpression.arguments);
        }
    }
    Object.defineProperty(DecoratorDefinition.prototype, "name", {
        get: function get() {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecoratorDefinition.prototype, "arguments", {
        get: function get() {
            return this._arguments;
        },
        enumerable: true,
        configurable: true
    });
    DecoratorDefinition.prototype.fillName = function (decoratorExpression) {
        if (utils_1.TypeGuards.isLiteralExpression(decoratorExpression)) {
            this._name = decoratorExpression.text;
        } else if (decoratorExpression != null) {
            this.fillName(decoratorExpression["expression"]);
        } else {
            throw "Unhandled: The decorator expression was null";
        }
    };
    DecoratorDefinition.prototype.fillArguments = function (args) {
        for (var _i = 0; _i < args.length; _i++) {
            var arg = args[_i];
            this._arguments.push(new definitions_1.ArgumentDefinition(arg));
        }
    };
    Object.defineProperty(DecoratorDefinition.prototype, "name", __decorate([utils_1.Serializable], DecoratorDefinition.prototype, "name", Object.getOwnPropertyDescriptor(DecoratorDefinition.prototype, "name")));
    Object.defineProperty(DecoratorDefinition.prototype, "arguments", __decorate([utils_1.Serializable], DecoratorDefinition.prototype, "arguments", Object.getOwnPropertyDescriptor(DecoratorDefinition.prototype, "arguments")));
    return DecoratorDefinition;
})();
exports.DecoratorDefinition = DecoratorDefinition;
"use strict";

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var utils_1 = require("./../utils");
var ArgumentDefinition = (function () {
    function ArgumentDefinition(arg) {
        this.isSupported(arg);
        this.fillName(arg);
    }
    Object.defineProperty(ArgumentDefinition.prototype, "text", {
        get: function get() {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    ArgumentDefinition.prototype.fillName = function (arg) {
        this._text = arg.text;
    };
    ArgumentDefinition.prototype.isSupported = function (arg) {
        if (arg["expression"] != null) {
            throw "Only string arguments are currently supported.";
        }
    };
    Object.defineProperty(ArgumentDefinition.prototype, "text", __decorate([utils_1.Serializable], ArgumentDefinition.prototype, "text", Object.getOwnPropertyDescriptor(ArgumentDefinition.prototype, "text")));
    return ArgumentDefinition;
})();
exports.ArgumentDefinition = ArgumentDefinition;
"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./definitions/named-definition"));
__export(require("./definitions/typed-definition"));
__export(require("./definitions/class-definition"));
__export(require("./definitions/method-definition"));
__export(require("./definitions/parameter-definition"));
__export(require("./definitions/property-definition"));
__export(require("./definitions/file-definition"));
__export(require("./definitions/decorator-definition"));
__export(require("./definitions/argument-definition"));
"use strict";

var ts = require("typescript");
var definitions_1 = require("./definitions");
var path = require("path");
var utils_1 = require("./utils");
function getFileInfo() {
    var fileNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fileNames[_i - 0] = arguments[_i];
    }
    var options = { noLib: false, experimentalDecorators: true };
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(fileNames, options, host);
    var typeChecker = program.getTypeChecker();
    return program.getSourceFiles().filter(function (file) {
        return path.basename(file.fileName) !== "lib.d.ts";
    }).map(function (file) {
        return new definitions_1.FileDefinition(new utils_1.TypeChecker(typeChecker, file), file);
    });
}
exports.getFileInfo = getFileInfo;
//# sourceMappingURL=type-info-ts.js.map
