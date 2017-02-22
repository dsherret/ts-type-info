/* tslint:disable */
/*
*************************************************************************
* AUTO GENERATED CODE BY generateCloneableFunctions.js -- DO NOT EDIT!! *
*************************************************************************
*/

import {TypeDefinition, BaseTypeDefinition, BaseExpressionDefinition, BaseDefinition} from "./definitions";

export function cloneTypeDefinition(definition: TypeDefinition) {
    const proto = Object.getPrototypeOf(definition);
    const obj: TypeDefinition = Object.create(proto);
    fillTypeDefinition(definition, obj);
    return obj;
}

export function fillTypeDefinition(from: TypeDefinition, to: TypeDefinition) {
    fillBaseTypeDefinition(from, to);

    to.callSignatures = [];
    from.callSignatures.forEach(val => {
        to.callSignatures.push(val);
    });
    to.node = from.node;
}

export function cloneBaseTypeDefinition(definition: BaseTypeDefinition) {
    const proto = Object.getPrototypeOf(definition);
    const obj: BaseTypeDefinition = Object.create(proto);
    fillBaseTypeDefinition(definition, obj);
    return obj;
}

export function fillBaseTypeDefinition(from: BaseTypeDefinition, to: BaseTypeDefinition) {
    fillBaseExpressionDefinition(from, to);

    if (from.arrayElementType == null) {
        to.arrayElementType = from.arrayElementType;
    }
    else {
        to.arrayElementType = cloneTypeDefinition(from.arrayElementType);
    }
    to.intersectionTypes = [];
    from.intersectionTypes.forEach(val => {
        to.intersectionTypes.push(cloneTypeDefinition(val));
    });
    to.unionTypes = [];
    from.unionTypes.forEach(val => {
        to.unionTypes.push(cloneTypeDefinition(val));
    });
    to.definitions = [];
    from.definitions.forEach(val => {
        to.definitions.push(val);
    });
    to.properties = [];
    from.properties.forEach(val => {
        to.properties.push(val);
    });
    to.typeArguments = [];
    from.typeArguments.forEach(val => {
        to.typeArguments.push(cloneTypeDefinition(val));
    });
    to._text = from._text;
}

export function cloneBaseExpressionDefinition(definition: BaseExpressionDefinition) {
    const proto = Object.getPrototypeOf(definition);
    const obj: BaseExpressionDefinition = Object.create(proto);
    fillBaseExpressionDefinition(definition, obj);
    return obj;
}

export function fillBaseExpressionDefinition(from: BaseExpressionDefinition, to: BaseExpressionDefinition) {
    fillBaseDefinition(from, to);

    to._text = from._text;
}

export function cloneBaseDefinition(definition: BaseDefinition) {
    const proto = Object.getPrototypeOf(definition);
    const obj: BaseDefinition = Object.create(proto);
    fillBaseDefinition(definition, obj);
    return obj;
}

export function fillBaseDefinition(from: BaseDefinition, to: BaseDefinition) {
    to.__uniqueID = ++BaseDefinition._uniqueID;
    to.onBeforeWrite = from.onBeforeWrite;
    to.onAfterWrite = from.onAfterWrite;
}
