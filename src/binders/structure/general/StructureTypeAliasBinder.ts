﻿import {StructureFactory} from "./../../../factories";
import {TypeAliasStructure} from "./../../../structures";
import {objectAssign} from "./../../../utils";
import {TypeAliasBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base/StructureBaseDefinitionBinder";
import {StructureNamedBinder} from "./../base/StructureNamedBinder";
import {StructureExportableBinder} from "./../base/StructureExportableBinder";
import {StructureTypedBinder} from "./../base/StructureTypedBinder";
import {StructureTypeParameteredBinder} from "./../base/StructureTypeParameteredBinder";
import {StructureAmbientableBinder} from "./../base/StructureAmbientableBinder";
import {StructureNodedBinder} from "./../base/StructureNodedBinder";

export class StructureTypeAliasBinder extends TypeAliasBinder {
    constructor(factory: StructureFactory, structure: TypeAliasStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureTypedBinder(factory, structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureAmbientableBinder(objectAssign(structure, { isAmbient: true })),
            new StructureNodedBinder()
        );
    }
}
