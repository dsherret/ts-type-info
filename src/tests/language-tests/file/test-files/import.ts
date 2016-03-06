// this is a test file used in import-tests
/// <reference path="definition.d.ts" />
/// <reference path="definition-var.d.ts" />

/* tslint:disable */
import DefaultExport from "./default-export";
import DefaultExportSeparate from "./default-export-separate";
import {NamedExport1, NamedExport2} from "./named-exports";
import * as NamedExports from "./named-exports";
import DefaultExportClassLocalName, {NamedExportEnum as NamedExportLocalName} from "./named-with-default-export";
import Expression from "./expression";

import * as reexports from "./re-export";
import * as definitionLocal from "definition";
import * as definitionNamespace from "./definition-namespace";
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
