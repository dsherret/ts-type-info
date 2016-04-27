// this is a test file used in import-tests
/// <reference path="definition.d.ts" />
/// <reference path="definition-var.d.ts" />

/* tslint:disable */
import DefaultExport from "./defaultExport";
import DefaultExportSeparate from "./defaultExportSeparate";
import {NamedExport1, NamedExport2} from "./namedExports";
import * as NamedExports from "./namedExports";
import DefaultExportClassLocalName1, {NamedExportEnum as NamedExportLocalName} from "./namedWithDefaultExport";
import DefaultExportClassLocalName2, * as NamedWithDefaultExportStarImport from "./namedWithDefaultExport";
import Expression from "./expression";

import * as reexports from "./reExport";
import * as definitionLocal from "definition";
import * as definitionNamespace from "./definitionNamespace";
import * as definitionVar from "definition-var";

// removes linting errors
function dummyFunction(...t: any[]) {
    return t;
}

dummyFunction(DefaultExportSeparate, NamedExport1, NamedExport2, NamedExports.NamedExport1, NamedExports.NamedExport2,
    DefaultExportClassLocalName, NamedExportLocalName, reexports.RenamedExport, reexports.NamedExport1, reexports.NamedExport2, Expression);

let myVar1: definitionLocal.DefinitionInterface;
dummyFunction(myVar1);
let myVar2: definitionNamespace.DefinitionNamespaceInterface;
dummyFunction(myVar2);
let myVar3 = () => definitionVar.Methods;
