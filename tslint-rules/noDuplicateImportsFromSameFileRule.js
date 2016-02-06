"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "import statement forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var NoImportsWalker = (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        _super.apply(this, arguments);
        this.fileImportsByFileName = {};
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        var sourceFile = node.parent;
        var fileImports = this.getFileImports(sourceFile.fileName);
        var importPath = node.moduleSpecifier.text;
        if (fileImports[importPath] != null) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        else {
            fileImports[importPath] = true;
        }
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    NoImportsWalker.prototype.getFileImports = function (fileName) {
        this.fileImportsByFileName[fileName] = this.fileImportsByFileName[fileName] || {};
        return this.fileImportsByFileName[fileName];
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
