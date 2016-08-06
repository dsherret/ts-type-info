/* tslint:disable */

// this is a test file used in import-tests
/// <reference path="definition.d.ts" />
/// <reference path="definition-var.d.ts" />

import DefaultExport from "./defaultExport";
import DefaultExportSeparate from "./defaultExportSeparate";
import {NamedExport1, NamedExport2} from "./namedExports";
import * as NamedExports from "./namedExports";
import DefaultExportClassLocalName1, {NamedExportEnum as NamedExportLocalName} from "./namedWithDefaultExport";
import DefaultExportClassLocalName2, * as NamedWithDefaultExportStarImport from "./namedWithDefaultExport";
import Expression from "./expression";
import "./expression";

import * as reexports from "./reExport";
import * as definitionLocal from "definition";
import * as definitionNamespace from "./definitionNamespace";
import * as definitionVar from "definition-var";
import * as NamedExpressions from "./namedExpression";

let myVar1: definitionLocal.DefinitionInterface = null as any;
let myVar2: definitionNamespace.DefinitionNamespaceInterface = null as any;
let myVar3 = () => definitionVar.Methods;

// gets rid of unused variable compile errors
{
    DefaultExport, DefaultExportSeparate, NamedExport1, NamedExport2,
    NamedExports, DefaultExportClassLocalName1, DefaultExportClassLocalName2,
    NamedExportLocalName, NamedWithDefaultExportStarImport, Expression, reexports,
    definitionLocal, definitionVar, NamedExpressions, myVar1, myVar2, myVar3
};
