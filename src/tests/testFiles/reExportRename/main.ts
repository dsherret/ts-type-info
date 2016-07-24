import * as StarImport from "./reExports";
import {MyNamespace, MyNamespace as MyNamespaceAlias} from "./reExports";

let a = StarImport.MyNamespace.MyClass;
let b = MyNamespace.MyClass;
let c = MyNamespaceAlias.MyClass;
