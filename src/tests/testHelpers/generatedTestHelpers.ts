/* tslint:disable */
/*
******************************************************************
* AUTO GENERATED CODE BY generateTestHelpers.js -- DO NOT EDIT!! *
******************************************************************
*/

import * as assert from "assert";
import {BaseDefinition, FunctionBodyWriteableDefinition, NamedDefinition, OptionallyNamedDefinition, OrderableDefinition, OptionalDefinition, AbstractableDefinition, AmbientableDefinition, AsyncableDefinition, DocumentationedDefinition, BaseExpressionDefinition, CallSignatureParameterDefinition, CallSignatureDefinition, IndexSignatureDefinition, TypeParameterDefinition, ReadonlyableDefinition, TypedDefinition, BasePropertyDefinition, TypePropertyDefinition, TypeParameteredDefinition, ExportableDefinition, TypeAliasDefinition, DecoratorDefinition, ObjectPropertyDefinition, TypeFunctionParameterDefinition, TypeNodeDefinition, TypeDefinition, UserDefinedTypeGuardDefinition, BaseTypeDefinition, ExpressionDefinition, ThisTypedDefinition, DefaultExpressionedDefinition, DecoratableDefinition, BaseObjectPropertyDefinition, BaseParameterDefinition, ParameteredDefinition, ReturnTypedDefinition, OverloadSignaturedDefinition, BaseFunctionDefinition, EnumMemberDefinition, EnumDefinition, ScopedDefinition, BaseClassMethodParameterDefinition, BaseClassMethodDefinition, BaseClassPropertyDefinition, InterfaceMethodParameterDefinition, InterfaceMethodDefinition, InterfacePropertyDefinition, InterfaceDefinition, ClassConstructorParameterDefinition, ClassConstructorDefinition, ClassMethodParameterDefinition, ClassMethodDefinition, ClassPropertyDefinition, ClassStaticMethodParameterDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition, ClassDefinition, FunctionParameterDefinition, FunctionDefinition, VariableDefinition, NamespaceDefinition, ModuledDefinition, StarImportPartDefinition, NamedImportPartDefinition, ReExportDefinition, DefaultImportPartDefinition, ImportDefinition, FileDefinition, GlobalDefinition, VariableDeclarationType, Scope, ClassConstructorParameterScope, ExportableDefinitions, ClassPropertyKind, NamespaceDeclarationType, ModuleMemberDefinitions} from "./../../definitions";
import {FunctionParameterStructure, ClassStaticMethodParameterStructure, ClassMethodParameterStructure, InterfaceMethodParameterStructure, BaseParameterStructure, BaseClassMethodParameterStructure, ObjectPropertyStructure, BaseStructure, OptionallyNamedStructure, OptionalStructure, TypedStructure, DefaultExpressionedStructure, DecoratableStructure, BaseObjectPropertyStructure, DecoratorStructure, BasePropertyStructure, NamedStructure, ReadonlyableStructure} from "./../../structures";

export interface Assertions {
    describe(description: string, spec: () => void): void;
    it(expectation: string, assertion: () => void): void;
    strictEqual(actual: any, expected: any): void;
}

class DefaultAssertions implements Assertions {
    describe(description: string, spec: () => void) {
        describe(description, spec);
    }

    it(expectation: string, assertion: () => void) {
        it(expectation, assertion);
    }

    strictEqual(actual: any, expected: any) {
        assert.strictEqual(actual, expected);
    }
}

export class WrapperAssertions {
    private assertAnyCount = 0;

    constructor(private readonly assertions: Assertions) {
    }

    describe(description: string, spec: () => void) {
        this.assertions.describe(description, spec);
    }

    it(expectation: string, assertion: () => void) {
        if (this.assertAnyCount > 0) {
            assertion();
        }
        else {
            this.assertions.it(expectation, assertion);
        }
    }

    strictEqual(actual: any, expected: any) {
        this.assertions.strictEqual(actual, expected);
    }

    assertAny(...checks: (() => void)[]) {
        this.assertAnyCount++;
        try {
            let didOverallPass = false
            for (const check of checks) {
                let didPass = true;
                try {
                    check();
                } catch (err) {
                    didPass = false;
                }
                if (didPass) {
                    didOverallPass = true;
                    break;
                }
            }
            if (!didOverallPass) {
                throw new Error("Did not equal any of the union types.");
            }
        } finally {
            this.assertAnyCount--;
        }
    }

    isNull(actual: any, expected: any) {
        if (actual != null || expected == null) {
            return false;
        }
        this.it("should not be null", () => {
            throw new Error("It's null");
        });
        return true;
    }
}

export interface TestRunner<TActual, TExpected> {
    runTest(actual: TActual, expected: TExpected): void;
}

export class StrictEqualTestRunner implements TestRunner<any, any> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    runTest(actual: any, expected: any) {
        this.assertions.it("should have the same value", () => {
            this.assertions.strictEqual(actual, expected);
        });
    }
}

export class TestRunnerArgsCache<T extends TestRunner<any, any>> {
    private readonly items: { args: any[]; value: T; }[];

    constructor() {
        this.items = [];
    }

    getIndex(args: any[]) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (args.length !== item.args.length) {
                continue;
            }

            let isMatch = true;
            for (let j = 0; j < args.length; j++) {
                if (args[j] !== item.args[j]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                return i;
            }
        }

        return -1;
    }

    addItem(value: T, args: any[]) {
        this.items.push({ value, args });
    }

    getItemAtIndex(index: number) {
        return this.items[index].value;
    }
}

export class TestRunnerFactory {
    private readonly assertions: WrapperAssertions;
    private BaseDefinitionTestRunner: BaseDefinitionTestRunner;
    private FunctionBodyWriteableDefinitionTestRunner: FunctionBodyWriteableDefinitionTestRunner;
    private NamedDefinitionTestRunner: NamedDefinitionTestRunner;
    private OptionallyNamedDefinitionTestRunner: OptionallyNamedDefinitionTestRunner;
    private OrderableDefinitionTestRunner: OrderableDefinitionTestRunner;
    private OptionalDefinitionTestRunner: OptionalDefinitionTestRunner;
    private AbstractableDefinitionTestRunner: AbstractableDefinitionTestRunner;
    private AmbientableDefinitionTestRunner: AmbientableDefinitionTestRunner;
    private AsyncableDefinitionTestRunner: AsyncableDefinitionTestRunner;
    private DocumentationedDefinitionTestRunner: DocumentationedDefinitionTestRunner;
    private BaseExpressionDefinitionTestRunner: BaseExpressionDefinitionTestRunner;
    private CallSignatureParameterDefinitionTestRunner: CallSignatureParameterDefinitionTestRunner;
    private CallSignatureDefinitionTestRunner: CallSignatureDefinitionTestRunner;
    private IndexSignatureDefinitionTestRunner: IndexSignatureDefinitionTestRunner;
    private TypeParameterDefinitionTestRunner: TypeParameterDefinitionTestRunner;
    private ReadonlyableDefinitionTestRunner: ReadonlyableDefinitionTestRunner;
    private TypedDefinitionTestRunner: TypedDefinitionTestRunner;
    private BasePropertyDefinitionTestRunner: BasePropertyDefinitionTestRunner;
    private TypePropertyDefinitionTestRunner: TypePropertyDefinitionTestRunner;
    private TypeParameteredDefinitionTestRunner: TypeParameteredDefinitionTestRunner;
    private ExportableDefinitionTestRunner: ExportableDefinitionTestRunner;
    private TypeAliasDefinitionTestRunner: TypeAliasDefinitionTestRunner;
    private DecoratorDefinitionTestRunner: DecoratorDefinitionTestRunner;
    private ObjectPropertyDefinitionTestRunner: ObjectPropertyDefinitionTestRunner;
    private TypeFunctionParameterDefinitionTestRunner: TypeFunctionParameterDefinitionTestRunner;
    private TypeNodeDefinitionTestRunner: TypeNodeDefinitionTestRunner;
    private TypeDefinitionTestRunner: TypeDefinitionTestRunner;
    private UserDefinedTypeGuardDefinitionTestRunner: UserDefinedTypeGuardDefinitionTestRunner;
    private BaseTypeDefinitionTestRunner: BaseTypeDefinitionTestRunner;
    private ExpressionDefinitionTestRunner: ExpressionDefinitionTestRunner;
    private ThisTypedDefinitionTestRunner: ThisTypedDefinitionTestRunner;
    private DefaultExpressionedDefinitionTestRunner: DefaultExpressionedDefinitionTestRunner;
    private DecoratableDefinitionTestRunner: DecoratableDefinitionTestRunner;
    private BaseObjectPropertyDefinitionTestRunner: BaseObjectPropertyDefinitionTestRunner;
    private BaseParameterDefinitionTestRunner: BaseParameterDefinitionTestRunner;
    private readonly ParameteredDefinitionTestRunnerArgsCache = new TestRunnerArgsCache<ParameteredDefinitionTestRunner<any, any, any, any>>();
    private ReturnTypedDefinitionTestRunner: ReturnTypedDefinitionTestRunner;
    private OverloadSignaturedDefinitionTestRunner: OverloadSignaturedDefinitionTestRunner;
    private readonly BaseFunctionDefinitionTestRunnerArgsCache = new TestRunnerArgsCache<BaseFunctionDefinitionTestRunner<any, any, any, any>>();
    private EnumMemberDefinitionTestRunner: EnumMemberDefinitionTestRunner;
    private EnumDefinitionTestRunner: EnumDefinitionTestRunner;
    private ScopedDefinitionTestRunner: ScopedDefinitionTestRunner;
    private BaseClassMethodParameterDefinitionTestRunner: BaseClassMethodParameterDefinitionTestRunner;
    private readonly BaseClassMethodDefinitionTestRunnerArgsCache = new TestRunnerArgsCache<BaseClassMethodDefinitionTestRunner<any, any, any, any>>();
    private BaseClassPropertyDefinitionTestRunner: BaseClassPropertyDefinitionTestRunner;
    private InterfaceMethodParameterDefinitionTestRunner: InterfaceMethodParameterDefinitionTestRunner;
    private InterfaceMethodDefinitionTestRunner: InterfaceMethodDefinitionTestRunner;
    private InterfacePropertyDefinitionTestRunner: InterfacePropertyDefinitionTestRunner;
    private InterfaceDefinitionTestRunner: InterfaceDefinitionTestRunner;
    private ClassConstructorParameterDefinitionTestRunner: ClassConstructorParameterDefinitionTestRunner;
    private ClassConstructorDefinitionTestRunner: ClassConstructorDefinitionTestRunner;
    private ClassMethodParameterDefinitionTestRunner: ClassMethodParameterDefinitionTestRunner;
    private ClassMethodDefinitionTestRunner: ClassMethodDefinitionTestRunner;
    private ClassPropertyDefinitionTestRunner: ClassPropertyDefinitionTestRunner;
    private ClassStaticMethodParameterDefinitionTestRunner: ClassStaticMethodParameterDefinitionTestRunner;
    private ClassStaticMethodDefinitionTestRunner: ClassStaticMethodDefinitionTestRunner;
    private ClassStaticPropertyDefinitionTestRunner: ClassStaticPropertyDefinitionTestRunner;
    private ClassDefinitionTestRunner: ClassDefinitionTestRunner;
    private FunctionParameterDefinitionTestRunner: FunctionParameterDefinitionTestRunner;
    private FunctionDefinitionTestRunner: FunctionDefinitionTestRunner;
    private VariableDefinitionTestRunner: VariableDefinitionTestRunner;
    private NamespaceDefinitionTestRunner: NamespaceDefinitionTestRunner;
    private ModuledDefinitionTestRunner: ModuledDefinitionTestRunner;
    private StarImportPartDefinitionTestRunner: StarImportPartDefinitionTestRunner;
    private NamedImportPartDefinitionTestRunner: NamedImportPartDefinitionTestRunner;
    private ReExportDefinitionTestRunner: ReExportDefinitionTestRunner;
    private DefaultImportPartDefinitionTestRunner: DefaultImportPartDefinitionTestRunner;
    private ImportDefinitionTestRunner: ImportDefinitionTestRunner;
    private FileDefinitionTestRunner: FileDefinitionTestRunner;
    private GlobalDefinitionTestRunner: GlobalDefinitionTestRunner;
    private InterfaceMethodParameterStructureTestRunner: InterfaceMethodParameterStructureTestRunner;
    private ClassMethodParameterStructureTestRunner: ClassMethodParameterStructureTestRunner;
    private ClassStaticMethodParameterStructureTestRunner: ClassStaticMethodParameterStructureTestRunner;
    private FunctionParameterStructureTestRunner: FunctionParameterStructureTestRunner;
    private BaseParameterStructureTestRunner: BaseParameterStructureTestRunner;
    private BaseClassMethodParameterStructureTestRunner: BaseClassMethodParameterStructureTestRunner;
    private ObjectPropertyStructureTestRunner: ObjectPropertyStructureTestRunner;
    private BaseStructureTestRunner: BaseStructureTestRunner;
    private OptionallyNamedStructureTestRunner: OptionallyNamedStructureTestRunner;
    private OptionalStructureTestRunner: OptionalStructureTestRunner;
    private TypedStructureTestRunner: TypedStructureTestRunner;
    private DefaultExpressionedStructureTestRunner: DefaultExpressionedStructureTestRunner;
    private DecoratableStructureTestRunner: DecoratableStructureTestRunner;
    private BaseObjectPropertyStructureTestRunner: BaseObjectPropertyStructureTestRunner;
    private DecoratorStructureTestRunner: DecoratorStructureTestRunner;
    private BasePropertyStructureTestRunner: BasePropertyStructureTestRunner;
    private NamedStructureTestRunner: NamedStructureTestRunner;
    private ReadonlyableStructureTestRunner: ReadonlyableStructureTestRunner;

    constructor(assertions?: Assertions) {
        this.assertions = new WrapperAssertions(assertions || new DefaultAssertions());
    }

    getStrictEqualTestRunner() {
        return new StrictEqualTestRunner(this.assertions);
    }

    getBaseDefinitionTestRunner() {
        if (this.BaseDefinitionTestRunner != null) {
            return this.BaseDefinitionTestRunner;
        }

        const vBaseDefinitionTestRunner = new BaseDefinitionTestRunner(this.assertions);
        this.BaseDefinitionTestRunner = vBaseDefinitionTestRunner;

        vBaseDefinitionTestRunner.initialize();

        return vBaseDefinitionTestRunner;
    }

    getFunctionBodyWriteableDefinitionTestRunner() {
        if (this.FunctionBodyWriteableDefinitionTestRunner != null) {
            return this.FunctionBodyWriteableDefinitionTestRunner;
        }

        const vFunctionBodyWriteableDefinitionTestRunner = new FunctionBodyWriteableDefinitionTestRunner(this.assertions);
        this.FunctionBodyWriteableDefinitionTestRunner = vFunctionBodyWriteableDefinitionTestRunner;

        vFunctionBodyWriteableDefinitionTestRunner.initialize();

        return vFunctionBodyWriteableDefinitionTestRunner;
    }

    getNamedDefinitionTestRunner() {
        if (this.NamedDefinitionTestRunner != null) {
            return this.NamedDefinitionTestRunner;
        }

        const vNamedDefinitionTestRunner = new NamedDefinitionTestRunner(this.assertions);
        this.NamedDefinitionTestRunner = vNamedDefinitionTestRunner;

        vNamedDefinitionTestRunner.initialize();

        return vNamedDefinitionTestRunner;
    }

    getOptionallyNamedDefinitionTestRunner() {
        if (this.OptionallyNamedDefinitionTestRunner != null) {
            return this.OptionallyNamedDefinitionTestRunner;
        }

        const vOptionallyNamedDefinitionTestRunner = new OptionallyNamedDefinitionTestRunner(this.assertions);
        this.OptionallyNamedDefinitionTestRunner = vOptionallyNamedDefinitionTestRunner;

        vOptionallyNamedDefinitionTestRunner.initialize();

        return vOptionallyNamedDefinitionTestRunner;
    }

    getOrderableDefinitionTestRunner() {
        if (this.OrderableDefinitionTestRunner != null) {
            return this.OrderableDefinitionTestRunner;
        }

        const vOrderableDefinitionTestRunner = new OrderableDefinitionTestRunner(this.assertions);
        this.OrderableDefinitionTestRunner = vOrderableDefinitionTestRunner;

        vOrderableDefinitionTestRunner.initialize();

        return vOrderableDefinitionTestRunner;
    }

    getOptionalDefinitionTestRunner() {
        if (this.OptionalDefinitionTestRunner != null) {
            return this.OptionalDefinitionTestRunner;
        }

        const vOptionalDefinitionTestRunner = new OptionalDefinitionTestRunner(this.assertions);
        this.OptionalDefinitionTestRunner = vOptionalDefinitionTestRunner;

        vOptionalDefinitionTestRunner.initialize();

        return vOptionalDefinitionTestRunner;
    }

    getAbstractableDefinitionTestRunner() {
        if (this.AbstractableDefinitionTestRunner != null) {
            return this.AbstractableDefinitionTestRunner;
        }

        const vAbstractableDefinitionTestRunner = new AbstractableDefinitionTestRunner(this.assertions);
        this.AbstractableDefinitionTestRunner = vAbstractableDefinitionTestRunner;

        vAbstractableDefinitionTestRunner.initialize();

        return vAbstractableDefinitionTestRunner;
    }

    getAmbientableDefinitionTestRunner() {
        if (this.AmbientableDefinitionTestRunner != null) {
            return this.AmbientableDefinitionTestRunner;
        }

        const vAmbientableDefinitionTestRunner = new AmbientableDefinitionTestRunner(this.assertions);
        this.AmbientableDefinitionTestRunner = vAmbientableDefinitionTestRunner;

        vAmbientableDefinitionTestRunner.initialize();

        return vAmbientableDefinitionTestRunner;
    }

    getAsyncableDefinitionTestRunner() {
        if (this.AsyncableDefinitionTestRunner != null) {
            return this.AsyncableDefinitionTestRunner;
        }

        const vAsyncableDefinitionTestRunner = new AsyncableDefinitionTestRunner(this.assertions);
        this.AsyncableDefinitionTestRunner = vAsyncableDefinitionTestRunner;

        vAsyncableDefinitionTestRunner.initialize();

        return vAsyncableDefinitionTestRunner;
    }

    getDocumentationedDefinitionTestRunner() {
        if (this.DocumentationedDefinitionTestRunner != null) {
            return this.DocumentationedDefinitionTestRunner;
        }

        const vDocumentationedDefinitionTestRunner = new DocumentationedDefinitionTestRunner(this.assertions);
        this.DocumentationedDefinitionTestRunner = vDocumentationedDefinitionTestRunner;

        vDocumentationedDefinitionTestRunner.initialize();

        return vDocumentationedDefinitionTestRunner;
    }

    getBaseExpressionDefinitionTestRunner() {
        if (this.BaseExpressionDefinitionTestRunner != null) {
            return this.BaseExpressionDefinitionTestRunner;
        }

        const vBaseExpressionDefinitionTestRunner = new BaseExpressionDefinitionTestRunner(this.assertions);
        this.BaseExpressionDefinitionTestRunner = vBaseExpressionDefinitionTestRunner;

        vBaseExpressionDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner());

        return vBaseExpressionDefinitionTestRunner;
    }

    getCallSignatureParameterDefinitionTestRunner() {
        if (this.CallSignatureParameterDefinitionTestRunner != null) {
            return this.CallSignatureParameterDefinitionTestRunner;
        }

        const vCallSignatureParameterDefinitionTestRunner = new CallSignatureParameterDefinitionTestRunner(this.assertions);
        this.CallSignatureParameterDefinitionTestRunner = vCallSignatureParameterDefinitionTestRunner;

        vCallSignatureParameterDefinitionTestRunner.initialize(this.getBaseParameterDefinitionTestRunner());

        return vCallSignatureParameterDefinitionTestRunner;
    }

    getCallSignatureDefinitionTestRunner() {
        if (this.CallSignatureDefinitionTestRunner != null) {
            return this.CallSignatureDefinitionTestRunner;
        }

        const vCallSignatureDefinitionTestRunner = new CallSignatureDefinitionTestRunner(this.assertions);
        this.CallSignatureDefinitionTestRunner = vCallSignatureDefinitionTestRunner;

        vCallSignatureDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getCallSignatureParameterDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getTypeParameterDefinitionTestRunner());

        return vCallSignatureDefinitionTestRunner;
    }

    getIndexSignatureDefinitionTestRunner() {
        if (this.IndexSignatureDefinitionTestRunner != null) {
            return this.IndexSignatureDefinitionTestRunner;
        }

        const vIndexSignatureDefinitionTestRunner = new IndexSignatureDefinitionTestRunner(this.assertions);
        this.IndexSignatureDefinitionTestRunner = vIndexSignatureDefinitionTestRunner;

        vIndexSignatureDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getTypeDefinitionTestRunner());

        return vIndexSignatureDefinitionTestRunner;
    }

    getTypeParameterDefinitionTestRunner() {
        if (this.TypeParameterDefinitionTestRunner != null) {
            return this.TypeParameterDefinitionTestRunner;
        }

        const vTypeParameterDefinitionTestRunner = new TypeParameterDefinitionTestRunner(this.assertions);
        this.TypeParameterDefinitionTestRunner = vTypeParameterDefinitionTestRunner;

        vTypeParameterDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getTypeDefinitionTestRunner());

        return vTypeParameterDefinitionTestRunner;
    }

    getReadonlyableDefinitionTestRunner() {
        if (this.ReadonlyableDefinitionTestRunner != null) {
            return this.ReadonlyableDefinitionTestRunner;
        }

        const vReadonlyableDefinitionTestRunner = new ReadonlyableDefinitionTestRunner(this.assertions);
        this.ReadonlyableDefinitionTestRunner = vReadonlyableDefinitionTestRunner;

        vReadonlyableDefinitionTestRunner.initialize();

        return vReadonlyableDefinitionTestRunner;
    }

    getTypedDefinitionTestRunner() {
        if (this.TypedDefinitionTestRunner != null) {
            return this.TypedDefinitionTestRunner;
        }

        const vTypedDefinitionTestRunner = new TypedDefinitionTestRunner(this.assertions);
        this.TypedDefinitionTestRunner = vTypedDefinitionTestRunner;

        vTypedDefinitionTestRunner.initialize(this.getTypeDefinitionTestRunner());

        return vTypedDefinitionTestRunner;
    }

    getBasePropertyDefinitionTestRunner() {
        if (this.BasePropertyDefinitionTestRunner != null) {
            return this.BasePropertyDefinitionTestRunner;
        }

        const vBasePropertyDefinitionTestRunner = new BasePropertyDefinitionTestRunner(this.assertions);
        this.BasePropertyDefinitionTestRunner = vBasePropertyDefinitionTestRunner;

        vBasePropertyDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getTypeDefinitionTestRunner());

        return vBasePropertyDefinitionTestRunner;
    }

    getTypePropertyDefinitionTestRunner() {
        if (this.TypePropertyDefinitionTestRunner != null) {
            return this.TypePropertyDefinitionTestRunner;
        }

        const vTypePropertyDefinitionTestRunner = new TypePropertyDefinitionTestRunner(this.assertions);
        this.TypePropertyDefinitionTestRunner = vTypePropertyDefinitionTestRunner;

        vTypePropertyDefinitionTestRunner.initialize(this.getBasePropertyDefinitionTestRunner());

        return vTypePropertyDefinitionTestRunner;
    }

    getTypeParameteredDefinitionTestRunner() {
        if (this.TypeParameteredDefinitionTestRunner != null) {
            return this.TypeParameteredDefinitionTestRunner;
        }

        const vTypeParameteredDefinitionTestRunner = new TypeParameteredDefinitionTestRunner(this.assertions);
        this.TypeParameteredDefinitionTestRunner = vTypeParameteredDefinitionTestRunner;

        vTypeParameteredDefinitionTestRunner.initialize(this.getTypeParameterDefinitionTestRunner());

        return vTypeParameteredDefinitionTestRunner;
    }

    getExportableDefinitionTestRunner() {
        if (this.ExportableDefinitionTestRunner != null) {
            return this.ExportableDefinitionTestRunner;
        }

        const vExportableDefinitionTestRunner = new ExportableDefinitionTestRunner(this.assertions);
        this.ExportableDefinitionTestRunner = vExportableDefinitionTestRunner;

        vExportableDefinitionTestRunner.initialize();

        return vExportableDefinitionTestRunner;
    }

    getTypeAliasDefinitionTestRunner() {
        if (this.TypeAliasDefinitionTestRunner != null) {
            return this.TypeAliasDefinitionTestRunner;
        }

        const vTypeAliasDefinitionTestRunner = new TypeAliasDefinitionTestRunner(this.assertions);
        this.TypeAliasDefinitionTestRunner = vTypeAliasDefinitionTestRunner;

        vTypeAliasDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getTypeParameterDefinitionTestRunner());

        return vTypeAliasDefinitionTestRunner;
    }

    getDecoratorDefinitionTestRunner() {
        if (this.DecoratorDefinitionTestRunner != null) {
            return this.DecoratorDefinitionTestRunner;
        }

        const vDecoratorDefinitionTestRunner = new DecoratorDefinitionTestRunner(this.assertions);
        this.DecoratorDefinitionTestRunner = vDecoratorDefinitionTestRunner;

        vDecoratorDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getExpressionDefinitionTestRunner());

        return vDecoratorDefinitionTestRunner;
    }

    getObjectPropertyDefinitionTestRunner() {
        if (this.ObjectPropertyDefinitionTestRunner != null) {
            return this.ObjectPropertyDefinitionTestRunner;
        }

        const vObjectPropertyDefinitionTestRunner = new ObjectPropertyDefinitionTestRunner(this.assertions);
        this.ObjectPropertyDefinitionTestRunner = vObjectPropertyDefinitionTestRunner;

        vObjectPropertyDefinitionTestRunner.initialize(this.getBaseObjectPropertyDefinitionTestRunner());

        return vObjectPropertyDefinitionTestRunner;
    }

    getTypeFunctionParameterDefinitionTestRunner() {
        if (this.TypeFunctionParameterDefinitionTestRunner != null) {
            return this.TypeFunctionParameterDefinitionTestRunner;
        }

        const vTypeFunctionParameterDefinitionTestRunner = new TypeFunctionParameterDefinitionTestRunner(this.assertions);
        this.TypeFunctionParameterDefinitionTestRunner = vTypeFunctionParameterDefinitionTestRunner;

        vTypeFunctionParameterDefinitionTestRunner.initialize(this.getBaseParameterDefinitionTestRunner());

        return vTypeFunctionParameterDefinitionTestRunner;
    }

    getTypeNodeDefinitionTestRunner() {
        if (this.TypeNodeDefinitionTestRunner != null) {
            return this.TypeNodeDefinitionTestRunner;
        }

        const vTypeNodeDefinitionTestRunner = new TypeNodeDefinitionTestRunner(this.assertions);
        this.TypeNodeDefinitionTestRunner = vTypeNodeDefinitionTestRunner;

        vTypeNodeDefinitionTestRunner.initialize(this.getBaseTypeDefinitionTestRunner(), this.getTypeParameterDefinitionTestRunner(), this.getTypeFunctionParameterDefinitionTestRunner());

        return vTypeNodeDefinitionTestRunner;
    }

    getTypeDefinitionTestRunner() {
        if (this.TypeDefinitionTestRunner != null) {
            return this.TypeDefinitionTestRunner;
        }

        const vTypeDefinitionTestRunner = new TypeDefinitionTestRunner(this.assertions);
        this.TypeDefinitionTestRunner = vTypeDefinitionTestRunner;

        vTypeDefinitionTestRunner.initialize(this.getBaseTypeDefinitionTestRunner(), this.getCallSignatureDefinitionTestRunner(), this.getTypeNodeDefinitionTestRunner());

        return vTypeDefinitionTestRunner;
    }

    getUserDefinedTypeGuardDefinitionTestRunner() {
        if (this.UserDefinedTypeGuardDefinitionTestRunner != null) {
            return this.UserDefinedTypeGuardDefinitionTestRunner;
        }

        const vUserDefinedTypeGuardDefinitionTestRunner = new UserDefinedTypeGuardDefinitionTestRunner(this.assertions);
        this.UserDefinedTypeGuardDefinitionTestRunner = vUserDefinedTypeGuardDefinitionTestRunner;

        vUserDefinedTypeGuardDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getTypeDefinitionTestRunner());

        return vUserDefinedTypeGuardDefinitionTestRunner;
    }

    getBaseTypeDefinitionTestRunner() {
        if (this.BaseTypeDefinitionTestRunner != null) {
            return this.BaseTypeDefinitionTestRunner;
        }

        const vBaseTypeDefinitionTestRunner = new BaseTypeDefinitionTestRunner(this.assertions);
        this.BaseTypeDefinitionTestRunner = vBaseTypeDefinitionTestRunner;

        vBaseTypeDefinitionTestRunner.initialize(this.getBaseExpressionDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getTypePropertyDefinitionTestRunner());

        return vBaseTypeDefinitionTestRunner;
    }

    getExpressionDefinitionTestRunner() {
        if (this.ExpressionDefinitionTestRunner != null) {
            return this.ExpressionDefinitionTestRunner;
        }

        const vExpressionDefinitionTestRunner = new ExpressionDefinitionTestRunner(this.assertions);
        this.ExpressionDefinitionTestRunner = vExpressionDefinitionTestRunner;

        vExpressionDefinitionTestRunner.initialize(this.getBaseExpressionDefinitionTestRunner());

        return vExpressionDefinitionTestRunner;
    }

    getThisTypedDefinitionTestRunner() {
        if (this.ThisTypedDefinitionTestRunner != null) {
            return this.ThisTypedDefinitionTestRunner;
        }

        const vThisTypedDefinitionTestRunner = new ThisTypedDefinitionTestRunner(this.assertions);
        this.ThisTypedDefinitionTestRunner = vThisTypedDefinitionTestRunner;

        vThisTypedDefinitionTestRunner.initialize(this.getTypeDefinitionTestRunner());

        return vThisTypedDefinitionTestRunner;
    }

    getDefaultExpressionedDefinitionTestRunner() {
        if (this.DefaultExpressionedDefinitionTestRunner != null) {
            return this.DefaultExpressionedDefinitionTestRunner;
        }

        const vDefaultExpressionedDefinitionTestRunner = new DefaultExpressionedDefinitionTestRunner(this.assertions);
        this.DefaultExpressionedDefinitionTestRunner = vDefaultExpressionedDefinitionTestRunner;

        vDefaultExpressionedDefinitionTestRunner.initialize(this.getExpressionDefinitionTestRunner());

        return vDefaultExpressionedDefinitionTestRunner;
    }

    getDecoratableDefinitionTestRunner() {
        if (this.DecoratableDefinitionTestRunner != null) {
            return this.DecoratableDefinitionTestRunner;
        }

        const vDecoratableDefinitionTestRunner = new DecoratableDefinitionTestRunner(this.assertions);
        this.DecoratableDefinitionTestRunner = vDecoratableDefinitionTestRunner;

        vDecoratableDefinitionTestRunner.initialize(this.getDecoratorDefinitionTestRunner());

        return vDecoratableDefinitionTestRunner;
    }

    getBaseObjectPropertyDefinitionTestRunner() {
        if (this.BaseObjectPropertyDefinitionTestRunner != null) {
            return this.BaseObjectPropertyDefinitionTestRunner;
        }

        const vBaseObjectPropertyDefinitionTestRunner = new BaseObjectPropertyDefinitionTestRunner(this.assertions);
        this.BaseObjectPropertyDefinitionTestRunner = vBaseObjectPropertyDefinitionTestRunner;

        vBaseObjectPropertyDefinitionTestRunner.initialize(this.getBasePropertyDefinitionTestRunner(), this.getExpressionDefinitionTestRunner());

        return vBaseObjectPropertyDefinitionTestRunner;
    }

    getBaseParameterDefinitionTestRunner() {
        if (this.BaseParameterDefinitionTestRunner != null) {
            return this.BaseParameterDefinitionTestRunner;
        }

        const vBaseParameterDefinitionTestRunner = new BaseParameterDefinitionTestRunner(this.assertions);
        this.BaseParameterDefinitionTestRunner = vBaseParameterDefinitionTestRunner;

        vBaseParameterDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getObjectPropertyDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getExpressionDefinitionTestRunner());

        return vBaseParameterDefinitionTestRunner;
    }

    getParameteredDefinitionTestRunner<ParameterType extends BaseParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseParameterDefinitionTestStructure, ParameterStructureTypeExpected>(ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        const args = [ParameterTypeTestRunner, ParameterStructureTypeTestRunner];
        const index = this.ParameteredDefinitionTestRunnerArgsCache.getIndex(args);

        if (index >= 0) {
            return this.ParameteredDefinitionTestRunnerArgsCache.getItemAtIndex(index);
        }

        const vParameteredDefinitionTestRunner = new ParameteredDefinitionTestRunner(this.assertions);
        this.ParameteredDefinitionTestRunnerArgsCache.addItem(vParameteredDefinitionTestRunner, args);

        vParameteredDefinitionTestRunner.initialize(ParameterTypeTestRunner, ParameterStructureTypeTestRunner);

        return vParameteredDefinitionTestRunner;
    }

    getReturnTypedDefinitionTestRunner() {
        if (this.ReturnTypedDefinitionTestRunner != null) {
            return this.ReturnTypedDefinitionTestRunner;
        }

        const vReturnTypedDefinitionTestRunner = new ReturnTypedDefinitionTestRunner(this.assertions);
        this.ReturnTypedDefinitionTestRunner = vReturnTypedDefinitionTestRunner;

        vReturnTypedDefinitionTestRunner.initialize(this.getTypeDefinitionTestRunner());

        return vReturnTypedDefinitionTestRunner;
    }

    getOverloadSignaturedDefinitionTestRunner() {
        if (this.OverloadSignaturedDefinitionTestRunner != null) {
            return this.OverloadSignaturedDefinitionTestRunner;
        }

        const vOverloadSignaturedDefinitionTestRunner = new OverloadSignaturedDefinitionTestRunner(this.assertions);
        this.OverloadSignaturedDefinitionTestRunner = vOverloadSignaturedDefinitionTestRunner;

        vOverloadSignaturedDefinitionTestRunner.initialize(this.getCallSignatureDefinitionTestRunner());

        return vOverloadSignaturedDefinitionTestRunner;
    }

    getBaseFunctionDefinitionTestRunner<ParameterType extends BaseParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseParameterDefinitionTestStructure, ParameterStructureTypeExpected>(ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        const args = [ParameterTypeTestRunner, ParameterStructureTypeTestRunner];
        const index = this.BaseFunctionDefinitionTestRunnerArgsCache.getIndex(args);

        if (index >= 0) {
            return this.BaseFunctionDefinitionTestRunnerArgsCache.getItemAtIndex(index);
        }

        const vBaseFunctionDefinitionTestRunner = new BaseFunctionDefinitionTestRunner(this.assertions);
        this.BaseFunctionDefinitionTestRunnerArgsCache.addItem(vBaseFunctionDefinitionTestRunner, args);

        vBaseFunctionDefinitionTestRunner.initialize(ParameterTypeTestRunner, ParameterStructureTypeTestRunner, this.getBaseDefinitionTestRunner(), this.getUserDefinedTypeGuardDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getTypeParameterDefinitionTestRunner(), this.getCallSignatureDefinitionTestRunner());

        return vBaseFunctionDefinitionTestRunner;
    }

    getEnumMemberDefinitionTestRunner() {
        if (this.EnumMemberDefinitionTestRunner != null) {
            return this.EnumMemberDefinitionTestRunner;
        }

        const vEnumMemberDefinitionTestRunner = new EnumMemberDefinitionTestRunner(this.assertions);
        this.EnumMemberDefinitionTestRunner = vEnumMemberDefinitionTestRunner;

        vEnumMemberDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner());

        return vEnumMemberDefinitionTestRunner;
    }

    getEnumDefinitionTestRunner() {
        if (this.EnumDefinitionTestRunner != null) {
            return this.EnumDefinitionTestRunner;
        }

        const vEnumDefinitionTestRunner = new EnumDefinitionTestRunner(this.assertions);
        this.EnumDefinitionTestRunner = vEnumDefinitionTestRunner;

        vEnumDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getEnumMemberDefinitionTestRunner());

        return vEnumDefinitionTestRunner;
    }

    getScopedDefinitionTestRunner() {
        if (this.ScopedDefinitionTestRunner != null) {
            return this.ScopedDefinitionTestRunner;
        }

        const vScopedDefinitionTestRunner = new ScopedDefinitionTestRunner(this.assertions);
        this.ScopedDefinitionTestRunner = vScopedDefinitionTestRunner;

        vScopedDefinitionTestRunner.initialize();

        return vScopedDefinitionTestRunner;
    }

    getBaseClassMethodParameterDefinitionTestRunner() {
        if (this.BaseClassMethodParameterDefinitionTestRunner != null) {
            return this.BaseClassMethodParameterDefinitionTestRunner;
        }

        const vBaseClassMethodParameterDefinitionTestRunner = new BaseClassMethodParameterDefinitionTestRunner(this.assertions);
        this.BaseClassMethodParameterDefinitionTestRunner = vBaseClassMethodParameterDefinitionTestRunner;

        vBaseClassMethodParameterDefinitionTestRunner.initialize(this.getBaseParameterDefinitionTestRunner(), this.getDecoratorDefinitionTestRunner());

        return vBaseClassMethodParameterDefinitionTestRunner;
    }

    getBaseClassMethodDefinitionTestRunner<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseClassMethodParameterDefinitionTestStructure, ParameterStructureTypeExpected>(ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        const args = [ParameterTypeTestRunner, ParameterStructureTypeTestRunner];
        const index = this.BaseClassMethodDefinitionTestRunnerArgsCache.getIndex(args);

        if (index >= 0) {
            return this.BaseClassMethodDefinitionTestRunnerArgsCache.getItemAtIndex(index);
        }

        const vBaseClassMethodDefinitionTestRunner = new BaseClassMethodDefinitionTestRunner(this.assertions);
        this.BaseClassMethodDefinitionTestRunnerArgsCache.addItem(vBaseClassMethodDefinitionTestRunner, args);

        vBaseClassMethodDefinitionTestRunner.initialize(ParameterTypeTestRunner, ParameterStructureTypeTestRunner, this.getBaseFunctionDefinitionTestRunner(ParameterTypeTestRunner, ParameterStructureTypeTestRunner), this.getDecoratorDefinitionTestRunner());

        return vBaseClassMethodDefinitionTestRunner;
    }

    getBaseClassPropertyDefinitionTestRunner() {
        if (this.BaseClassPropertyDefinitionTestRunner != null) {
            return this.BaseClassPropertyDefinitionTestRunner;
        }

        const vBaseClassPropertyDefinitionTestRunner = new BaseClassPropertyDefinitionTestRunner(this.assertions);
        this.BaseClassPropertyDefinitionTestRunner = vBaseClassPropertyDefinitionTestRunner;

        vBaseClassPropertyDefinitionTestRunner.initialize(this.getBaseObjectPropertyDefinitionTestRunner(), this.getDecoratorDefinitionTestRunner());

        return vBaseClassPropertyDefinitionTestRunner;
    }

    getInterfaceMethodParameterDefinitionTestRunner() {
        if (this.InterfaceMethodParameterDefinitionTestRunner != null) {
            return this.InterfaceMethodParameterDefinitionTestRunner;
        }

        const vInterfaceMethodParameterDefinitionTestRunner = new InterfaceMethodParameterDefinitionTestRunner(this.assertions);
        this.InterfaceMethodParameterDefinitionTestRunner = vInterfaceMethodParameterDefinitionTestRunner;

        vInterfaceMethodParameterDefinitionTestRunner.initialize(this.getBaseParameterDefinitionTestRunner());

        return vInterfaceMethodParameterDefinitionTestRunner;
    }

    getInterfaceMethodDefinitionTestRunner() {
        if (this.InterfaceMethodDefinitionTestRunner != null) {
            return this.InterfaceMethodDefinitionTestRunner;
        }

        const vInterfaceMethodDefinitionTestRunner = new InterfaceMethodDefinitionTestRunner(this.assertions);
        this.InterfaceMethodDefinitionTestRunner = vInterfaceMethodDefinitionTestRunner;

        vInterfaceMethodDefinitionTestRunner.initialize(this.getBaseFunctionDefinitionTestRunner(this.getInterfaceMethodParameterDefinitionTestRunner(), this.getInterfaceMethodParameterStructureTestRunner()));

        return vInterfaceMethodDefinitionTestRunner;
    }

    getInterfacePropertyDefinitionTestRunner() {
        if (this.InterfacePropertyDefinitionTestRunner != null) {
            return this.InterfacePropertyDefinitionTestRunner;
        }

        const vInterfacePropertyDefinitionTestRunner = new InterfacePropertyDefinitionTestRunner(this.assertions);
        this.InterfacePropertyDefinitionTestRunner = vInterfacePropertyDefinitionTestRunner;

        vInterfacePropertyDefinitionTestRunner.initialize(this.getBasePropertyDefinitionTestRunner());

        return vInterfacePropertyDefinitionTestRunner;
    }

    getInterfaceDefinitionTestRunner() {
        if (this.InterfaceDefinitionTestRunner != null) {
            return this.InterfaceDefinitionTestRunner;
        }

        const vInterfaceDefinitionTestRunner = new InterfaceDefinitionTestRunner(this.assertions);
        this.InterfaceDefinitionTestRunner = vInterfaceDefinitionTestRunner;

        vInterfaceDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getInterfaceMethodDefinitionTestRunner(), this.getCallSignatureDefinitionTestRunner(), this.getIndexSignatureDefinitionTestRunner(), this.getInterfacePropertyDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getTypeParameterDefinitionTestRunner());

        return vInterfaceDefinitionTestRunner;
    }

    getClassConstructorParameterDefinitionTestRunner() {
        if (this.ClassConstructorParameterDefinitionTestRunner != null) {
            return this.ClassConstructorParameterDefinitionTestRunner;
        }

        const vClassConstructorParameterDefinitionTestRunner = new ClassConstructorParameterDefinitionTestRunner(this.assertions);
        this.ClassConstructorParameterDefinitionTestRunner = vClassConstructorParameterDefinitionTestRunner;

        vClassConstructorParameterDefinitionTestRunner.initialize(this.getBaseParameterDefinitionTestRunner(), this.getDecoratorDefinitionTestRunner());

        return vClassConstructorParameterDefinitionTestRunner;
    }

    getClassConstructorDefinitionTestRunner() {
        if (this.ClassConstructorDefinitionTestRunner != null) {
            return this.ClassConstructorDefinitionTestRunner;
        }

        const vClassConstructorDefinitionTestRunner = new ClassConstructorDefinitionTestRunner(this.assertions);
        this.ClassConstructorDefinitionTestRunner = vClassConstructorDefinitionTestRunner;

        vClassConstructorDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getClassConstructorParameterDefinitionTestRunner(), this.getCallSignatureDefinitionTestRunner());

        return vClassConstructorDefinitionTestRunner;
    }

    getClassMethodParameterDefinitionTestRunner() {
        if (this.ClassMethodParameterDefinitionTestRunner != null) {
            return this.ClassMethodParameterDefinitionTestRunner;
        }

        const vClassMethodParameterDefinitionTestRunner = new ClassMethodParameterDefinitionTestRunner(this.assertions);
        this.ClassMethodParameterDefinitionTestRunner = vClassMethodParameterDefinitionTestRunner;

        vClassMethodParameterDefinitionTestRunner.initialize(this.getBaseClassMethodParameterDefinitionTestRunner());

        return vClassMethodParameterDefinitionTestRunner;
    }

    getClassMethodDefinitionTestRunner() {
        if (this.ClassMethodDefinitionTestRunner != null) {
            return this.ClassMethodDefinitionTestRunner;
        }

        const vClassMethodDefinitionTestRunner = new ClassMethodDefinitionTestRunner(this.assertions);
        this.ClassMethodDefinitionTestRunner = vClassMethodDefinitionTestRunner;

        vClassMethodDefinitionTestRunner.initialize(this.getBaseClassMethodDefinitionTestRunner(this.getClassMethodParameterDefinitionTestRunner(), this.getClassMethodParameterStructureTestRunner()));

        return vClassMethodDefinitionTestRunner;
    }

    getClassPropertyDefinitionTestRunner() {
        if (this.ClassPropertyDefinitionTestRunner != null) {
            return this.ClassPropertyDefinitionTestRunner;
        }

        const vClassPropertyDefinitionTestRunner = new ClassPropertyDefinitionTestRunner(this.assertions);
        this.ClassPropertyDefinitionTestRunner = vClassPropertyDefinitionTestRunner;

        vClassPropertyDefinitionTestRunner.initialize(this.getBaseClassPropertyDefinitionTestRunner());

        return vClassPropertyDefinitionTestRunner;
    }

    getClassStaticMethodParameterDefinitionTestRunner() {
        if (this.ClassStaticMethodParameterDefinitionTestRunner != null) {
            return this.ClassStaticMethodParameterDefinitionTestRunner;
        }

        const vClassStaticMethodParameterDefinitionTestRunner = new ClassStaticMethodParameterDefinitionTestRunner(this.assertions);
        this.ClassStaticMethodParameterDefinitionTestRunner = vClassStaticMethodParameterDefinitionTestRunner;

        vClassStaticMethodParameterDefinitionTestRunner.initialize(this.getBaseClassMethodParameterDefinitionTestRunner());

        return vClassStaticMethodParameterDefinitionTestRunner;
    }

    getClassStaticMethodDefinitionTestRunner() {
        if (this.ClassStaticMethodDefinitionTestRunner != null) {
            return this.ClassStaticMethodDefinitionTestRunner;
        }

        const vClassStaticMethodDefinitionTestRunner = new ClassStaticMethodDefinitionTestRunner(this.assertions);
        this.ClassStaticMethodDefinitionTestRunner = vClassStaticMethodDefinitionTestRunner;

        vClassStaticMethodDefinitionTestRunner.initialize(this.getBaseClassMethodDefinitionTestRunner(this.getClassStaticMethodParameterDefinitionTestRunner(), this.getClassStaticMethodParameterStructureTestRunner()));

        return vClassStaticMethodDefinitionTestRunner;
    }

    getClassStaticPropertyDefinitionTestRunner() {
        if (this.ClassStaticPropertyDefinitionTestRunner != null) {
            return this.ClassStaticPropertyDefinitionTestRunner;
        }

        const vClassStaticPropertyDefinitionTestRunner = new ClassStaticPropertyDefinitionTestRunner(this.assertions);
        this.ClassStaticPropertyDefinitionTestRunner = vClassStaticPropertyDefinitionTestRunner;

        vClassStaticPropertyDefinitionTestRunner.initialize(this.getBaseClassPropertyDefinitionTestRunner());

        return vClassStaticPropertyDefinitionTestRunner;
    }

    getClassDefinitionTestRunner() {
        if (this.ClassDefinitionTestRunner != null) {
            return this.ClassDefinitionTestRunner;
        }

        const vClassDefinitionTestRunner = new ClassDefinitionTestRunner(this.assertions);
        this.ClassDefinitionTestRunner = vClassDefinitionTestRunner;

        vClassDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getClassMethodDefinitionTestRunner(), this.getClassPropertyDefinitionTestRunner(), this.getClassStaticMethodDefinitionTestRunner(), this.getClassStaticPropertyDefinitionTestRunner(), this.getClassConstructorDefinitionTestRunner(), this.getTypeDefinitionTestRunner(), this.getDecoratorDefinitionTestRunner(), this.getTypeParameterDefinitionTestRunner());

        return vClassDefinitionTestRunner;
    }

    getFunctionParameterDefinitionTestRunner() {
        if (this.FunctionParameterDefinitionTestRunner != null) {
            return this.FunctionParameterDefinitionTestRunner;
        }

        const vFunctionParameterDefinitionTestRunner = new FunctionParameterDefinitionTestRunner(this.assertions);
        this.FunctionParameterDefinitionTestRunner = vFunctionParameterDefinitionTestRunner;

        vFunctionParameterDefinitionTestRunner.initialize(this.getBaseParameterDefinitionTestRunner());

        return vFunctionParameterDefinitionTestRunner;
    }

    getFunctionDefinitionTestRunner() {
        if (this.FunctionDefinitionTestRunner != null) {
            return this.FunctionDefinitionTestRunner;
        }

        const vFunctionDefinitionTestRunner = new FunctionDefinitionTestRunner(this.assertions);
        this.FunctionDefinitionTestRunner = vFunctionDefinitionTestRunner;

        vFunctionDefinitionTestRunner.initialize(this.getBaseFunctionDefinitionTestRunner(this.getFunctionParameterDefinitionTestRunner(), this.getFunctionParameterStructureTestRunner()));

        return vFunctionDefinitionTestRunner;
    }

    getVariableDefinitionTestRunner() {
        if (this.VariableDefinitionTestRunner != null) {
            return this.VariableDefinitionTestRunner;
        }

        const vVariableDefinitionTestRunner = new VariableDefinitionTestRunner(this.assertions);
        this.VariableDefinitionTestRunner = vVariableDefinitionTestRunner;

        vVariableDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getExpressionDefinitionTestRunner(), this.getTypeDefinitionTestRunner());

        return vVariableDefinitionTestRunner;
    }

    getNamespaceDefinitionTestRunner() {
        if (this.NamespaceDefinitionTestRunner != null) {
            return this.NamespaceDefinitionTestRunner;
        }

        const vNamespaceDefinitionTestRunner = new NamespaceDefinitionTestRunner(this.assertions);
        this.NamespaceDefinitionTestRunner = vNamespaceDefinitionTestRunner;

        vNamespaceDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getClassDefinitionTestRunner(), this.getInterfaceDefinitionTestRunner(), this.getEnumDefinitionTestRunner(), this.getFunctionDefinitionTestRunner(), this.getVariableDefinitionTestRunner(), this.getTypeAliasDefinitionTestRunner());

        return vNamespaceDefinitionTestRunner;
    }

    getModuledDefinitionTestRunner() {
        if (this.ModuledDefinitionTestRunner != null) {
            return this.ModuledDefinitionTestRunner;
        }

        const vModuledDefinitionTestRunner = new ModuledDefinitionTestRunner(this.assertions);
        this.ModuledDefinitionTestRunner = vModuledDefinitionTestRunner;

        vModuledDefinitionTestRunner.initialize(this.getNamespaceDefinitionTestRunner(), this.getClassDefinitionTestRunner(), this.getInterfaceDefinitionTestRunner(), this.getEnumDefinitionTestRunner(), this.getFunctionDefinitionTestRunner(), this.getVariableDefinitionTestRunner(), this.getTypeAliasDefinitionTestRunner());

        return vModuledDefinitionTestRunner;
    }

    getStarImportPartDefinitionTestRunner() {
        if (this.StarImportPartDefinitionTestRunner != null) {
            return this.StarImportPartDefinitionTestRunner;
        }

        const vStarImportPartDefinitionTestRunner = new StarImportPartDefinitionTestRunner(this.assertions);
        this.StarImportPartDefinitionTestRunner = vStarImportPartDefinitionTestRunner;

        vStarImportPartDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getExpressionDefinitionTestRunner());

        return vStarImportPartDefinitionTestRunner;
    }

    getNamedImportPartDefinitionTestRunner() {
        if (this.NamedImportPartDefinitionTestRunner != null) {
            return this.NamedImportPartDefinitionTestRunner;
        }

        const vNamedImportPartDefinitionTestRunner = new NamedImportPartDefinitionTestRunner(this.assertions);
        this.NamedImportPartDefinitionTestRunner = vNamedImportPartDefinitionTestRunner;

        vNamedImportPartDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getExpressionDefinitionTestRunner());

        return vNamedImportPartDefinitionTestRunner;
    }

    getReExportDefinitionTestRunner() {
        if (this.ReExportDefinitionTestRunner != null) {
            return this.ReExportDefinitionTestRunner;
        }

        const vReExportDefinitionTestRunner = new ReExportDefinitionTestRunner(this.assertions);
        this.ReExportDefinitionTestRunner = vReExportDefinitionTestRunner;

        vReExportDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getStarImportPartDefinitionTestRunner(), this.getNamedImportPartDefinitionTestRunner());

        return vReExportDefinitionTestRunner;
    }

    getDefaultImportPartDefinitionTestRunner() {
        if (this.DefaultImportPartDefinitionTestRunner != null) {
            return this.DefaultImportPartDefinitionTestRunner;
        }

        const vDefaultImportPartDefinitionTestRunner = new DefaultImportPartDefinitionTestRunner(this.assertions);
        this.DefaultImportPartDefinitionTestRunner = vDefaultImportPartDefinitionTestRunner;

        vDefaultImportPartDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getExpressionDefinitionTestRunner());

        return vDefaultImportPartDefinitionTestRunner;
    }

    getImportDefinitionTestRunner() {
        if (this.ImportDefinitionTestRunner != null) {
            return this.ImportDefinitionTestRunner;
        }

        const vImportDefinitionTestRunner = new ImportDefinitionTestRunner(this.assertions);
        this.ImportDefinitionTestRunner = vImportDefinitionTestRunner;

        vImportDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getDefaultImportPartDefinitionTestRunner(), this.getNamedImportPartDefinitionTestRunner(), this.getStarImportPartDefinitionTestRunner());

        return vImportDefinitionTestRunner;
    }

    getFileDefinitionTestRunner() {
        if (this.FileDefinitionTestRunner != null) {
            return this.FileDefinitionTestRunner;
        }

        const vFileDefinitionTestRunner = new FileDefinitionTestRunner(this.assertions);
        this.FileDefinitionTestRunner = vFileDefinitionTestRunner;

        vFileDefinitionTestRunner.initialize(this.getBaseDefinitionTestRunner(), this.getImportDefinitionTestRunner(), this.getReExportDefinitionTestRunner(), this.getExpressionDefinitionTestRunner(), this.getNamespaceDefinitionTestRunner(), this.getClassDefinitionTestRunner(), this.getInterfaceDefinitionTestRunner(), this.getEnumDefinitionTestRunner(), this.getFunctionDefinitionTestRunner(), this.getVariableDefinitionTestRunner(), this.getTypeAliasDefinitionTestRunner());

        return vFileDefinitionTestRunner;
    }

    getGlobalDefinitionTestRunner() {
        if (this.GlobalDefinitionTestRunner != null) {
            return this.GlobalDefinitionTestRunner;
        }

        const vGlobalDefinitionTestRunner = new GlobalDefinitionTestRunner(this.assertions);
        this.GlobalDefinitionTestRunner = vGlobalDefinitionTestRunner;

        vGlobalDefinitionTestRunner.initialize(this.getFileDefinitionTestRunner());

        return vGlobalDefinitionTestRunner;
    }

    getInterfaceMethodParameterStructureTestRunner() {
        if (this.InterfaceMethodParameterStructureTestRunner != null) {
            return this.InterfaceMethodParameterStructureTestRunner;
        }

        const vInterfaceMethodParameterStructureTestRunner = new InterfaceMethodParameterStructureTestRunner(this.assertions);
        this.InterfaceMethodParameterStructureTestRunner = vInterfaceMethodParameterStructureTestRunner;

        vInterfaceMethodParameterStructureTestRunner.initialize(this.getBaseParameterStructureTestRunner());

        return vInterfaceMethodParameterStructureTestRunner;
    }

    getClassMethodParameterStructureTestRunner() {
        if (this.ClassMethodParameterStructureTestRunner != null) {
            return this.ClassMethodParameterStructureTestRunner;
        }

        const vClassMethodParameterStructureTestRunner = new ClassMethodParameterStructureTestRunner(this.assertions);
        this.ClassMethodParameterStructureTestRunner = vClassMethodParameterStructureTestRunner;

        vClassMethodParameterStructureTestRunner.initialize(this.getBaseClassMethodParameterStructureTestRunner());

        return vClassMethodParameterStructureTestRunner;
    }

    getClassStaticMethodParameterStructureTestRunner() {
        if (this.ClassStaticMethodParameterStructureTestRunner != null) {
            return this.ClassStaticMethodParameterStructureTestRunner;
        }

        const vClassStaticMethodParameterStructureTestRunner = new ClassStaticMethodParameterStructureTestRunner(this.assertions);
        this.ClassStaticMethodParameterStructureTestRunner = vClassStaticMethodParameterStructureTestRunner;

        vClassStaticMethodParameterStructureTestRunner.initialize(this.getBaseClassMethodParameterStructureTestRunner());

        return vClassStaticMethodParameterStructureTestRunner;
    }

    getFunctionParameterStructureTestRunner() {
        if (this.FunctionParameterStructureTestRunner != null) {
            return this.FunctionParameterStructureTestRunner;
        }

        const vFunctionParameterStructureTestRunner = new FunctionParameterStructureTestRunner(this.assertions);
        this.FunctionParameterStructureTestRunner = vFunctionParameterStructureTestRunner;

        vFunctionParameterStructureTestRunner.initialize(this.getBaseParameterStructureTestRunner());

        return vFunctionParameterStructureTestRunner;
    }

    getBaseParameterStructureTestRunner() {
        if (this.BaseParameterStructureTestRunner != null) {
            return this.BaseParameterStructureTestRunner;
        }

        const vBaseParameterStructureTestRunner = new BaseParameterStructureTestRunner(this.assertions);
        this.BaseParameterStructureTestRunner = vBaseParameterStructureTestRunner;

        vBaseParameterStructureTestRunner.initialize(this.getBaseStructureTestRunner(), this.getOptionallyNamedStructureTestRunner(), this.getOptionalStructureTestRunner(), this.getTypedStructureTestRunner(), this.getDefaultExpressionedStructureTestRunner(), this.getObjectPropertyStructureTestRunner());

        return vBaseParameterStructureTestRunner;
    }

    getBaseClassMethodParameterStructureTestRunner() {
        if (this.BaseClassMethodParameterStructureTestRunner != null) {
            return this.BaseClassMethodParameterStructureTestRunner;
        }

        const vBaseClassMethodParameterStructureTestRunner = new BaseClassMethodParameterStructureTestRunner(this.assertions);
        this.BaseClassMethodParameterStructureTestRunner = vBaseClassMethodParameterStructureTestRunner;

        vBaseClassMethodParameterStructureTestRunner.initialize(this.getBaseParameterStructureTestRunner(), this.getDecoratableStructureTestRunner());

        return vBaseClassMethodParameterStructureTestRunner;
    }

    getObjectPropertyStructureTestRunner() {
        if (this.ObjectPropertyStructureTestRunner != null) {
            return this.ObjectPropertyStructureTestRunner;
        }

        const vObjectPropertyStructureTestRunner = new ObjectPropertyStructureTestRunner(this.assertions);
        this.ObjectPropertyStructureTestRunner = vObjectPropertyStructureTestRunner;

        vObjectPropertyStructureTestRunner.initialize(this.getBaseObjectPropertyStructureTestRunner());

        return vObjectPropertyStructureTestRunner;
    }

    getBaseStructureTestRunner() {
        if (this.BaseStructureTestRunner != null) {
            return this.BaseStructureTestRunner;
        }

        const vBaseStructureTestRunner = new BaseStructureTestRunner(this.assertions);
        this.BaseStructureTestRunner = vBaseStructureTestRunner;

        vBaseStructureTestRunner.initialize();

        return vBaseStructureTestRunner;
    }

    getOptionallyNamedStructureTestRunner() {
        if (this.OptionallyNamedStructureTestRunner != null) {
            return this.OptionallyNamedStructureTestRunner;
        }

        const vOptionallyNamedStructureTestRunner = new OptionallyNamedStructureTestRunner(this.assertions);
        this.OptionallyNamedStructureTestRunner = vOptionallyNamedStructureTestRunner;

        vOptionallyNamedStructureTestRunner.initialize();

        return vOptionallyNamedStructureTestRunner;
    }

    getOptionalStructureTestRunner() {
        if (this.OptionalStructureTestRunner != null) {
            return this.OptionalStructureTestRunner;
        }

        const vOptionalStructureTestRunner = new OptionalStructureTestRunner(this.assertions);
        this.OptionalStructureTestRunner = vOptionalStructureTestRunner;

        vOptionalStructureTestRunner.initialize();

        return vOptionalStructureTestRunner;
    }

    getTypedStructureTestRunner() {
        if (this.TypedStructureTestRunner != null) {
            return this.TypedStructureTestRunner;
        }

        const vTypedStructureTestRunner = new TypedStructureTestRunner(this.assertions);
        this.TypedStructureTestRunner = vTypedStructureTestRunner;

        vTypedStructureTestRunner.initialize();

        return vTypedStructureTestRunner;
    }

    getDefaultExpressionedStructureTestRunner() {
        if (this.DefaultExpressionedStructureTestRunner != null) {
            return this.DefaultExpressionedStructureTestRunner;
        }

        const vDefaultExpressionedStructureTestRunner = new DefaultExpressionedStructureTestRunner(this.assertions);
        this.DefaultExpressionedStructureTestRunner = vDefaultExpressionedStructureTestRunner;

        vDefaultExpressionedStructureTestRunner.initialize();

        return vDefaultExpressionedStructureTestRunner;
    }

    getDecoratableStructureTestRunner() {
        if (this.DecoratableStructureTestRunner != null) {
            return this.DecoratableStructureTestRunner;
        }

        const vDecoratableStructureTestRunner = new DecoratableStructureTestRunner(this.assertions);
        this.DecoratableStructureTestRunner = vDecoratableStructureTestRunner;

        vDecoratableStructureTestRunner.initialize(this.getDecoratorStructureTestRunner());

        return vDecoratableStructureTestRunner;
    }

    getBaseObjectPropertyStructureTestRunner() {
        if (this.BaseObjectPropertyStructureTestRunner != null) {
            return this.BaseObjectPropertyStructureTestRunner;
        }

        const vBaseObjectPropertyStructureTestRunner = new BaseObjectPropertyStructureTestRunner(this.assertions);
        this.BaseObjectPropertyStructureTestRunner = vBaseObjectPropertyStructureTestRunner;

        vBaseObjectPropertyStructureTestRunner.initialize(this.getBasePropertyStructureTestRunner(), this.getDefaultExpressionedStructureTestRunner());

        return vBaseObjectPropertyStructureTestRunner;
    }

    getDecoratorStructureTestRunner() {
        if (this.DecoratorStructureTestRunner != null) {
            return this.DecoratorStructureTestRunner;
        }

        const vDecoratorStructureTestRunner = new DecoratorStructureTestRunner(this.assertions);
        this.DecoratorStructureTestRunner = vDecoratorStructureTestRunner;

        vDecoratorStructureTestRunner.initialize(this.getBaseStructureTestRunner(), this.getNamedStructureTestRunner());

        return vDecoratorStructureTestRunner;
    }

    getBasePropertyStructureTestRunner() {
        if (this.BasePropertyStructureTestRunner != null) {
            return this.BasePropertyStructureTestRunner;
        }

        const vBasePropertyStructureTestRunner = new BasePropertyStructureTestRunner(this.assertions);
        this.BasePropertyStructureTestRunner = vBasePropertyStructureTestRunner;

        vBasePropertyStructureTestRunner.initialize(this.getBaseStructureTestRunner(), this.getNamedStructureTestRunner(), this.getOptionalStructureTestRunner(), this.getTypedStructureTestRunner(), this.getReadonlyableStructureTestRunner());

        return vBasePropertyStructureTestRunner;
    }

    getNamedStructureTestRunner() {
        if (this.NamedStructureTestRunner != null) {
            return this.NamedStructureTestRunner;
        }

        const vNamedStructureTestRunner = new NamedStructureTestRunner(this.assertions);
        this.NamedStructureTestRunner = vNamedStructureTestRunner;

        vNamedStructureTestRunner.initialize();

        return vNamedStructureTestRunner;
    }

    getReadonlyableStructureTestRunner() {
        if (this.ReadonlyableStructureTestRunner != null) {
            return this.ReadonlyableStructureTestRunner;
        }

        const vReadonlyableStructureTestRunner = new ReadonlyableStructureTestRunner(this.assertions);
        this.ReadonlyableStructureTestRunner = vReadonlyableStructureTestRunner;

        vReadonlyableStructureTestRunner.initialize();

        return vReadonlyableStructureTestRunner;
    }
}

export class StateTestRunner {
    constructor(private readonly factory: TestRunnerFactory) {
    }

    runBaseDefinitionTest(actual: BaseDefinition, expected: BaseDefinitionTestStructure) {
        const testRunner = this.factory.getBaseDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runFunctionBodyWriteableDefinitionTest(actual: FunctionBodyWriteableDefinition, expected: FunctionBodyWriteableDefinitionTestStructure) {
        const testRunner = this.factory.getFunctionBodyWriteableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runNamedDefinitionTest(actual: NamedDefinition, expected: NamedDefinitionTestStructure) {
        const testRunner = this.factory.getNamedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runOptionallyNamedDefinitionTest(actual: OptionallyNamedDefinition, expected: OptionallyNamedDefinitionTestStructure) {
        const testRunner = this.factory.getOptionallyNamedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runOrderableDefinitionTest(actual: OrderableDefinition, expected: OrderableDefinitionTestStructure) {
        const testRunner = this.factory.getOrderableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runOptionalDefinitionTest(actual: OptionalDefinition, expected: OptionalDefinitionTestStructure) {
        const testRunner = this.factory.getOptionalDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runAbstractableDefinitionTest(actual: AbstractableDefinition, expected: AbstractableDefinitionTestStructure) {
        const testRunner = this.factory.getAbstractableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runAmbientableDefinitionTest(actual: AmbientableDefinition, expected: AmbientableDefinitionTestStructure) {
        const testRunner = this.factory.getAmbientableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runAsyncableDefinitionTest(actual: AsyncableDefinition, expected: AsyncableDefinitionTestStructure) {
        const testRunner = this.factory.getAsyncableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDocumentationedDefinitionTest(actual: DocumentationedDefinition, expected: DocumentationedDefinitionTestStructure) {
        const testRunner = this.factory.getDocumentationedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseExpressionDefinitionTest(actual: BaseExpressionDefinition, expected: BaseExpressionDefinitionTestStructure) {
        const testRunner = this.factory.getBaseExpressionDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runCallSignatureParameterDefinitionTest(actual: CallSignatureParameterDefinition, expected: CallSignatureParameterDefinitionTestStructure) {
        const testRunner = this.factory.getCallSignatureParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runCallSignatureDefinitionTest(actual: CallSignatureDefinition, expected: CallSignatureDefinitionTestStructure) {
        const testRunner = this.factory.getCallSignatureDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runIndexSignatureDefinitionTest(actual: IndexSignatureDefinition, expected: IndexSignatureDefinitionTestStructure) {
        const testRunner = this.factory.getIndexSignatureDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypeParameterDefinitionTest(actual: TypeParameterDefinition, expected: TypeParameterDefinitionTestStructure) {
        const testRunner = this.factory.getTypeParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runReadonlyableDefinitionTest(actual: ReadonlyableDefinition, expected: ReadonlyableDefinitionTestStructure) {
        const testRunner = this.factory.getReadonlyableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypedDefinitionTest(actual: TypedDefinition, expected: TypedDefinitionTestStructure) {
        const testRunner = this.factory.getTypedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBasePropertyDefinitionTest(actual: BasePropertyDefinition, expected: BasePropertyDefinitionTestStructure) {
        const testRunner = this.factory.getBasePropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypePropertyDefinitionTest(actual: TypePropertyDefinition, expected: TypePropertyDefinitionTestStructure) {
        const testRunner = this.factory.getTypePropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypeParameteredDefinitionTest(actual: TypeParameteredDefinition, expected: TypeParameteredDefinitionTestStructure) {
        const testRunner = this.factory.getTypeParameteredDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runExportableDefinitionTest(actual: ExportableDefinition, expected: ExportableDefinitionTestStructure) {
        const testRunner = this.factory.getExportableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypeAliasDefinitionTest(actual: TypeAliasDefinition, expected: TypeAliasDefinitionTestStructure) {
        const testRunner = this.factory.getTypeAliasDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDecoratorDefinitionTest(actual: DecoratorDefinition, expected: DecoratorDefinitionTestStructure) {
        const testRunner = this.factory.getDecoratorDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runObjectPropertyDefinitionTest(actual: ObjectPropertyDefinition, expected: ObjectPropertyDefinitionTestStructure) {
        const testRunner = this.factory.getObjectPropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypeFunctionParameterDefinitionTest(actual: TypeFunctionParameterDefinition, expected: TypeFunctionParameterDefinitionTestStructure) {
        const testRunner = this.factory.getTypeFunctionParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypeNodeDefinitionTest(actual: TypeNodeDefinition, expected: TypeNodeDefinitionTestStructure) {
        const testRunner = this.factory.getTypeNodeDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypeDefinitionTest(actual: TypeDefinition, expected: TypeDefinitionTestStructure) {
        const testRunner = this.factory.getTypeDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runUserDefinedTypeGuardDefinitionTest(actual: UserDefinedTypeGuardDefinition, expected: UserDefinedTypeGuardDefinitionTestStructure) {
        const testRunner = this.factory.getUserDefinedTypeGuardDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseTypeDefinitionTest(actual: BaseTypeDefinition, expected: BaseTypeDefinitionTestStructure) {
        const testRunner = this.factory.getBaseTypeDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runExpressionDefinitionTest(actual: ExpressionDefinition, expected: ExpressionDefinitionTestStructure) {
        const testRunner = this.factory.getExpressionDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runThisTypedDefinitionTest(actual: ThisTypedDefinition, expected: ThisTypedDefinitionTestStructure) {
        const testRunner = this.factory.getThisTypedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDefaultExpressionedDefinitionTest(actual: DefaultExpressionedDefinition, expected: DefaultExpressionedDefinitionTestStructure) {
        const testRunner = this.factory.getDefaultExpressionedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDecoratableDefinitionTest(actual: DecoratableDefinition, expected: DecoratableDefinitionTestStructure) {
        const testRunner = this.factory.getDecoratableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseObjectPropertyDefinitionTest(actual: BaseObjectPropertyDefinition, expected: BaseObjectPropertyDefinitionTestStructure) {
        const testRunner = this.factory.getBaseObjectPropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseParameterDefinitionTest(actual: BaseParameterDefinition, expected: BaseParameterDefinitionTestStructure) {
        const testRunner = this.factory.getBaseParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runParameteredDefinitionTest<ParameterType extends BaseParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseParameterDefinitionTestStructure, ParameterStructureTypeExpected>(actual: ParameteredDefinition<ParameterType, ParameterStructureType>, expected: ParameteredDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>, ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        const testRunner = this.factory.getParameteredDefinitionTestRunner(ParameterTypeTestRunner, ParameterStructureTypeTestRunner);
        testRunner.runTest(actual, expected);
    }

    runReturnTypedDefinitionTest(actual: ReturnTypedDefinition, expected: ReturnTypedDefinitionTestStructure) {
        const testRunner = this.factory.getReturnTypedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runOverloadSignaturedDefinitionTest(actual: OverloadSignaturedDefinition, expected: OverloadSignaturedDefinitionTestStructure) {
        const testRunner = this.factory.getOverloadSignaturedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseFunctionDefinitionTest<ParameterType extends BaseParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseParameterDefinitionTestStructure, ParameterStructureTypeExpected>(actual: BaseFunctionDefinition<ParameterType, ParameterStructureType>, expected: BaseFunctionDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>, ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        const testRunner = this.factory.getBaseFunctionDefinitionTestRunner(ParameterTypeTestRunner, ParameterStructureTypeTestRunner);
        testRunner.runTest(actual, expected);
    }

    runEnumMemberDefinitionTest(actual: EnumMemberDefinition, expected: EnumMemberDefinitionTestStructure) {
        const testRunner = this.factory.getEnumMemberDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runEnumDefinitionTest(actual: EnumDefinition, expected: EnumDefinitionTestStructure) {
        const testRunner = this.factory.getEnumDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runScopedDefinitionTest(actual: ScopedDefinition, expected: ScopedDefinitionTestStructure) {
        const testRunner = this.factory.getScopedDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseClassMethodParameterDefinitionTest(actual: BaseClassMethodParameterDefinition, expected: BaseClassMethodParameterDefinitionTestStructure) {
        const testRunner = this.factory.getBaseClassMethodParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseClassMethodDefinitionTest<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseClassMethodParameterDefinitionTestStructure, ParameterStructureTypeExpected>(actual: BaseClassMethodDefinition<ParameterType, ParameterStructureType>, expected: BaseClassMethodDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>, ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        const testRunner = this.factory.getBaseClassMethodDefinitionTestRunner(ParameterTypeTestRunner, ParameterStructureTypeTestRunner);
        testRunner.runTest(actual, expected);
    }

    runBaseClassPropertyDefinitionTest(actual: BaseClassPropertyDefinition, expected: BaseClassPropertyDefinitionTestStructure) {
        const testRunner = this.factory.getBaseClassPropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runInterfaceMethodParameterDefinitionTest(actual: InterfaceMethodParameterDefinition, expected: InterfaceMethodParameterDefinitionTestStructure) {
        const testRunner = this.factory.getInterfaceMethodParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runInterfaceMethodDefinitionTest(actual: InterfaceMethodDefinition, expected: InterfaceMethodDefinitionTestStructure) {
        const testRunner = this.factory.getInterfaceMethodDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runInterfacePropertyDefinitionTest(actual: InterfacePropertyDefinition, expected: InterfacePropertyDefinitionTestStructure) {
        const testRunner = this.factory.getInterfacePropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runInterfaceDefinitionTest(actual: InterfaceDefinition, expected: InterfaceDefinitionTestStructure) {
        const testRunner = this.factory.getInterfaceDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassConstructorParameterDefinitionTest(actual: ClassConstructorParameterDefinition, expected: ClassConstructorParameterDefinitionTestStructure) {
        const testRunner = this.factory.getClassConstructorParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassConstructorDefinitionTest(actual: ClassConstructorDefinition, expected: ClassConstructorDefinitionTestStructure) {
        const testRunner = this.factory.getClassConstructorDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassMethodParameterDefinitionTest(actual: ClassMethodParameterDefinition, expected: ClassMethodParameterDefinitionTestStructure) {
        const testRunner = this.factory.getClassMethodParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassMethodDefinitionTest(actual: ClassMethodDefinition, expected: ClassMethodDefinitionTestStructure) {
        const testRunner = this.factory.getClassMethodDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassPropertyDefinitionTest(actual: ClassPropertyDefinition, expected: ClassPropertyDefinitionTestStructure) {
        const testRunner = this.factory.getClassPropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassStaticMethodParameterDefinitionTest(actual: ClassStaticMethodParameterDefinition, expected: ClassStaticMethodParameterDefinitionTestStructure) {
        const testRunner = this.factory.getClassStaticMethodParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassStaticMethodDefinitionTest(actual: ClassStaticMethodDefinition, expected: ClassStaticMethodDefinitionTestStructure) {
        const testRunner = this.factory.getClassStaticMethodDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassStaticPropertyDefinitionTest(actual: ClassStaticPropertyDefinition, expected: ClassStaticPropertyDefinitionTestStructure) {
        const testRunner = this.factory.getClassStaticPropertyDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassDefinitionTest(actual: ClassDefinition, expected: ClassDefinitionTestStructure) {
        const testRunner = this.factory.getClassDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runFunctionParameterDefinitionTest(actual: FunctionParameterDefinition, expected: FunctionParameterDefinitionTestStructure) {
        const testRunner = this.factory.getFunctionParameterDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runFunctionDefinitionTest(actual: FunctionDefinition, expected: FunctionDefinitionTestStructure) {
        const testRunner = this.factory.getFunctionDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runVariableDefinitionTest(actual: VariableDefinition, expected: VariableDefinitionTestStructure) {
        const testRunner = this.factory.getVariableDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runNamespaceDefinitionTest(actual: NamespaceDefinition, expected: NamespaceDefinitionTestStructure) {
        const testRunner = this.factory.getNamespaceDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runModuledDefinitionTest(actual: ModuledDefinition, expected: ModuledDefinitionTestStructure) {
        const testRunner = this.factory.getModuledDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runStarImportPartDefinitionTest(actual: StarImportPartDefinition, expected: StarImportPartDefinitionTestStructure) {
        const testRunner = this.factory.getStarImportPartDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runNamedImportPartDefinitionTest(actual: NamedImportPartDefinition, expected: NamedImportPartDefinitionTestStructure) {
        const testRunner = this.factory.getNamedImportPartDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runReExportDefinitionTest(actual: ReExportDefinition, expected: ReExportDefinitionTestStructure) {
        const testRunner = this.factory.getReExportDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDefaultImportPartDefinitionTest(actual: DefaultImportPartDefinition, expected: DefaultImportPartDefinitionTestStructure) {
        const testRunner = this.factory.getDefaultImportPartDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runImportDefinitionTest(actual: ImportDefinition, expected: ImportDefinitionTestStructure) {
        const testRunner = this.factory.getImportDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runFileDefinitionTest(actual: FileDefinition, expected: FileDefinitionTestStructure) {
        const testRunner = this.factory.getFileDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runGlobalDefinitionTest(actual: GlobalDefinition, expected: GlobalDefinitionTestStructure) {
        const testRunner = this.factory.getGlobalDefinitionTestRunner();
        testRunner.runTest(actual, expected);
    }

    runInterfaceMethodParameterStructureTest(actual: InterfaceMethodParameterStructure, expected: InterfaceMethodParameterStructureTestStructure) {
        const testRunner = this.factory.getInterfaceMethodParameterStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassMethodParameterStructureTest(actual: ClassMethodParameterStructure, expected: ClassMethodParameterStructureTestStructure) {
        const testRunner = this.factory.getClassMethodParameterStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runClassStaticMethodParameterStructureTest(actual: ClassStaticMethodParameterStructure, expected: ClassStaticMethodParameterStructureTestStructure) {
        const testRunner = this.factory.getClassStaticMethodParameterStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runFunctionParameterStructureTest(actual: FunctionParameterStructure, expected: FunctionParameterStructureTestStructure) {
        const testRunner = this.factory.getFunctionParameterStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseParameterStructureTest(actual: BaseParameterStructure, expected: BaseParameterStructureTestStructure) {
        const testRunner = this.factory.getBaseParameterStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseClassMethodParameterStructureTest(actual: BaseClassMethodParameterStructure, expected: BaseClassMethodParameterStructureTestStructure) {
        const testRunner = this.factory.getBaseClassMethodParameterStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runObjectPropertyStructureTest(actual: ObjectPropertyStructure, expected: ObjectPropertyStructureTestStructure) {
        const testRunner = this.factory.getObjectPropertyStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseStructureTest(actual: BaseStructure, expected: BaseStructureTestStructure) {
        const testRunner = this.factory.getBaseStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runOptionallyNamedStructureTest(actual: OptionallyNamedStructure, expected: OptionallyNamedStructureTestStructure) {
        const testRunner = this.factory.getOptionallyNamedStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runOptionalStructureTest(actual: OptionalStructure, expected: OptionalStructureTestStructure) {
        const testRunner = this.factory.getOptionalStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runTypedStructureTest(actual: TypedStructure, expected: TypedStructureTestStructure) {
        const testRunner = this.factory.getTypedStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDefaultExpressionedStructureTest(actual: DefaultExpressionedStructure, expected: DefaultExpressionedStructureTestStructure) {
        const testRunner = this.factory.getDefaultExpressionedStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDecoratableStructureTest(actual: DecoratableStructure, expected: DecoratableStructureTestStructure) {
        const testRunner = this.factory.getDecoratableStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBaseObjectPropertyStructureTest(actual: BaseObjectPropertyStructure, expected: BaseObjectPropertyStructureTestStructure) {
        const testRunner = this.factory.getBaseObjectPropertyStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runDecoratorStructureTest(actual: DecoratorStructure, expected: DecoratorStructureTestStructure) {
        const testRunner = this.factory.getDecoratorStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runBasePropertyStructureTest(actual: BasePropertyStructure, expected: BasePropertyStructureTestStructure) {
        const testRunner = this.factory.getBasePropertyStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runNamedStructureTest(actual: NamedStructure, expected: NamedStructureTestStructure) {
        const testRunner = this.factory.getNamedStructureTestRunner();
        testRunner.runTest(actual, expected);
    }

    runReadonlyableStructureTest(actual: ReadonlyableStructure, expected: ReadonlyableStructureTestStructure) {
        const testRunner = this.factory.getReadonlyableStructureTestRunner();
        testRunner.runTest(actual, expected);
    }
}

export interface BaseDefinitionTestStructure {
    hasOnBeforeWrite?: boolean;
    hasOnAfterWrite?: boolean;
}

export class BaseDefinitionTestRunner implements TestRunner<BaseDefinition, BaseDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: BaseDefinition, expected: BaseDefinitionTestStructure) {
        this.assertions.describe("BaseDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("hasOnBeforeWrite", () => {
                let actualValue = typeof actual.onBeforeWrite === "function";
                let expectedValue = expected.hasOnBeforeWrite || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasOnAfterWrite", () => {
                let actualValue = typeof actual.onAfterWrite === "function";
                let expectedValue = expected.hasOnAfterWrite || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface FunctionBodyWriteableDefinitionTestStructure {
}

export class FunctionBodyWriteableDefinitionTestRunner implements TestRunner<FunctionBodyWriteableDefinition, FunctionBodyWriteableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: FunctionBodyWriteableDefinition, expected: FunctionBodyWriteableDefinitionTestStructure) {
        this.assertions.describe("FunctionBodyWriteableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
        });
    }
}

export interface NamedDefinitionTestStructure {
    name: string;
}

export class NamedDefinitionTestRunner implements TestRunner<NamedDefinition, NamedDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: NamedDefinition, expected: NamedDefinitionTestStructure) {
        this.assertions.describe("NamedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface OptionallyNamedDefinitionTestStructure {
    name: (null | string);
}

export class OptionallyNamedDefinitionTestRunner implements TestRunner<OptionallyNamedDefinition, OptionallyNamedDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: OptionallyNamedDefinition, expected: OptionallyNamedDefinitionTestStructure) {
        this.assertions.describe("OptionallyNamedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as string, expectedValue as string);
                    });
                });
            });
        });
    }
}

export interface OrderableDefinitionTestStructure {
    order?: number;
}

export class OrderableDefinitionTestRunner implements TestRunner<OrderableDefinition, OrderableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: OrderableDefinition, expected: OrderableDefinitionTestStructure) {
        this.assertions.describe("OrderableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
        });
    }
}

export interface OptionalDefinitionTestStructure {
    isOptional?: boolean;
}

export class OptionalDefinitionTestRunner implements TestRunner<OptionalDefinition, OptionalDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: OptionalDefinition, expected: OptionalDefinitionTestStructure) {
        this.assertions.describe("OptionalDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isOptional", () => {
                let actualValue = actual.isOptional;
                let expectedValue = expected.isOptional;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface AbstractableDefinitionTestStructure {
    isAbstract?: boolean;
}

export class AbstractableDefinitionTestRunner implements TestRunner<AbstractableDefinition, AbstractableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: AbstractableDefinition, expected: AbstractableDefinitionTestStructure) {
        this.assertions.describe("AbstractableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isAbstract", () => {
                let actualValue = actual.isAbstract;
                let expectedValue = expected.isAbstract;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface AmbientableDefinitionTestStructure {
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
}

export class AmbientableDefinitionTestRunner implements TestRunner<AmbientableDefinition, AmbientableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: AmbientableDefinition, expected: AmbientableDefinitionTestStructure) {
        this.assertions.describe("AmbientableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface AsyncableDefinitionTestStructure {
    isAsync?: boolean;
}

export class AsyncableDefinitionTestRunner implements TestRunner<AsyncableDefinition, AsyncableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: AsyncableDefinition, expected: AsyncableDefinitionTestStructure) {
        this.assertions.describe("AsyncableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isAsync", () => {
                let actualValue = actual.isAsync;
                let expectedValue = expected.isAsync;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface DocumentationedDefinitionTestStructure {
    documentationComment?: string;
}

export class DocumentationedDefinitionTestRunner implements TestRunner<DocumentationedDefinition, DocumentationedDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: DocumentationedDefinition, expected: DocumentationedDefinitionTestStructure) {
        this.assertions.describe("DocumentationedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface BaseExpressionDefinitionTestStructure extends BaseDefinitionTestStructure {
    text: string;
}

export class BaseExpressionDefinitionTestRunner implements TestRunner<BaseExpressionDefinition, BaseExpressionDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
    }

    runTest(actual: BaseExpressionDefinition, expected: BaseExpressionDefinitionTestStructure) {
        this.assertions.describe("BaseExpressionDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("text", () => {
                let actualValue = actual.text;
                let expectedValue = expected.text;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface CallSignatureParameterDefinitionTestStructure extends BaseParameterDefinitionTestStructure {
}

export class CallSignatureParameterDefinitionTestRunner implements TestRunner<CallSignatureParameterDefinition, CallSignatureParameterDefinitionTestStructure> {
    private BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>) {
        this.BaseParameterDefinitionTestRunner = BaseParameterDefinitionTestRunner;
    }

    runTest(actual: CallSignatureParameterDefinition, expected: CallSignatureParameterDefinitionTestStructure) {
        this.assertions.describe("CallSignatureParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface CallSignatureDefinitionTestStructure extends BaseDefinitionTestStructure {
    parameters?: CallSignatureParameterDefinitionTestStructure[];
    returnType?: TypeDefinitionTestStructure;
    typeParameters?: TypeParameterDefinitionTestStructure[];
    documentationComment?: string;
    minArgumentCount?: number;
}

export class CallSignatureDefinitionTestRunner implements TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private CallSignatureParameterDefinitionTestRunner: TestRunner<CallSignatureParameterDefinition, CallSignatureParameterDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, CallSignatureParameterDefinitionTestRunner: TestRunner<CallSignatureParameterDefinition, CallSignatureParameterDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.CallSignatureParameterDefinitionTestRunner = CallSignatureParameterDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
    }

    runTest(actual: CallSignatureDefinition, expected: CallSignatureDefinitionTestStructure) {
        this.assertions.describe("CallSignatureDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("parameters", () => {
                let actualValue = actual.parameters;
                let expectedValue = expected.parameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.CallSignatureParameterDefinitionTestRunner.runTest(actualValue as any as CallSignatureParameterDefinition, expectedValue as any as CallSignatureParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("returnType", () => {
                let actualValue = actual.returnType;
                let expectedValue = expected.returnType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "void" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("#getMinArgumentCount()", () => {
                let actualValue = actual.getMinArgumentCount();
                let expectedValue = expected.minArgumentCount || 0;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface IndexSignatureDefinitionTestStructure extends BaseDefinitionTestStructure {
    keyName: string;
    keyType?: TypeDefinitionTestStructure;
    returnType?: TypeDefinitionTestStructure;
    isReadonly?: boolean;
}

export class IndexSignatureDefinitionTestRunner implements TestRunner<IndexSignatureDefinition, IndexSignatureDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: IndexSignatureDefinition, expected: IndexSignatureDefinitionTestStructure) {
        this.assertions.describe("IndexSignatureDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("keyName", () => {
                let actualValue = actual.keyName;
                let expectedValue = expected.keyName;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("keyType", () => {
                let actualValue = actual.keyType;
                let expectedValue = expected.keyType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "string" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("returnType", () => {
                let actualValue = actual.returnType;
                let expectedValue = expected.returnType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "void" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("isReadonly", () => {
                let actualValue = actual.isReadonly;
                let expectedValue = expected.isReadonly;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface TypeParameterDefinitionTestStructure extends BaseDefinitionTestStructure {
    constraintType?: (null | TypeDefinitionTestStructure);
    name: string;
}

export class TypeParameterDefinitionTestRunner implements TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: TypeParameterDefinition, expected: TypeParameterDefinitionTestStructure) {
        this.assertions.describe("TypeParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("constraintType", () => {
                let actualValue = actual.constraintType;
                let expectedValue = expected.constraintType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        })(actualValue as TypeDefinition, expectedValue as TypeDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ReadonlyableDefinitionTestStructure {
    isReadonly?: boolean;
}

export class ReadonlyableDefinitionTestRunner implements TestRunner<ReadonlyableDefinition, ReadonlyableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: ReadonlyableDefinition, expected: ReadonlyableDefinitionTestStructure) {
        this.assertions.describe("ReadonlyableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isReadonly", () => {
                let actualValue = actual.isReadonly;
                let expectedValue = expected.isReadonly;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface TypedDefinitionTestStructure {
    type?: TypeDefinitionTestStructure;
}

export class TypedDefinitionTestRunner implements TestRunner<TypedDefinition, TypedDefinitionTestStructure> {
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: TypedDefinition, expected: TypedDefinitionTestStructure) {
        this.assertions.describe("TypedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("type", () => {
                let actualValue = actual.type;
                let expectedValue = expected.type;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "any" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
        });
    }
}

export interface BasePropertyDefinitionTestStructure extends BaseDefinitionTestStructure {
    name: string;
    isOptional?: boolean;
    type?: TypeDefinitionTestStructure;
    isReadonly?: boolean;
}

export class BasePropertyDefinitionTestRunner implements TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: BasePropertyDefinition, expected: BasePropertyDefinitionTestStructure) {
        this.assertions.describe("BasePropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isOptional", () => {
                let actualValue = actual.isOptional;
                let expectedValue = expected.isOptional;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("type", () => {
                let actualValue = actual.type;
                let expectedValue = expected.type;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "any" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("isReadonly", () => {
                let actualValue = actual.isReadonly;
                let expectedValue = expected.isReadonly;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface TypePropertyDefinitionTestStructure extends BasePropertyDefinitionTestStructure {
}

export class TypePropertyDefinitionTestRunner implements TestRunner<TypePropertyDefinition, TypePropertyDefinitionTestStructure> {
    private BasePropertyDefinitionTestRunner: TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BasePropertyDefinitionTestRunner: TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure>) {
        this.BasePropertyDefinitionTestRunner = BasePropertyDefinitionTestRunner;
    }

    runTest(actual: TypePropertyDefinition, expected: TypePropertyDefinitionTestStructure) {
        this.assertions.describe("TypePropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BasePropertyDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface TypeParameteredDefinitionTestStructure {
    typeParameters?: TypeParameterDefinitionTestStructure[];
}

export class TypeParameteredDefinitionTestRunner implements TestRunner<TypeParameteredDefinition, TypeParameteredDefinitionTestStructure> {
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>) {
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
    }

    runTest(actual: TypeParameteredDefinition, expected: TypeParameteredDefinitionTestStructure) {
        this.assertions.describe("TypeParameteredDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface ExportableDefinitionTestStructure {
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
}

export class ExportableDefinitionTestRunner implements TestRunner<ExportableDefinition, ExportableDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: ExportableDefinition, expected: ExportableDefinitionTestStructure) {
        this.assertions.describe("ExportableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface TypeAliasDefinitionTestStructure extends BaseDefinitionTestStructure {
    name: string;
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    order?: number;
    type?: TypeDefinitionTestStructure;
    typeParameters?: TypeParameterDefinitionTestStructure[];
    documentationComment?: string;
}

export class TypeAliasDefinitionTestRunner implements TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
    }

    runTest(actual: TypeAliasDefinition, expected: TypeAliasDefinitionTestStructure) {
        this.assertions.describe("TypeAliasDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = true;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("type", () => {
                let actualValue = actual.type;
                let expectedValue = expected.type;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "string" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface DecoratorDefinitionTestStructure extends BaseDefinitionTestStructure {
    arguments?: ExpressionDefinitionTestStructure[];
    isDecoratorFactory?: boolean;
    name: string;
}

export class DecoratorDefinitionTestRunner implements TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: DecoratorDefinition, expected: DecoratorDefinitionTestStructure) {
        this.assertions.describe("DecoratorDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("arguments", () => {
                let actualValue = actual.arguments;
                let expectedValue = expected.arguments;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("isDecoratorFactory", () => {
                let actualValue = actual.isDecoratorFactory;
                let expectedValue = expected.isDecoratorFactory;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ObjectPropertyDefinitionTestStructure extends BaseObjectPropertyDefinitionTestStructure {
}

export class ObjectPropertyDefinitionTestRunner implements TestRunner<ObjectPropertyDefinition, ObjectPropertyDefinitionTestStructure> {
    private BaseObjectPropertyDefinitionTestRunner: TestRunner<BaseObjectPropertyDefinition, BaseObjectPropertyDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseObjectPropertyDefinitionTestRunner: TestRunner<BaseObjectPropertyDefinition, BaseObjectPropertyDefinitionTestStructure>) {
        this.BaseObjectPropertyDefinitionTestRunner = BaseObjectPropertyDefinitionTestRunner;
    }

    runTest(actual: ObjectPropertyDefinition, expected: ObjectPropertyDefinitionTestStructure) {
        this.assertions.describe("ObjectPropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseObjectPropertyDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface TypeFunctionParameterDefinitionTestStructure extends BaseParameterDefinitionTestStructure {
}

export class TypeFunctionParameterDefinitionTestRunner implements TestRunner<TypeFunctionParameterDefinition, TypeFunctionParameterDefinitionTestStructure> {
    private BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>) {
        this.BaseParameterDefinitionTestRunner = BaseParameterDefinitionTestRunner;
    }

    runTest(actual: TypeFunctionParameterDefinition, expected: TypeFunctionParameterDefinitionTestStructure) {
        this.assertions.describe("TypeFunctionParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface TypeNodeDefinitionTestStructure extends BaseTypeDefinitionTestStructure {
    typeParameters?: TypeParameterDefinitionTestStructure[];
    parameters?: TypeFunctionParameterDefinitionTestStructure[];
}

export class TypeNodeDefinitionTestRunner implements TestRunner<TypeNodeDefinition, TypeNodeDefinitionTestStructure> {
    private BaseTypeDefinitionTestRunner: TestRunner<BaseTypeDefinition, BaseTypeDefinitionTestStructure>;
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;
    private TypeFunctionParameterDefinitionTestRunner: TestRunner<TypeFunctionParameterDefinition, TypeFunctionParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseTypeDefinitionTestRunner: TestRunner<BaseTypeDefinition, BaseTypeDefinitionTestStructure>, TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>, TypeFunctionParameterDefinitionTestRunner: TestRunner<TypeFunctionParameterDefinition, TypeFunctionParameterDefinitionTestStructure>) {
        this.BaseTypeDefinitionTestRunner = BaseTypeDefinitionTestRunner;
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
        this.TypeFunctionParameterDefinitionTestRunner = TypeFunctionParameterDefinitionTestRunner;
    }

    runTest(actual: TypeNodeDefinition, expected: TypeNodeDefinitionTestStructure) {
        this.assertions.describe("TypeNodeDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseTypeDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("parameters", () => {
                let actualValue = actual.parameters;
                let expectedValue = expected.parameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeFunctionParameterDefinitionTestRunner.runTest(actualValue as any as TypeFunctionParameterDefinition, expectedValue as any as TypeFunctionParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface TypeDefinitionTestStructure extends BaseTypeDefinitionTestStructure {
    callSignatures?: CallSignatureDefinitionTestStructure[];
    node?: (null | TypeNodeDefinitionTestStructure);
}

export class TypeDefinitionTestRunner implements TestRunner<TypeDefinition, TypeDefinitionTestStructure> {
    private BaseTypeDefinitionTestRunner: TestRunner<BaseTypeDefinition, BaseTypeDefinitionTestStructure>;
    private CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>;
    private TypeNodeDefinitionTestRunner: TestRunner<TypeNodeDefinition, TypeNodeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseTypeDefinitionTestRunner: TestRunner<BaseTypeDefinition, BaseTypeDefinitionTestStructure>, CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>, TypeNodeDefinitionTestRunner: TestRunner<TypeNodeDefinition, TypeNodeDefinitionTestStructure>) {
        this.BaseTypeDefinitionTestRunner = BaseTypeDefinitionTestRunner;
        this.CallSignatureDefinitionTestRunner = CallSignatureDefinitionTestRunner;
        this.TypeNodeDefinitionTestRunner = TypeNodeDefinitionTestRunner;
    }

    runTest(actual: TypeDefinition, expected: TypeDefinitionTestStructure) {
        this.assertions.describe("TypeDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseTypeDefinitionTestRunner.runTest(actual, expected);
            if (typeof expected.callSignatures !== "undefined") {
                this.assertions.describe("callSignatures", () => {
                    let actualValue = actual.callSignatures;
                    let expectedValue = expected.callSignatures;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = [];
                    }
                    this.assertions.it("should have the same length", () => {
                        this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                    });
                    for (let i = 0; i < (expectedValue || []).length; i++) {
                        ((actualValue, expectedValue, i) => {
                            this.assertions.describe(`index ${i}`, () => {
                                this.CallSignatureDefinitionTestRunner.runTest(actualValue as any as CallSignatureDefinition, expectedValue as any as CallSignatureDefinitionTestStructure);
                            });
                        })(actualValue[i], expectedValue![i], i);
                    }
                });
            }
            if (typeof expected.node !== "undefined") {
                this.assertions.describe("node", () => {
                    let actualValue = actual.node;
                    let expectedValue = expected.node;
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as null, expectedValue as null);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.TypeNodeDefinitionTestRunner.runTest(actualValue as any as TypeNodeDefinition, expectedValue as any as TypeNodeDefinitionTestStructure);
                            })(actualValue as TypeNodeDefinition, expectedValue as TypeNodeDefinitionTestStructure);
                        });
                    });
                });
            }
        });
    }
}

export interface UserDefinedTypeGuardDefinitionTestStructure extends BaseDefinitionTestStructure {
    parameterName?: (null | string);
    type?: TypeDefinitionTestStructure;
}

export class UserDefinedTypeGuardDefinitionTestRunner implements TestRunner<UserDefinedTypeGuardDefinition, UserDefinedTypeGuardDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: UserDefinedTypeGuardDefinition, expected: UserDefinedTypeGuardDefinitionTestStructure) {
        this.assertions.describe("UserDefinedTypeGuardDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("parameterName", () => {
                let actualValue = actual.parameterName;
                let expectedValue = expected.parameterName;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as string, expectedValue as string);
                    });
                });
            });
            this.assertions.describe("type", () => {
                let actualValue = actual.type;
                let expectedValue = expected.type;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "any" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
        });
    }
}

export interface BaseTypeDefinitionTestStructure extends BaseExpressionDefinitionTestStructure {
    arrayElementType?: (null | TypeDefinitionTestStructure);
    intersectionTypes?: TypeDefinitionTestStructure[];
    unionTypes?: TypeDefinitionTestStructure[];
    properties?: TypePropertyDefinitionTestStructure[];
    typeArguments?: TypeDefinitionTestStructure[];
    text: string;
    isArrayType?: boolean;
    definitions?: { name: string; type?: any; }[];
    allDefinitions?: { name: string; }[];
}

export class BaseTypeDefinitionTestRunner implements TestRunner<BaseTypeDefinition, BaseTypeDefinitionTestStructure> {
    private BaseExpressionDefinitionTestRunner: TestRunner<BaseExpressionDefinition, BaseExpressionDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private TypePropertyDefinitionTestRunner: TestRunner<TypePropertyDefinition, TypePropertyDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseExpressionDefinitionTestRunner: TestRunner<BaseExpressionDefinition, BaseExpressionDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, TypePropertyDefinitionTestRunner: TestRunner<TypePropertyDefinition, TypePropertyDefinitionTestStructure>) {
        this.BaseExpressionDefinitionTestRunner = BaseExpressionDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.TypePropertyDefinitionTestRunner = TypePropertyDefinitionTestRunner;
    }

    runTest(actual: BaseTypeDefinition, expected: BaseTypeDefinitionTestStructure) {
        this.assertions.describe("BaseTypeDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseExpressionDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("arrayElementType", () => {
                let actualValue = actual.arrayElementType;
                let expectedValue = expected.arrayElementType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        })(actualValue as TypeDefinition, expectedValue as TypeDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("intersectionTypes", () => {
                let actualValue = actual.intersectionTypes;
                let expectedValue = expected.intersectionTypes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("unionTypes", () => {
                let actualValue = actual.unionTypes;
                let expectedValue = expected.unionTypes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            if (typeof expected.properties !== "undefined") {
                this.assertions.describe("properties", () => {
                    let actualValue = actual.properties;
                    let expectedValue = expected.properties;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = [];
                    }
                    this.assertions.it("should have the same length", () => {
                        this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                    });
                    for (let i = 0; i < (expectedValue || []).length; i++) {
                        ((actualValue, expectedValue, i) => {
                            this.assertions.describe(`index ${i}`, () => {
                                this.TypePropertyDefinitionTestRunner.runTest(actualValue as any as TypePropertyDefinition, expectedValue as any as TypePropertyDefinitionTestStructure);
                            });
                        })(actualValue[i], expectedValue![i], i);
                    }
                });
            }
            if (typeof expected.typeArguments !== "undefined") {
                this.assertions.describe("typeArguments", () => {
                    let actualValue = actual.typeArguments;
                    let expectedValue = expected.typeArguments;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = [];
                    }
                    this.assertions.it("should have the same length", () => {
                        this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                    });
                    for (let i = 0; i < (expectedValue || []).length; i++) {
                        ((actualValue, expectedValue, i) => {
                            this.assertions.describe(`index ${i}`, () => {
                                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                            });
                        })(actualValue[i], expectedValue![i], i);
                    }
                });
            }
            this.assertions.describe("text", () => {
                let actualValue = actual.text;
                let expectedValue = expected.text;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("#isArrayType()", () => {
                let actualValue = actual.isArrayType();
                let expectedValue = expected.isArrayType || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (expected.definitions != null) {
                this.assertions.describe("#definitions", () => {
                    let actualDefinitions = actual.definitions;
                    let expectedDefinitions = expected.definitions!;
                    for (let i = 0; i < actualDefinitions.length; i++) {
                        this.assertions.it("should have the same value", () => {
                            this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);
                        });
                        if (expectedDefinitions[i].type != null) {
                            this.assertions.it("should be an instance of the correct type", () => {
                                this.assertions.strictEqual(actualDefinitions[i] instanceof expectedDefinitions[i].type, true);
                            });
                        }
                    }
                });
            }
            if (expected.allDefinitions != null) {
                this.assertions.describe("#allDefinitions", () => {
                    let actualDefinitions = actual.getAllDefinitions();
                    let expectedDefinitions = expected.allDefinitions!;
                    for (let i = 0; i < actualDefinitions.length; i++) {
                        this.assertions.it("should have the same value", () => {
                            this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);
                        });
                    }
                });
            }
        });
    }
}

export interface ExpressionDefinitionTestStructure extends BaseExpressionDefinitionTestStructure {
}

export class ExpressionDefinitionTestRunner implements TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure> {
    private BaseExpressionDefinitionTestRunner: TestRunner<BaseExpressionDefinition, BaseExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseExpressionDefinitionTestRunner: TestRunner<BaseExpressionDefinition, BaseExpressionDefinitionTestStructure>) {
        this.BaseExpressionDefinitionTestRunner = BaseExpressionDefinitionTestRunner;
    }

    runTest(actual: ExpressionDefinition, expected: ExpressionDefinitionTestStructure) {
        this.assertions.describe("ExpressionDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseExpressionDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface ThisTypedDefinitionTestStructure {
    thisType?: (null | TypeDefinitionTestStructure);
}

export class ThisTypedDefinitionTestRunner implements TestRunner<ThisTypedDefinition, ThisTypedDefinitionTestStructure> {
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: ThisTypedDefinition, expected: ThisTypedDefinitionTestStructure) {
        this.assertions.describe("ThisTypedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("thisType", () => {
                let actualValue = actual.thisType;
                let expectedValue = expected.thisType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        })(actualValue as TypeDefinition, expectedValue as TypeDefinitionTestStructure);
                    });
                });
            });
        });
    }
}

export interface DefaultExpressionedDefinitionTestStructure {
    defaultExpression?: (null | ExpressionDefinitionTestStructure);
}

export class DefaultExpressionedDefinitionTestRunner implements TestRunner<DefaultExpressionedDefinition, DefaultExpressionedDefinitionTestStructure> {
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: DefaultExpressionedDefinition, expected: DefaultExpressionedDefinitionTestStructure) {
        this.assertions.describe("DefaultExpressionedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("defaultExpression", () => {
                let actualValue = actual.defaultExpression;
                let expectedValue = expected.defaultExpression;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                    });
                });
            });
        });
    }
}

export interface DecoratableDefinitionTestStructure {
    decorators?: DecoratorDefinitionTestStructure[];
}

export class DecoratableDefinitionTestRunner implements TestRunner<DecoratableDefinition, DecoratableDefinitionTestStructure> {
    private DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>) {
        this.DecoratorDefinitionTestRunner = DecoratorDefinitionTestRunner;
    }

    runTest(actual: DecoratableDefinition, expected: DecoratableDefinitionTestStructure) {
        this.assertions.describe("DecoratableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("decorators", () => {
                let actualValue = actual.decorators;
                let expectedValue = expected.decorators;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.DecoratorDefinitionTestRunner.runTest(actualValue as any as DecoratorDefinition, expectedValue as any as DecoratorDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface BaseObjectPropertyDefinitionTestStructure extends BasePropertyDefinitionTestStructure {
    defaultExpression?: (null | ExpressionDefinitionTestStructure);
}

export class BaseObjectPropertyDefinitionTestRunner implements TestRunner<BaseObjectPropertyDefinition, BaseObjectPropertyDefinitionTestStructure> {
    private BasePropertyDefinitionTestRunner: TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BasePropertyDefinitionTestRunner: TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.BasePropertyDefinitionTestRunner = BasePropertyDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: BaseObjectPropertyDefinition, expected: BaseObjectPropertyDefinitionTestStructure) {
        this.assertions.describe("BaseObjectPropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BasePropertyDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("defaultExpression", () => {
                let actualValue = actual.defaultExpression;
                let expectedValue = expected.defaultExpression;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                    });
                });
            });
        });
    }
}

export interface BaseParameterDefinitionTestStructure extends BaseDefinitionTestStructure {
    isRestParameter?: boolean;
    destructuringProperties?: ObjectPropertyDefinitionTestStructure[];
    name: (null | string);
    isOptional?: boolean;
    type?: TypeDefinitionTestStructure;
    defaultExpression?: (null | ExpressionDefinitionTestStructure);
}

export class BaseParameterDefinitionTestRunner implements TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ObjectPropertyDefinitionTestRunner: TestRunner<ObjectPropertyDefinition, ObjectPropertyDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ObjectPropertyDefinitionTestRunner: TestRunner<ObjectPropertyDefinition, ObjectPropertyDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ObjectPropertyDefinitionTestRunner = ObjectPropertyDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: BaseParameterDefinition, expected: BaseParameterDefinitionTestStructure) {
        this.assertions.describe("BaseParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("isRestParameter", () => {
                let actualValue = actual.isRestParameter;
                let expectedValue = expected.isRestParameter;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("destructuringProperties", () => {
                let actualValue = actual.destructuringProperties;
                let expectedValue = expected.destructuringProperties;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ObjectPropertyDefinitionTestRunner.runTest(actualValue as any as ObjectPropertyDefinition, expectedValue as any as ObjectPropertyDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as string, expectedValue as string);
                    });
                });
            });
            this.assertions.describe("isOptional", () => {
                let actualValue = actual.isOptional;
                let expectedValue = expected.isOptional;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("type", () => {
                let actualValue = actual.type;
                let expectedValue = expected.type;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "any" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("defaultExpression", () => {
                let actualValue = actual.defaultExpression;
                let expectedValue = expected.defaultExpression;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                    });
                });
            });
        });
    }
}

export interface ParameteredDefinitionTestStructure<ParameterType extends BaseParameterDefinitionTestStructure, ParameterStructureType> {
    parameters?: ParameterType[];
}

export class ParameteredDefinitionTestRunner<ParameterType extends BaseParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseParameterDefinitionTestStructure, ParameterStructureTypeExpected> implements TestRunner<ParameteredDefinition<ParameterType, ParameterStructureType>, ParameteredDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>> {
    private ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>;
    private ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>) {
        this.ParameterTypeTestRunner = ParameterTypeTestRunner;
        this.ParameterStructureTypeTestRunner = ParameterStructureTypeTestRunner;
    }

    runTest(actual: ParameteredDefinition<ParameterType, ParameterStructureType>, expected: ParameteredDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>) {
        this.assertions.describe("ParameteredDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("parameters", () => {
                let actualValue = actual.parameters;
                let expectedValue = expected.parameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ParameterTypeTestRunner.runTest(actualValue, expectedValue);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface ReturnTypedDefinitionTestStructure {
    returnType?: TypeDefinitionTestStructure;
}

export class ReturnTypedDefinitionTestRunner implements TestRunner<ReturnTypedDefinition, ReturnTypedDefinitionTestStructure> {
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: ReturnTypedDefinition, expected: ReturnTypedDefinitionTestStructure) {
        this.assertions.describe("ReturnTypedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("returnType", () => {
                let actualValue = actual.returnType;
                let expectedValue = expected.returnType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "void" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
        });
    }
}

export interface OverloadSignaturedDefinitionTestStructure {
    overloadSignatures?: CallSignatureDefinitionTestStructure[];
}

export class OverloadSignaturedDefinitionTestRunner implements TestRunner<OverloadSignaturedDefinition, OverloadSignaturedDefinitionTestStructure> {
    private CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>) {
        this.CallSignatureDefinitionTestRunner = CallSignatureDefinitionTestRunner;
    }

    runTest(actual: OverloadSignaturedDefinition, expected: OverloadSignaturedDefinitionTestStructure) {
        this.assertions.describe("OverloadSignaturedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("overloadSignatures", () => {
                let actualValue = actual.overloadSignatures;
                let expectedValue = expected.overloadSignatures;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.CallSignatureDefinitionTestRunner.runTest(actualValue as any as CallSignatureDefinition, expectedValue as any as CallSignatureDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface BaseFunctionDefinitionTestStructure<ParameterType extends BaseParameterDefinitionTestStructure, ParameterStructureType> extends BaseDefinitionTestStructure {
    isGenerator?: boolean;
    userDefinedTypeGuard?: (null | UserDefinedTypeGuardDefinitionTestStructure);
    name: string;
    parameters?: ParameterType[];
    thisType?: (null | TypeDefinitionTestStructure);
    returnType?: TypeDefinitionTestStructure;
    typeParameters?: TypeParameterDefinitionTestStructure[];
    overloadSignatures?: CallSignatureDefinitionTestStructure[];
    documentationComment?: string;
}

export class BaseFunctionDefinitionTestRunner<ParameterType extends BaseParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseParameterDefinitionTestStructure, ParameterStructureTypeExpected> implements TestRunner<BaseFunctionDefinition<ParameterType, ParameterStructureType>, BaseFunctionDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>> {
    private ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>;
    private ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>;
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private UserDefinedTypeGuardDefinitionTestRunner: TestRunner<UserDefinedTypeGuardDefinition, UserDefinedTypeGuardDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;
    private CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>, BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, UserDefinedTypeGuardDefinitionTestRunner: TestRunner<UserDefinedTypeGuardDefinition, UserDefinedTypeGuardDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>, CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>) {
        this.ParameterTypeTestRunner = ParameterTypeTestRunner;
        this.ParameterStructureTypeTestRunner = ParameterStructureTypeTestRunner;
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.UserDefinedTypeGuardDefinitionTestRunner = UserDefinedTypeGuardDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
        this.CallSignatureDefinitionTestRunner = CallSignatureDefinitionTestRunner;
    }

    runTest(actual: BaseFunctionDefinition<ParameterType, ParameterStructureType>, expected: BaseFunctionDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>) {
        this.assertions.describe("BaseFunctionDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("isGenerator", () => {
                let actualValue = actual.isGenerator;
                let expectedValue = expected.isGenerator;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("userDefinedTypeGuard", () => {
                let actualValue = actual.userDefinedTypeGuard;
                let expectedValue = expected.userDefinedTypeGuard;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.UserDefinedTypeGuardDefinitionTestRunner.runTest(actualValue as any as UserDefinedTypeGuardDefinition, expectedValue as any as UserDefinedTypeGuardDefinitionTestStructure);
                        })(actualValue as UserDefinedTypeGuardDefinition, expectedValue as UserDefinedTypeGuardDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("parameters", () => {
                let actualValue = actual.parameters;
                let expectedValue = expected.parameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ParameterTypeTestRunner.runTest(actualValue, expectedValue);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("thisType", () => {
                let actualValue = actual.thisType;
                let expectedValue = expected.thisType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        })(actualValue as TypeDefinition, expectedValue as TypeDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("returnType", () => {
                let actualValue = actual.returnType;
                let expectedValue = expected.returnType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "void" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("overloadSignatures", () => {
                let actualValue = actual.overloadSignatures;
                let expectedValue = expected.overloadSignatures;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.CallSignatureDefinitionTestRunner.runTest(actualValue as any as CallSignatureDefinition, expectedValue as any as CallSignatureDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface EnumMemberDefinitionTestStructure extends BaseDefinitionTestStructure {
    value: number;
    name: string;
    documentationComment?: string;
}

export class EnumMemberDefinitionTestRunner implements TestRunner<EnumMemberDefinition, EnumMemberDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
    }

    runTest(actual: EnumMemberDefinition, expected: EnumMemberDefinitionTestStructure) {
        this.assertions.describe("EnumMemberDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("value", () => {
                let actualValue = actual.value;
                let expectedValue = expected.value;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface EnumDefinitionTestStructure extends BaseDefinitionTestStructure {
    isConst?: boolean;
    members?: EnumMemberDefinitionTestStructure[];
    name: string;
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    order?: number;
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    documentationComment?: string;
}

export class EnumDefinitionTestRunner implements TestRunner<EnumDefinition, EnumDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private EnumMemberDefinitionTestRunner: TestRunner<EnumMemberDefinition, EnumMemberDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, EnumMemberDefinitionTestRunner: TestRunner<EnumMemberDefinition, EnumMemberDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.EnumMemberDefinitionTestRunner = EnumMemberDefinitionTestRunner;
    }

    runTest(actual: EnumDefinition, expected: EnumDefinitionTestStructure) {
        this.assertions.describe("EnumDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("isConst", () => {
                let actualValue = actual.isConst;
                let expectedValue = expected.isConst;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("members", () => {
                let actualValue = actual.members;
                let expectedValue = expected.members;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.EnumMemberDefinitionTestRunner.runTest(actualValue as any as EnumMemberDefinition, expectedValue as any as EnumMemberDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ScopedDefinitionTestStructure {
    scope?: Scope;
}

export class ScopedDefinitionTestRunner implements TestRunner<ScopedDefinition, ScopedDefinitionTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: ScopedDefinition, expected: ScopedDefinitionTestStructure) {
        this.assertions.describe("ScopedDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("scope", () => {
                let actualValue = actual.scope;
                let expectedValue = expected.scope;
                if (typeof expectedValue === "undefined") {
                    expectedValue = Scope.Public;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface BaseClassMethodParameterDefinitionTestStructure extends BaseParameterDefinitionTestStructure {
    decorators?: DecoratorDefinitionTestStructure[];
    scope?: Scope;
}

export class BaseClassMethodParameterDefinitionTestRunner implements TestRunner<BaseClassMethodParameterDefinition, BaseClassMethodParameterDefinitionTestStructure> {
    private BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>;
    private DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>, DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>) {
        this.BaseParameterDefinitionTestRunner = BaseParameterDefinitionTestRunner;
        this.DecoratorDefinitionTestRunner = DecoratorDefinitionTestRunner;
    }

    runTest(actual: BaseClassMethodParameterDefinition, expected: BaseClassMethodParameterDefinitionTestStructure) {
        this.assertions.describe("BaseClassMethodParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("decorators", () => {
                let actualValue = actual.decorators;
                let expectedValue = expected.decorators;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.DecoratorDefinitionTestRunner.runTest(actualValue as any as DecoratorDefinition, expectedValue as any as DecoratorDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("scope", () => {
                let actualValue = actual.scope;
                let expectedValue = expected.scope;
                if (typeof expectedValue === "undefined") {
                    expectedValue = Scope.Public;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface BaseClassMethodDefinitionTestStructure<ParameterType extends BaseClassMethodParameterDefinitionTestStructure, ParameterStructureType> extends BaseFunctionDefinitionTestStructure<ParameterType, ParameterStructureType> {
    isAsync?: boolean;
    decorators?: DecoratorDefinitionTestStructure[];
    scope?: Scope;
    hasOnWriteFunctionBody?: boolean;
}

export class BaseClassMethodDefinitionTestRunner<ParameterType extends BaseClassMethodParameterDefinition, ParameterStructureType, ParameterTypeExpected extends BaseClassMethodParameterDefinitionTestStructure, ParameterStructureTypeExpected> implements TestRunner<BaseClassMethodDefinition<ParameterType, ParameterStructureType>, BaseClassMethodDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>> {
    private ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>;
    private ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>;
    private BaseFunctionDefinitionTestRunner: TestRunner<BaseFunctionDefinition<ParameterType, ParameterStructureType>, BaseFunctionDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>>;
    private DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(ParameterTypeTestRunner: TestRunner<ParameterType, ParameterTypeExpected>, ParameterStructureTypeTestRunner: TestRunner<ParameterStructureType, ParameterStructureTypeExpected>, BaseFunctionDefinitionTestRunner: TestRunner<BaseFunctionDefinition<ParameterType, ParameterStructureType>, BaseFunctionDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>>, DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>) {
        this.ParameterTypeTestRunner = ParameterTypeTestRunner;
        this.ParameterStructureTypeTestRunner = ParameterStructureTypeTestRunner;
        this.BaseFunctionDefinitionTestRunner = BaseFunctionDefinitionTestRunner;
        this.DecoratorDefinitionTestRunner = DecoratorDefinitionTestRunner;
    }

    runTest(actual: BaseClassMethodDefinition<ParameterType, ParameterStructureType>, expected: BaseClassMethodDefinitionTestStructure<ParameterTypeExpected, ParameterStructureTypeExpected>) {
        this.assertions.describe("BaseClassMethodDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseFunctionDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("isAsync", () => {
                let actualValue = actual.isAsync;
                let expectedValue = expected.isAsync;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("decorators", () => {
                let actualValue = actual.decorators;
                let expectedValue = expected.decorators;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.DecoratorDefinitionTestRunner.runTest(actualValue as any as DecoratorDefinition, expectedValue as any as DecoratorDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("scope", () => {
                let actualValue = actual.scope;
                let expectedValue = expected.scope;
                if (typeof expectedValue === "undefined") {
                    expectedValue = Scope.Public;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasOnWriteFunctionBody", () => {
                let actualValue = typeof actual.onWriteFunctionBody === "function";
                let expectedValue = expected.hasOnWriteFunctionBody || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface BaseClassPropertyDefinitionTestStructure extends BaseObjectPropertyDefinitionTestStructure {
    decorators?: DecoratorDefinitionTestStructure[];
    scope?: Scope;
    documentationComment?: string;
}

export class BaseClassPropertyDefinitionTestRunner implements TestRunner<BaseClassPropertyDefinition, BaseClassPropertyDefinitionTestStructure> {
    private BaseObjectPropertyDefinitionTestRunner: TestRunner<BaseObjectPropertyDefinition, BaseObjectPropertyDefinitionTestStructure>;
    private DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseObjectPropertyDefinitionTestRunner: TestRunner<BaseObjectPropertyDefinition, BaseObjectPropertyDefinitionTestStructure>, DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>) {
        this.BaseObjectPropertyDefinitionTestRunner = BaseObjectPropertyDefinitionTestRunner;
        this.DecoratorDefinitionTestRunner = DecoratorDefinitionTestRunner;
    }

    runTest(actual: BaseClassPropertyDefinition, expected: BaseClassPropertyDefinitionTestStructure) {
        this.assertions.describe("BaseClassPropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseObjectPropertyDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("decorators", () => {
                let actualValue = actual.decorators;
                let expectedValue = expected.decorators;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.DecoratorDefinitionTestRunner.runTest(actualValue as any as DecoratorDefinition, expectedValue as any as DecoratorDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("scope", () => {
                let actualValue = actual.scope;
                let expectedValue = expected.scope;
                if (typeof expectedValue === "undefined") {
                    expectedValue = Scope.Public;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface InterfaceMethodParameterDefinitionTestStructure extends BaseParameterDefinitionTestStructure {
}

export class InterfaceMethodParameterDefinitionTestRunner implements TestRunner<InterfaceMethodParameterDefinition, InterfaceMethodParameterDefinitionTestStructure> {
    private BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>) {
        this.BaseParameterDefinitionTestRunner = BaseParameterDefinitionTestRunner;
    }

    runTest(actual: InterfaceMethodParameterDefinition, expected: InterfaceMethodParameterDefinitionTestStructure) {
        this.assertions.describe("InterfaceMethodParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface InterfaceMethodDefinitionTestStructure extends BaseFunctionDefinitionTestStructure<InterfaceMethodParameterDefinitionTestStructure, InterfaceMethodParameterStructureTestStructure> {
}

export class InterfaceMethodDefinitionTestRunner implements TestRunner<InterfaceMethodDefinition, InterfaceMethodDefinitionTestStructure> {
    private BaseFunctionDefinitionTestRunner: TestRunner<BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure>, BaseFunctionDefinitionTestStructure<InterfaceMethodParameterDefinitionTestStructure, InterfaceMethodParameterStructureTestStructure>>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseFunctionDefinitionTestRunner: TestRunner<BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure>, BaseFunctionDefinitionTestStructure<InterfaceMethodParameterDefinitionTestStructure, InterfaceMethodParameterStructureTestStructure>>) {
        this.BaseFunctionDefinitionTestRunner = BaseFunctionDefinitionTestRunner;
    }

    runTest(actual: InterfaceMethodDefinition, expected: InterfaceMethodDefinitionTestStructure) {
        this.assertions.describe("InterfaceMethodDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseFunctionDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface InterfacePropertyDefinitionTestStructure extends BasePropertyDefinitionTestStructure {
    documentationComment?: string;
}

export class InterfacePropertyDefinitionTestRunner implements TestRunner<InterfacePropertyDefinition, InterfacePropertyDefinitionTestStructure> {
    private BasePropertyDefinitionTestRunner: TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BasePropertyDefinitionTestRunner: TestRunner<BasePropertyDefinition, BasePropertyDefinitionTestStructure>) {
        this.BasePropertyDefinitionTestRunner = BasePropertyDefinitionTestRunner;
    }

    runTest(actual: InterfacePropertyDefinition, expected: InterfacePropertyDefinitionTestStructure) {
        this.assertions.describe("InterfacePropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BasePropertyDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface InterfaceDefinitionTestStructure extends BaseDefinitionTestStructure {
    methods?: InterfaceMethodDefinitionTestStructure[];
    callSignatures?: CallSignatureDefinitionTestStructure[];
    indexSignatures?: IndexSignatureDefinitionTestStructure[];
    newSignatures?: CallSignatureDefinitionTestStructure[];
    properties?: InterfacePropertyDefinitionTestStructure[];
    extendsTypes?: TypeDefinitionTestStructure[];
    name: string;
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    order?: number;
    typeParameters?: TypeParameterDefinitionTestStructure[];
    documentationComment?: string;
}

export class InterfaceDefinitionTestRunner implements TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private InterfaceMethodDefinitionTestRunner: TestRunner<InterfaceMethodDefinition, InterfaceMethodDefinitionTestStructure>;
    private CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>;
    private IndexSignatureDefinitionTestRunner: TestRunner<IndexSignatureDefinition, IndexSignatureDefinitionTestStructure>;
    private InterfacePropertyDefinitionTestRunner: TestRunner<InterfacePropertyDefinition, InterfacePropertyDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, InterfaceMethodDefinitionTestRunner: TestRunner<InterfaceMethodDefinition, InterfaceMethodDefinitionTestStructure>, CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>, IndexSignatureDefinitionTestRunner: TestRunner<IndexSignatureDefinition, IndexSignatureDefinitionTestStructure>, InterfacePropertyDefinitionTestRunner: TestRunner<InterfacePropertyDefinition, InterfacePropertyDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.InterfaceMethodDefinitionTestRunner = InterfaceMethodDefinitionTestRunner;
        this.CallSignatureDefinitionTestRunner = CallSignatureDefinitionTestRunner;
        this.IndexSignatureDefinitionTestRunner = IndexSignatureDefinitionTestRunner;
        this.InterfacePropertyDefinitionTestRunner = InterfacePropertyDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
    }

    runTest(actual: InterfaceDefinition, expected: InterfaceDefinitionTestStructure) {
        this.assertions.describe("InterfaceDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("methods", () => {
                let actualValue = actual.methods;
                let expectedValue = expected.methods;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.InterfaceMethodDefinitionTestRunner.runTest(actualValue as any as InterfaceMethodDefinition, expectedValue as any as InterfaceMethodDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("callSignatures", () => {
                let actualValue = actual.callSignatures;
                let expectedValue = expected.callSignatures;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.CallSignatureDefinitionTestRunner.runTest(actualValue as any as CallSignatureDefinition, expectedValue as any as CallSignatureDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("indexSignatures", () => {
                let actualValue = actual.indexSignatures;
                let expectedValue = expected.indexSignatures;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.IndexSignatureDefinitionTestRunner.runTest(actualValue as any as IndexSignatureDefinition, expectedValue as any as IndexSignatureDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("newSignatures", () => {
                let actualValue = actual.newSignatures;
                let expectedValue = expected.newSignatures;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.CallSignatureDefinitionTestRunner.runTest(actualValue as any as CallSignatureDefinition, expectedValue as any as CallSignatureDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("properties", () => {
                let actualValue = actual.properties;
                let expectedValue = expected.properties;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.InterfacePropertyDefinitionTestRunner.runTest(actualValue as any as InterfacePropertyDefinition, expectedValue as any as InterfacePropertyDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("extendsTypes", () => {
                let actualValue = actual.extendsTypes;
                let expectedValue = expected.extendsTypes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = true;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ClassConstructorParameterDefinitionTestStructure extends BaseParameterDefinitionTestStructure {
    scope?: ClassConstructorParameterScope;
    decorators?: DecoratorDefinitionTestStructure[];
    isReadonly?: boolean;
}

export class ClassConstructorParameterDefinitionTestRunner implements TestRunner<ClassConstructorParameterDefinition, ClassConstructorParameterDefinitionTestStructure> {
    private BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>;
    private DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>, DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>) {
        this.BaseParameterDefinitionTestRunner = BaseParameterDefinitionTestRunner;
        this.DecoratorDefinitionTestRunner = DecoratorDefinitionTestRunner;
    }

    runTest(actual: ClassConstructorParameterDefinition, expected: ClassConstructorParameterDefinitionTestStructure) {
        this.assertions.describe("ClassConstructorParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("scope", () => {
                let actualValue = actual.scope;
                let expectedValue = expected.scope;
                if (typeof expectedValue === "undefined") {
                    expectedValue = ClassConstructorParameterScope.None;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("decorators", () => {
                let actualValue = actual.decorators;
                let expectedValue = expected.decorators;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.DecoratorDefinitionTestRunner.runTest(actualValue as any as DecoratorDefinition, expectedValue as any as DecoratorDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("isReadonly", () => {
                let actualValue = actual.isReadonly;
                let expectedValue = expected.isReadonly;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ClassConstructorDefinitionTestStructure extends BaseDefinitionTestStructure {
    parameters?: ClassConstructorParameterDefinitionTestStructure[];
    scope?: Scope;
    overloadSignatures?: CallSignatureDefinitionTestStructure[];
    documentationComment?: string;
    hasOnWriteFunctionBody?: boolean;
}

export class ClassConstructorDefinitionTestRunner implements TestRunner<ClassConstructorDefinition, ClassConstructorDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ClassConstructorParameterDefinitionTestRunner: TestRunner<ClassConstructorParameterDefinition, ClassConstructorParameterDefinitionTestStructure>;
    private CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ClassConstructorParameterDefinitionTestRunner: TestRunner<ClassConstructorParameterDefinition, ClassConstructorParameterDefinitionTestStructure>, CallSignatureDefinitionTestRunner: TestRunner<CallSignatureDefinition, CallSignatureDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ClassConstructorParameterDefinitionTestRunner = ClassConstructorParameterDefinitionTestRunner;
        this.CallSignatureDefinitionTestRunner = CallSignatureDefinitionTestRunner;
    }

    runTest(actual: ClassConstructorDefinition, expected: ClassConstructorDefinitionTestStructure) {
        this.assertions.describe("ClassConstructorDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("parameters", () => {
                let actualValue = actual.parameters;
                let expectedValue = expected.parameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassConstructorParameterDefinitionTestRunner.runTest(actualValue as any as ClassConstructorParameterDefinition, expectedValue as any as ClassConstructorParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("scope", () => {
                let actualValue = actual.scope;
                let expectedValue = expected.scope;
                if (typeof expectedValue === "undefined") {
                    expectedValue = Scope.Public;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("overloadSignatures", () => {
                let actualValue = actual.overloadSignatures;
                let expectedValue = expected.overloadSignatures;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.CallSignatureDefinitionTestRunner.runTest(actualValue as any as CallSignatureDefinition, expectedValue as any as CallSignatureDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasOnWriteFunctionBody", () => {
                let actualValue = typeof actual.onWriteFunctionBody === "function";
                let expectedValue = expected.hasOnWriteFunctionBody || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ClassMethodParameterDefinitionTestStructure extends BaseClassMethodParameterDefinitionTestStructure {
}

export class ClassMethodParameterDefinitionTestRunner implements TestRunner<ClassMethodParameterDefinition, ClassMethodParameterDefinitionTestStructure> {
    private BaseClassMethodParameterDefinitionTestRunner: TestRunner<BaseClassMethodParameterDefinition, BaseClassMethodParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassMethodParameterDefinitionTestRunner: TestRunner<BaseClassMethodParameterDefinition, BaseClassMethodParameterDefinitionTestStructure>) {
        this.BaseClassMethodParameterDefinitionTestRunner = BaseClassMethodParameterDefinitionTestRunner;
    }

    runTest(actual: ClassMethodParameterDefinition, expected: ClassMethodParameterDefinitionTestStructure) {
        this.assertions.describe("ClassMethodParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassMethodParameterDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface ClassMethodDefinitionTestStructure extends BaseClassMethodDefinitionTestStructure<ClassMethodParameterDefinitionTestStructure, ClassMethodParameterStructureTestStructure> {
    isAbstract?: boolean;
}

export class ClassMethodDefinitionTestRunner implements TestRunner<ClassMethodDefinition, ClassMethodDefinitionTestStructure> {
    private BaseClassMethodDefinitionTestRunner: TestRunner<BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure>, BaseClassMethodDefinitionTestStructure<ClassMethodParameterDefinitionTestStructure, ClassMethodParameterStructureTestStructure>>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassMethodDefinitionTestRunner: TestRunner<BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure>, BaseClassMethodDefinitionTestStructure<ClassMethodParameterDefinitionTestStructure, ClassMethodParameterStructureTestStructure>>) {
        this.BaseClassMethodDefinitionTestRunner = BaseClassMethodDefinitionTestRunner;
    }

    runTest(actual: ClassMethodDefinition, expected: ClassMethodDefinitionTestStructure) {
        this.assertions.describe("ClassMethodDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassMethodDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("isAbstract", () => {
                let actualValue = actual.isAbstract;
                let expectedValue = expected.isAbstract;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ClassPropertyDefinitionTestStructure extends BaseClassPropertyDefinitionTestStructure {
    kind?: ClassPropertyKind;
    isConstructorParameter?: boolean;
    isAbstract?: boolean;
    hasOnWriteGetBody?: boolean;
    hasOnWriteSetBody?: boolean;
}

export class ClassPropertyDefinitionTestRunner implements TestRunner<ClassPropertyDefinition, ClassPropertyDefinitionTestStructure> {
    private BaseClassPropertyDefinitionTestRunner: TestRunner<BaseClassPropertyDefinition, BaseClassPropertyDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassPropertyDefinitionTestRunner: TestRunner<BaseClassPropertyDefinition, BaseClassPropertyDefinitionTestStructure>) {
        this.BaseClassPropertyDefinitionTestRunner = BaseClassPropertyDefinitionTestRunner;
    }

    runTest(actual: ClassPropertyDefinition, expected: ClassPropertyDefinitionTestStructure) {
        this.assertions.describe("ClassPropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassPropertyDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("kind", () => {
                let actualValue = actual.kind;
                let expectedValue = expected.kind;
                if (typeof expectedValue === "undefined") {
                    expectedValue = ClassPropertyKind.Normal;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isConstructorParameter", () => {
                let actualValue = actual.isConstructorParameter;
                let expectedValue = expected.isConstructorParameter;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAbstract", () => {
                let actualValue = actual.isAbstract;
                let expectedValue = expected.isAbstract;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasOnWriteGetBody", () => {
                let actualValue = typeof actual.onWriteGetBody === "function";
                let expectedValue = expected.hasOnWriteGetBody || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasOnWriteSetBody", () => {
                let actualValue = typeof actual.onWriteSetBody === "function";
                let expectedValue = expected.hasOnWriteSetBody || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ClassStaticMethodParameterDefinitionTestStructure extends BaseClassMethodParameterDefinitionTestStructure {
}

export class ClassStaticMethodParameterDefinitionTestRunner implements TestRunner<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterDefinitionTestStructure> {
    private BaseClassMethodParameterDefinitionTestRunner: TestRunner<BaseClassMethodParameterDefinition, BaseClassMethodParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassMethodParameterDefinitionTestRunner: TestRunner<BaseClassMethodParameterDefinition, BaseClassMethodParameterDefinitionTestStructure>) {
        this.BaseClassMethodParameterDefinitionTestRunner = BaseClassMethodParameterDefinitionTestRunner;
    }

    runTest(actual: ClassStaticMethodParameterDefinition, expected: ClassStaticMethodParameterDefinitionTestStructure) {
        this.assertions.describe("ClassStaticMethodParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassMethodParameterDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface ClassStaticMethodDefinitionTestStructure extends BaseClassMethodDefinitionTestStructure<ClassStaticMethodParameterDefinitionTestStructure, ClassStaticMethodParameterStructureTestStructure> {
}

export class ClassStaticMethodDefinitionTestRunner implements TestRunner<ClassStaticMethodDefinition, ClassStaticMethodDefinitionTestStructure> {
    private BaseClassMethodDefinitionTestRunner: TestRunner<BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure>, BaseClassMethodDefinitionTestStructure<ClassStaticMethodParameterDefinitionTestStructure, ClassStaticMethodParameterStructureTestStructure>>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassMethodDefinitionTestRunner: TestRunner<BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure>, BaseClassMethodDefinitionTestStructure<ClassStaticMethodParameterDefinitionTestStructure, ClassStaticMethodParameterStructureTestStructure>>) {
        this.BaseClassMethodDefinitionTestRunner = BaseClassMethodDefinitionTestRunner;
    }

    runTest(actual: ClassStaticMethodDefinition, expected: ClassStaticMethodDefinitionTestStructure) {
        this.assertions.describe("ClassStaticMethodDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassMethodDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface ClassStaticPropertyDefinitionTestStructure extends BaseClassPropertyDefinitionTestStructure {
}

export class ClassStaticPropertyDefinitionTestRunner implements TestRunner<ClassStaticPropertyDefinition, ClassStaticPropertyDefinitionTestStructure> {
    private BaseClassPropertyDefinitionTestRunner: TestRunner<BaseClassPropertyDefinition, BaseClassPropertyDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassPropertyDefinitionTestRunner: TestRunner<BaseClassPropertyDefinition, BaseClassPropertyDefinitionTestStructure>) {
        this.BaseClassPropertyDefinitionTestRunner = BaseClassPropertyDefinitionTestRunner;
    }

    runTest(actual: ClassStaticPropertyDefinition, expected: ClassStaticPropertyDefinitionTestStructure) {
        this.assertions.describe("ClassStaticPropertyDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassPropertyDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface ClassDefinitionTestStructure extends BaseDefinitionTestStructure {
    methods?: ClassMethodDefinitionTestStructure[];
    properties?: ClassPropertyDefinitionTestStructure[];
    staticMethods?: ClassStaticMethodDefinitionTestStructure[];
    staticProperties?: ClassStaticPropertyDefinitionTestStructure[];
    constructorDef?: (null | ClassConstructorDefinitionTestStructure);
    extendsTypes?: TypeDefinitionTestStructure[];
    implementsTypes?: TypeDefinitionTestStructure[];
    name: string;
    decorators?: DecoratorDefinitionTestStructure[];
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    order?: number;
    typeParameters?: TypeParameterDefinitionTestStructure[];
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    isAbstract?: boolean;
    documentationComment?: string;
}

export class ClassDefinitionTestRunner implements TestRunner<ClassDefinition, ClassDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ClassMethodDefinitionTestRunner: TestRunner<ClassMethodDefinition, ClassMethodDefinitionTestStructure>;
    private ClassPropertyDefinitionTestRunner: TestRunner<ClassPropertyDefinition, ClassPropertyDefinitionTestStructure>;
    private ClassStaticMethodDefinitionTestRunner: TestRunner<ClassStaticMethodDefinition, ClassStaticMethodDefinitionTestStructure>;
    private ClassStaticPropertyDefinitionTestRunner: TestRunner<ClassStaticPropertyDefinition, ClassStaticPropertyDefinitionTestStructure>;
    private ClassConstructorDefinitionTestRunner: TestRunner<ClassConstructorDefinition, ClassConstructorDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;
    private DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>;
    private TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ClassMethodDefinitionTestRunner: TestRunner<ClassMethodDefinition, ClassMethodDefinitionTestStructure>, ClassPropertyDefinitionTestRunner: TestRunner<ClassPropertyDefinition, ClassPropertyDefinitionTestStructure>, ClassStaticMethodDefinitionTestRunner: TestRunner<ClassStaticMethodDefinition, ClassStaticMethodDefinitionTestStructure>, ClassStaticPropertyDefinitionTestRunner: TestRunner<ClassStaticPropertyDefinition, ClassStaticPropertyDefinitionTestStructure>, ClassConstructorDefinitionTestRunner: TestRunner<ClassConstructorDefinition, ClassConstructorDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>, DecoratorDefinitionTestRunner: TestRunner<DecoratorDefinition, DecoratorDefinitionTestStructure>, TypeParameterDefinitionTestRunner: TestRunner<TypeParameterDefinition, TypeParameterDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ClassMethodDefinitionTestRunner = ClassMethodDefinitionTestRunner;
        this.ClassPropertyDefinitionTestRunner = ClassPropertyDefinitionTestRunner;
        this.ClassStaticMethodDefinitionTestRunner = ClassStaticMethodDefinitionTestRunner;
        this.ClassStaticPropertyDefinitionTestRunner = ClassStaticPropertyDefinitionTestRunner;
        this.ClassConstructorDefinitionTestRunner = ClassConstructorDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
        this.DecoratorDefinitionTestRunner = DecoratorDefinitionTestRunner;
        this.TypeParameterDefinitionTestRunner = TypeParameterDefinitionTestRunner;
    }

    runTest(actual: ClassDefinition, expected: ClassDefinitionTestStructure) {
        this.assertions.describe("ClassDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("methods", () => {
                let actualValue = actual.methods;
                let expectedValue = expected.methods;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassMethodDefinitionTestRunner.runTest(actualValue as any as ClassMethodDefinition, expectedValue as any as ClassMethodDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("properties", () => {
                let actualValue = actual.properties;
                let expectedValue = expected.properties;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassPropertyDefinitionTestRunner.runTest(actualValue as any as ClassPropertyDefinition, expectedValue as any as ClassPropertyDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("staticMethods", () => {
                let actualValue = actual.staticMethods;
                let expectedValue = expected.staticMethods;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassStaticMethodDefinitionTestRunner.runTest(actualValue as any as ClassStaticMethodDefinition, expectedValue as any as ClassStaticMethodDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("staticProperties", () => {
                let actualValue = actual.staticProperties;
                let expectedValue = expected.staticProperties;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassStaticPropertyDefinitionTestRunner.runTest(actualValue as any as ClassStaticPropertyDefinition, expectedValue as any as ClassStaticPropertyDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("constructorDef", () => {
                let actualValue = actual.constructorDef;
                let expectedValue = expected.constructorDef;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ClassConstructorDefinitionTestRunner.runTest(actualValue as any as ClassConstructorDefinition, expectedValue as any as ClassConstructorDefinitionTestStructure);
                        })(actualValue as ClassConstructorDefinition, expectedValue as ClassConstructorDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("extendsTypes", () => {
                let actualValue = actual.extendsTypes;
                let expectedValue = expected.extendsTypes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("implementsTypes", () => {
                let actualValue = actual.implementsTypes;
                let expectedValue = expected.implementsTypes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("decorators", () => {
                let actualValue = actual.decorators;
                let expectedValue = expected.decorators;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.DecoratorDefinitionTestRunner.runTest(actualValue as any as DecoratorDefinition, expectedValue as any as DecoratorDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("typeParameters", () => {
                let actualValue = actual.typeParameters;
                let expectedValue = expected.typeParameters;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeParameterDefinitionTestRunner.runTest(actualValue as any as TypeParameterDefinition, expectedValue as any as TypeParameterDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAbstract", () => {
                let actualValue = actual.isAbstract;
                let expectedValue = expected.isAbstract;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface FunctionParameterDefinitionTestStructure extends BaseParameterDefinitionTestStructure {
}

export class FunctionParameterDefinitionTestRunner implements TestRunner<FunctionParameterDefinition, FunctionParameterDefinitionTestStructure> {
    private BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterDefinitionTestRunner: TestRunner<BaseParameterDefinition, BaseParameterDefinitionTestStructure>) {
        this.BaseParameterDefinitionTestRunner = BaseParameterDefinitionTestRunner;
    }

    runTest(actual: FunctionParameterDefinition, expected: FunctionParameterDefinitionTestStructure) {
        this.assertions.describe("FunctionParameterDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterDefinitionTestRunner.runTest(actual, expected);
        });
    }
}

export interface FunctionDefinitionTestStructure extends BaseFunctionDefinitionTestStructure<FunctionParameterDefinitionTestStructure, FunctionParameterStructureTestStructure> {
    isAsync?: boolean;
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    order?: number;
    hasOnWriteFunctionBody?: boolean;
}

export class FunctionDefinitionTestRunner implements TestRunner<FunctionDefinition, FunctionDefinitionTestStructure> {
    private BaseFunctionDefinitionTestRunner: TestRunner<BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure>, BaseFunctionDefinitionTestStructure<FunctionParameterDefinitionTestStructure, FunctionParameterStructureTestStructure>>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseFunctionDefinitionTestRunner: TestRunner<BaseFunctionDefinition<FunctionParameterDefinition, FunctionParameterStructure>, BaseFunctionDefinitionTestStructure<FunctionParameterDefinitionTestStructure, FunctionParameterStructureTestStructure>>) {
        this.BaseFunctionDefinitionTestRunner = BaseFunctionDefinitionTestRunner;
    }

    runTest(actual: FunctionDefinition, expected: FunctionDefinitionTestStructure) {
        this.assertions.describe("FunctionDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseFunctionDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("isAsync", () => {
                let actualValue = actual.isAsync;
                let expectedValue = expected.isAsync;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("hasOnWriteFunctionBody", () => {
                let actualValue = typeof actual.onWriteFunctionBody === "function";
                let expectedValue = expected.hasOnWriteFunctionBody || false;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface VariableDefinitionTestStructure extends BaseDefinitionTestStructure {
    declarationType?: VariableDeclarationType;
    name: string;
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    defaultExpression?: (null | ExpressionDefinitionTestStructure);
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    order?: number;
    type?: TypeDefinitionTestStructure;
    documentationComment?: string;
}

export class VariableDefinitionTestRunner implements TestRunner<VariableDefinition, VariableDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;
    private TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>, TypeDefinitionTestRunner: TestRunner<TypeDefinition, TypeDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
        this.TypeDefinitionTestRunner = TypeDefinitionTestRunner;
    }

    runTest(actual: VariableDefinition, expected: VariableDefinitionTestStructure) {
        this.assertions.describe("VariableDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("declarationType", () => {
                let actualValue = actual.declarationType;
                let expectedValue = expected.declarationType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = VariableDeclarationType.Let;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("defaultExpression", () => {
                let actualValue = actual.defaultExpression;
                let expectedValue = expected.defaultExpression;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("type", () => {
                let actualValue = actual.type;
                let expectedValue = expected.type;
                if (typeof expectedValue === "undefined") {
                    expectedValue = { text: "any" };
                }
                this.TypeDefinitionTestRunner.runTest(actualValue as any as TypeDefinition, expectedValue as any as TypeDefinitionTestStructure);
            });
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface NamespaceDefinitionTestStructure extends BaseDefinitionTestStructure {
    declarationType?: NamespaceDeclarationType;
    name: string;
    isAmbient?: boolean;
    hasDeclareKeyword?: boolean;
    isExported?: boolean;
    isNamedExportOfFile?: boolean;
    isDefaultExportOfFile?: boolean;
    namespaces?: NamespaceDefinitionTestStructure[];
    classes?: ClassDefinitionTestStructure[];
    interfaces?: InterfaceDefinitionTestStructure[];
    enums?: EnumDefinitionTestStructure[];
    functions?: FunctionDefinitionTestStructure[];
    variables?: VariableDefinitionTestStructure[];
    typeAliases?: TypeAliasDefinitionTestStructure[];
    order?: number;
    documentationComment?: string;
    exports?: { name: string; }[];
}

export class NamespaceDefinitionTestRunner implements TestRunner<NamespaceDefinition, NamespaceDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ClassDefinitionTestRunner: TestRunner<ClassDefinition, ClassDefinitionTestStructure>;
    private InterfaceDefinitionTestRunner: TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure>;
    private EnumDefinitionTestRunner: TestRunner<EnumDefinition, EnumDefinitionTestStructure>;
    private FunctionDefinitionTestRunner: TestRunner<FunctionDefinition, FunctionDefinitionTestStructure>;
    private VariableDefinitionTestRunner: TestRunner<VariableDefinition, VariableDefinitionTestStructure>;
    private TypeAliasDefinitionTestRunner: TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ClassDefinitionTestRunner: TestRunner<ClassDefinition, ClassDefinitionTestStructure>, InterfaceDefinitionTestRunner: TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure>, EnumDefinitionTestRunner: TestRunner<EnumDefinition, EnumDefinitionTestStructure>, FunctionDefinitionTestRunner: TestRunner<FunctionDefinition, FunctionDefinitionTestStructure>, VariableDefinitionTestRunner: TestRunner<VariableDefinition, VariableDefinitionTestStructure>, TypeAliasDefinitionTestRunner: TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ClassDefinitionTestRunner = ClassDefinitionTestRunner;
        this.InterfaceDefinitionTestRunner = InterfaceDefinitionTestRunner;
        this.EnumDefinitionTestRunner = EnumDefinitionTestRunner;
        this.FunctionDefinitionTestRunner = FunctionDefinitionTestRunner;
        this.VariableDefinitionTestRunner = VariableDefinitionTestRunner;
        this.TypeAliasDefinitionTestRunner = TypeAliasDefinitionTestRunner;
    }

    runTest(actual: NamespaceDefinition, expected: NamespaceDefinitionTestStructure) {
        this.assertions.describe("NamespaceDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("declarationType", () => {
                let actualValue = actual.declarationType;
                let expectedValue = expected.declarationType;
                if (typeof expectedValue === "undefined") {
                    expectedValue = NamespaceDeclarationType.Namespace;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isAmbient", () => {
                let actualValue = actual.isAmbient;
                let expectedValue = expected.isAmbient;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("hasDeclareKeyword", () => {
                let actualValue = actual.hasDeclareKeyword;
                let expectedValue = expected.hasDeclareKeyword;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isExported", () => {
                let actualValue = actual.isExported;
                let expectedValue = expected.isExported;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isNamedExportOfFile", () => {
                let actualValue = actual.isNamedExportOfFile;
                let expectedValue = expected.isNamedExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("isDefaultExportOfFile", () => {
                let actualValue = actual.isDefaultExportOfFile;
                let expectedValue = expected.isDefaultExportOfFile;
                if (typeof expectedValue === "undefined") {
                    expectedValue = false;
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("namespaces", () => {
                let actualValue = actual.namespaces;
                let expectedValue = expected.namespaces;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.runTest(actualValue as any as NamespaceDefinition, expectedValue as any as NamespaceDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("classes", () => {
                let actualValue = actual.classes;
                let expectedValue = expected.classes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassDefinitionTestRunner.runTest(actualValue as any as ClassDefinition, expectedValue as any as ClassDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("interfaces", () => {
                let actualValue = actual.interfaces;
                let expectedValue = expected.interfaces;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.InterfaceDefinitionTestRunner.runTest(actualValue as any as InterfaceDefinition, expectedValue as any as InterfaceDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("enums", () => {
                let actualValue = actual.enums;
                let expectedValue = expected.enums;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.EnumDefinitionTestRunner.runTest(actualValue as any as EnumDefinition, expectedValue as any as EnumDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("functions", () => {
                let actualValue = actual.functions;
                let expectedValue = expected.functions;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.FunctionDefinitionTestRunner.runTest(actualValue as any as FunctionDefinition, expectedValue as any as FunctionDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("variables", () => {
                let actualValue = actual.variables;
                let expectedValue = expected.variables;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.VariableDefinitionTestRunner.runTest(actualValue as any as VariableDefinition, expectedValue as any as VariableDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("typeAliases", () => {
                let actualValue = actual.typeAliases;
                let expectedValue = expected.typeAliases;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeAliasDefinitionTestRunner.runTest(actualValue as any as TypeAliasDefinition, expectedValue as any as TypeAliasDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            if (typeof expected.order !== "undefined") {
                this.assertions.describe("order", () => {
                    let actualValue = actual.order;
                    let expectedValue = expected.order;
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualValue, expectedValue);
                    });
                });
            }
            this.assertions.describe("documentationComment", () => {
                let actualValue = actual.documentationComment;
                let expectedValue = expected.documentationComment;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("#getExports()", () => {
                let actualExports = actual.getExports();
                let expectedExports = expected.exports!;
                for (let i = 0; i < actualExports.length; i++) {
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualExports[i].name, expectedExports[i].name);
                    });
                }
            });
        });
    }
}

export interface ModuledDefinitionTestStructure {
    namespaces?: NamespaceDefinitionTestStructure[];
    classes?: ClassDefinitionTestStructure[];
    interfaces?: InterfaceDefinitionTestStructure[];
    enums?: EnumDefinitionTestStructure[];
    functions?: FunctionDefinitionTestStructure[];
    variables?: VariableDefinitionTestStructure[];
    typeAliases?: TypeAliasDefinitionTestStructure[];
}

export class ModuledDefinitionTestRunner implements TestRunner<ModuledDefinition, ModuledDefinitionTestStructure> {
    private NamespaceDefinitionTestRunner: TestRunner<NamespaceDefinition, NamespaceDefinitionTestStructure>;
    private ClassDefinitionTestRunner: TestRunner<ClassDefinition, ClassDefinitionTestStructure>;
    private InterfaceDefinitionTestRunner: TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure>;
    private EnumDefinitionTestRunner: TestRunner<EnumDefinition, EnumDefinitionTestStructure>;
    private FunctionDefinitionTestRunner: TestRunner<FunctionDefinition, FunctionDefinitionTestStructure>;
    private VariableDefinitionTestRunner: TestRunner<VariableDefinition, VariableDefinitionTestStructure>;
    private TypeAliasDefinitionTestRunner: TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(NamespaceDefinitionTestRunner: TestRunner<NamespaceDefinition, NamespaceDefinitionTestStructure>, ClassDefinitionTestRunner: TestRunner<ClassDefinition, ClassDefinitionTestStructure>, InterfaceDefinitionTestRunner: TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure>, EnumDefinitionTestRunner: TestRunner<EnumDefinition, EnumDefinitionTestStructure>, FunctionDefinitionTestRunner: TestRunner<FunctionDefinition, FunctionDefinitionTestStructure>, VariableDefinitionTestRunner: TestRunner<VariableDefinition, VariableDefinitionTestStructure>, TypeAliasDefinitionTestRunner: TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure>) {
        this.NamespaceDefinitionTestRunner = NamespaceDefinitionTestRunner;
        this.ClassDefinitionTestRunner = ClassDefinitionTestRunner;
        this.InterfaceDefinitionTestRunner = InterfaceDefinitionTestRunner;
        this.EnumDefinitionTestRunner = EnumDefinitionTestRunner;
        this.FunctionDefinitionTestRunner = FunctionDefinitionTestRunner;
        this.VariableDefinitionTestRunner = VariableDefinitionTestRunner;
        this.TypeAliasDefinitionTestRunner = TypeAliasDefinitionTestRunner;
    }

    runTest(actual: ModuledDefinition, expected: ModuledDefinitionTestStructure) {
        this.assertions.describe("ModuledDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("namespaces", () => {
                let actualValue = actual.namespaces;
                let expectedValue = expected.namespaces;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.NamespaceDefinitionTestRunner.runTest(actualValue as any as NamespaceDefinition, expectedValue as any as NamespaceDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("classes", () => {
                let actualValue = actual.classes;
                let expectedValue = expected.classes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassDefinitionTestRunner.runTest(actualValue as any as ClassDefinition, expectedValue as any as ClassDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("interfaces", () => {
                let actualValue = actual.interfaces;
                let expectedValue = expected.interfaces;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.InterfaceDefinitionTestRunner.runTest(actualValue as any as InterfaceDefinition, expectedValue as any as InterfaceDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("enums", () => {
                let actualValue = actual.enums;
                let expectedValue = expected.enums;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.EnumDefinitionTestRunner.runTest(actualValue as any as EnumDefinition, expectedValue as any as EnumDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("functions", () => {
                let actualValue = actual.functions;
                let expectedValue = expected.functions;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.FunctionDefinitionTestRunner.runTest(actualValue as any as FunctionDefinition, expectedValue as any as FunctionDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("variables", () => {
                let actualValue = actual.variables;
                let expectedValue = expected.variables;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.VariableDefinitionTestRunner.runTest(actualValue as any as VariableDefinition, expectedValue as any as VariableDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("typeAliases", () => {
                let actualValue = actual.typeAliases;
                let expectedValue = expected.typeAliases;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeAliasDefinitionTestRunner.runTest(actualValue as any as TypeAliasDefinition, expectedValue as any as TypeAliasDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface StarImportPartDefinitionTestStructure extends BaseDefinitionTestStructure {
    expression?: (null | ExpressionDefinitionTestStructure);
    name: string;
    definitions?: { name: string; type?: any; }[];
}

export class StarImportPartDefinitionTestRunner implements TestRunner<StarImportPartDefinition, StarImportPartDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: StarImportPartDefinition, expected: StarImportPartDefinitionTestStructure) {
        this.assertions.describe("StarImportPartDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            if (typeof expected.expression !== "undefined") {
                this.assertions.describe("expression", () => {
                    let actualValue = actual.expression;
                    let expectedValue = expected.expression;
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as null, expectedValue as null);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                            })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                        });
                    });
                });
            }
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (expected.definitions != null) {
                this.assertions.describe("#definitions", () => {
                    let actualDefinitions = actual.definitions;
                    let expectedDefinitions = expected.definitions!;
                    for (let i = 0; i < actualDefinitions.length; i++) {
                        this.assertions.it("should have the same value", () => {
                            this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);
                        });
                        if (expectedDefinitions[i].type != null) {
                            this.assertions.it("should be an instance of the correct type", () => {
                                this.assertions.strictEqual(actualDefinitions[i] instanceof expectedDefinitions[i].type, true);
                            });
                        }
                    }
                });
            }
        });
    }
}

export interface NamedImportPartDefinitionTestStructure extends BaseDefinitionTestStructure {
    expression?: (null | ExpressionDefinitionTestStructure);
    alias?: (null | string);
    name: string;
    definitions?: { name: string; type?: any; }[];
}

export class NamedImportPartDefinitionTestRunner implements TestRunner<NamedImportPartDefinition, NamedImportPartDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: NamedImportPartDefinition, expected: NamedImportPartDefinitionTestStructure) {
        this.assertions.describe("NamedImportPartDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            if (typeof expected.expression !== "undefined") {
                this.assertions.describe("expression", () => {
                    let actualValue = actual.expression;
                    let expectedValue = expected.expression;
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as null, expectedValue as null);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                            })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                        });
                    });
                });
            }
            this.assertions.describe("alias", () => {
                let actualValue = actual.alias;
                let expectedValue = expected.alias;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as string, expectedValue as string);
                    });
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (expected.definitions != null) {
                this.assertions.describe("#definitions", () => {
                    let actualDefinitions = actual.definitions;
                    let expectedDefinitions = expected.definitions!;
                    for (let i = 0; i < actualDefinitions.length; i++) {
                        this.assertions.it("should have the same value", () => {
                            this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);
                        });
                        if (expectedDefinitions[i].type != null) {
                            this.assertions.it("should be an instance of the correct type", () => {
                                this.assertions.strictEqual(actualDefinitions[i] instanceof expectedDefinitions[i].type, true);
                            });
                        }
                    }
                });
            }
        });
    }
}

export interface ReExportDefinitionTestStructure extends BaseDefinitionTestStructure {
    fileName?: string;
    moduleSpecifier: string;
    starExports?: StarImportPartDefinitionTestStructure[];
    namedExports?: NamedImportPartDefinitionTestStructure[];
}

export class ReExportDefinitionTestRunner implements TestRunner<ReExportDefinition, ReExportDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private StarImportPartDefinitionTestRunner: TestRunner<StarImportPartDefinition, StarImportPartDefinitionTestStructure>;
    private NamedImportPartDefinitionTestRunner: TestRunner<NamedImportPartDefinition, NamedImportPartDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, StarImportPartDefinitionTestRunner: TestRunner<StarImportPartDefinition, StarImportPartDefinitionTestStructure>, NamedImportPartDefinitionTestRunner: TestRunner<NamedImportPartDefinition, NamedImportPartDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.StarImportPartDefinitionTestRunner = StarImportPartDefinitionTestRunner;
        this.NamedImportPartDefinitionTestRunner = NamedImportPartDefinitionTestRunner;
    }

    runTest(actual: ReExportDefinition, expected: ReExportDefinitionTestStructure) {
        this.assertions.describe("ReExportDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("fileName", () => {
                let actualValue = actual.fileName;
                let expectedValue = expected.fileName;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue.substr(actualValue.length - expectedValue!.length), expectedValue)
                });
            });
            this.assertions.describe("moduleSpecifier", () => {
                let actualValue = actual.moduleSpecifier;
                let expectedValue = expected.moduleSpecifier;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("starExports", () => {
                let actualValue = actual.starExports;
                let expectedValue = expected.starExports;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.StarImportPartDefinitionTestRunner.runTest(actualValue as any as StarImportPartDefinition, expectedValue as any as StarImportPartDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("namedExports", () => {
                let actualValue = actual.namedExports;
                let expectedValue = expected.namedExports;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.NamedImportPartDefinitionTestRunner.runTest(actualValue as any as NamedImportPartDefinition, expectedValue as any as NamedImportPartDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface DefaultImportPartDefinitionTestStructure extends BaseDefinitionTestStructure {
    expression?: (null | ExpressionDefinitionTestStructure);
    name: string;
    definitions?: { name: string; type?: any; }[];
}

export class DefaultImportPartDefinitionTestRunner implements TestRunner<DefaultImportPartDefinition, DefaultImportPartDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
    }

    runTest(actual: DefaultImportPartDefinition, expected: DefaultImportPartDefinitionTestStructure) {
        this.assertions.describe("DefaultImportPartDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("expression", () => {
                let actualValue = actual.expression;
                let expectedValue = expected.expression;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            if (expected.definitions != null) {
                this.assertions.describe("#definitions", () => {
                    let actualDefinitions = actual.definitions;
                    let expectedDefinitions = expected.definitions!;
                    for (let i = 0; i < actualDefinitions.length; i++) {
                        this.assertions.it("should have the same value", () => {
                            this.assertions.strictEqual(actualDefinitions[i].name, expectedDefinitions[i].name);
                        });
                        if (expectedDefinitions[i].type != null) {
                            this.assertions.it("should be an instance of the correct type", () => {
                                this.assertions.strictEqual(actualDefinitions[i] instanceof expectedDefinitions[i].type, true);
                            });
                        }
                    }
                });
            }
        });
    }
}

export interface ImportDefinitionTestStructure extends BaseDefinitionTestStructure {
    fileName?: string;
    moduleSpecifier: string;
    starImportName?: (null | string);
    defaultImport?: (null | DefaultImportPartDefinitionTestStructure);
    namedImports?: NamedImportPartDefinitionTestStructure[];
    starImports?: StarImportPartDefinitionTestStructure[];
}

export class ImportDefinitionTestRunner implements TestRunner<ImportDefinition, ImportDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private DefaultImportPartDefinitionTestRunner: TestRunner<DefaultImportPartDefinition, DefaultImportPartDefinitionTestStructure>;
    private NamedImportPartDefinitionTestRunner: TestRunner<NamedImportPartDefinition, NamedImportPartDefinitionTestStructure>;
    private StarImportPartDefinitionTestRunner: TestRunner<StarImportPartDefinition, StarImportPartDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, DefaultImportPartDefinitionTestRunner: TestRunner<DefaultImportPartDefinition, DefaultImportPartDefinitionTestStructure>, NamedImportPartDefinitionTestRunner: TestRunner<NamedImportPartDefinition, NamedImportPartDefinitionTestStructure>, StarImportPartDefinitionTestRunner: TestRunner<StarImportPartDefinition, StarImportPartDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.DefaultImportPartDefinitionTestRunner = DefaultImportPartDefinitionTestRunner;
        this.NamedImportPartDefinitionTestRunner = NamedImportPartDefinitionTestRunner;
        this.StarImportPartDefinitionTestRunner = StarImportPartDefinitionTestRunner;
    }

    runTest(actual: ImportDefinition, expected: ImportDefinitionTestStructure) {
        this.assertions.describe("ImportDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("fileName", () => {
                let actualValue = actual.fileName;
                let expectedValue = expected.fileName;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue.substr(actualValue.length - expectedValue!.length), expectedValue)
                });
            });
            this.assertions.describe("moduleSpecifier", () => {
                let actualValue = actual.moduleSpecifier;
                let expectedValue = expected.moduleSpecifier;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
            this.assertions.describe("starImportName", () => {
                let actualValue = actual.starImportName;
                let expectedValue = expected.starImportName;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as string, expectedValue as string);
                    });
                });
            });
            this.assertions.describe("defaultImport", () => {
                let actualValue = actual.defaultImport;
                let expectedValue = expected.defaultImport;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.DefaultImportPartDefinitionTestRunner.runTest(actualValue as any as DefaultImportPartDefinition, expectedValue as any as DefaultImportPartDefinitionTestStructure);
                        })(actualValue as DefaultImportPartDefinition, expectedValue as DefaultImportPartDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("namedImports", () => {
                let actualValue = actual.namedImports;
                let expectedValue = expected.namedImports;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.NamedImportPartDefinitionTestRunner.runTest(actualValue as any as NamedImportPartDefinition, expectedValue as any as NamedImportPartDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("starImports", () => {
                let actualValue = actual.starImports;
                let expectedValue = expected.starImports;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.StarImportPartDefinitionTestRunner.runTest(actualValue as any as StarImportPartDefinition, expectedValue as any as StarImportPartDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface FileDefinitionTestStructure extends BaseDefinitionTestStructure {
    fileName?: string;
    imports?: ImportDefinitionTestStructure[];
    reExports?: ReExportDefinitionTestStructure[];
    defaultExportExpression?: (null | ExpressionDefinitionTestStructure);
    namespaces?: NamespaceDefinitionTestStructure[];
    classes?: ClassDefinitionTestStructure[];
    interfaces?: InterfaceDefinitionTestStructure[];
    enums?: EnumDefinitionTestStructure[];
    functions?: FunctionDefinitionTestStructure[];
    variables?: VariableDefinitionTestStructure[];
    typeAliases?: TypeAliasDefinitionTestStructure[];
    exports?: { name: string; }[];
}

export class FileDefinitionTestRunner implements TestRunner<FileDefinition, FileDefinitionTestStructure> {
    private BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>;
    private ImportDefinitionTestRunner: TestRunner<ImportDefinition, ImportDefinitionTestStructure>;
    private ReExportDefinitionTestRunner: TestRunner<ReExportDefinition, ReExportDefinitionTestStructure>;
    private ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>;
    private NamespaceDefinitionTestRunner: TestRunner<NamespaceDefinition, NamespaceDefinitionTestStructure>;
    private ClassDefinitionTestRunner: TestRunner<ClassDefinition, ClassDefinitionTestStructure>;
    private InterfaceDefinitionTestRunner: TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure>;
    private EnumDefinitionTestRunner: TestRunner<EnumDefinition, EnumDefinitionTestStructure>;
    private FunctionDefinitionTestRunner: TestRunner<FunctionDefinition, FunctionDefinitionTestStructure>;
    private VariableDefinitionTestRunner: TestRunner<VariableDefinition, VariableDefinitionTestStructure>;
    private TypeAliasDefinitionTestRunner: TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseDefinitionTestRunner: TestRunner<BaseDefinition, BaseDefinitionTestStructure>, ImportDefinitionTestRunner: TestRunner<ImportDefinition, ImportDefinitionTestStructure>, ReExportDefinitionTestRunner: TestRunner<ReExportDefinition, ReExportDefinitionTestStructure>, ExpressionDefinitionTestRunner: TestRunner<ExpressionDefinition, ExpressionDefinitionTestStructure>, NamespaceDefinitionTestRunner: TestRunner<NamespaceDefinition, NamespaceDefinitionTestStructure>, ClassDefinitionTestRunner: TestRunner<ClassDefinition, ClassDefinitionTestStructure>, InterfaceDefinitionTestRunner: TestRunner<InterfaceDefinition, InterfaceDefinitionTestStructure>, EnumDefinitionTestRunner: TestRunner<EnumDefinition, EnumDefinitionTestStructure>, FunctionDefinitionTestRunner: TestRunner<FunctionDefinition, FunctionDefinitionTestStructure>, VariableDefinitionTestRunner: TestRunner<VariableDefinition, VariableDefinitionTestStructure>, TypeAliasDefinitionTestRunner: TestRunner<TypeAliasDefinition, TypeAliasDefinitionTestStructure>) {
        this.BaseDefinitionTestRunner = BaseDefinitionTestRunner;
        this.ImportDefinitionTestRunner = ImportDefinitionTestRunner;
        this.ReExportDefinitionTestRunner = ReExportDefinitionTestRunner;
        this.ExpressionDefinitionTestRunner = ExpressionDefinitionTestRunner;
        this.NamespaceDefinitionTestRunner = NamespaceDefinitionTestRunner;
        this.ClassDefinitionTestRunner = ClassDefinitionTestRunner;
        this.InterfaceDefinitionTestRunner = InterfaceDefinitionTestRunner;
        this.EnumDefinitionTestRunner = EnumDefinitionTestRunner;
        this.FunctionDefinitionTestRunner = FunctionDefinitionTestRunner;
        this.VariableDefinitionTestRunner = VariableDefinitionTestRunner;
        this.TypeAliasDefinitionTestRunner = TypeAliasDefinitionTestRunner;
    }

    runTest(actual: FileDefinition, expected: FileDefinitionTestStructure) {
        this.assertions.describe("FileDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseDefinitionTestRunner.runTest(actual, expected);
            this.assertions.describe("fileName", () => {
                let actualValue = actual.fileName;
                let expectedValue = expected.fileName;
                if (typeof expectedValue === "undefined") {
                    expectedValue = "";
                }
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue.substr(actualValue.length - expectedValue!.length), expectedValue)
                });
            });
            this.assertions.describe("imports", () => {
                let actualValue = actual.imports;
                let expectedValue = expected.imports;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ImportDefinitionTestRunner.runTest(actualValue as any as ImportDefinition, expectedValue as any as ImportDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("reExports", () => {
                let actualValue = actual.reExports;
                let expectedValue = expected.reExports;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ReExportDefinitionTestRunner.runTest(actualValue as any as ReExportDefinition, expectedValue as any as ReExportDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("defaultExportExpression", () => {
                let actualValue = actual.defaultExportExpression;
                let expectedValue = expected.defaultExportExpression;
                if (typeof expectedValue === "undefined") {
                    expectedValue = null;
                }
                this.assertions.it("should equal one of the union types", () => {
                    this.assertions.assertAny(() => {
                        ((actualValue, expectedValue) => {
                            this.assertions.it("should have the same value", () => {
                                this.assertions.strictEqual(actualValue, expectedValue);
                            });
                        })(actualValue as null, expectedValue as null);
                    }, () => {
                        ((actualValue, expectedValue) => {
                            this.ExpressionDefinitionTestRunner.runTest(actualValue as any as ExpressionDefinition, expectedValue as any as ExpressionDefinitionTestStructure);
                        })(actualValue as ExpressionDefinition, expectedValue as ExpressionDefinitionTestStructure);
                    });
                });
            });
            this.assertions.describe("namespaces", () => {
                let actualValue = actual.namespaces;
                let expectedValue = expected.namespaces;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.NamespaceDefinitionTestRunner.runTest(actualValue as any as NamespaceDefinition, expectedValue as any as NamespaceDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("classes", () => {
                let actualValue = actual.classes;
                let expectedValue = expected.classes;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.ClassDefinitionTestRunner.runTest(actualValue as any as ClassDefinition, expectedValue as any as ClassDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("interfaces", () => {
                let actualValue = actual.interfaces;
                let expectedValue = expected.interfaces;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.InterfaceDefinitionTestRunner.runTest(actualValue as any as InterfaceDefinition, expectedValue as any as InterfaceDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("enums", () => {
                let actualValue = actual.enums;
                let expectedValue = expected.enums;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.EnumDefinitionTestRunner.runTest(actualValue as any as EnumDefinition, expectedValue as any as EnumDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("functions", () => {
                let actualValue = actual.functions;
                let expectedValue = expected.functions;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.FunctionDefinitionTestRunner.runTest(actualValue as any as FunctionDefinition, expectedValue as any as FunctionDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("variables", () => {
                let actualValue = actual.variables;
                let expectedValue = expected.variables;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.VariableDefinitionTestRunner.runTest(actualValue as any as VariableDefinition, expectedValue as any as VariableDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("typeAliases", () => {
                let actualValue = actual.typeAliases;
                let expectedValue = expected.typeAliases;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.TypeAliasDefinitionTestRunner.runTest(actualValue as any as TypeAliasDefinition, expectedValue as any as TypeAliasDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
            this.assertions.describe("#getExports()", () => {
                let actualExports = actual.getExports();
                let expectedExports = expected.exports!;
                for (let i = 0; i < actualExports.length; i++) {
                    this.assertions.it("should have the same value", () => {
                        this.assertions.strictEqual(actualExports[i].name, expectedExports[i].name);
                    });
                }
            });
        });
    }
}

export interface GlobalDefinitionTestStructure {
    files?: FileDefinitionTestStructure[];
}

export class GlobalDefinitionTestRunner implements TestRunner<GlobalDefinition, GlobalDefinitionTestStructure> {
    private FileDefinitionTestRunner: TestRunner<FileDefinition, FileDefinitionTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(FileDefinitionTestRunner: TestRunner<FileDefinition, FileDefinitionTestStructure>) {
        this.FileDefinitionTestRunner = FileDefinitionTestRunner;
    }

    runTest(actual: GlobalDefinition, expected: GlobalDefinitionTestStructure) {
        this.assertions.describe("GlobalDefinition", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("files", () => {
                let actualValue = actual.files;
                let expectedValue = expected.files;
                if (typeof expectedValue === "undefined") {
                    expectedValue = [];
                }
                this.assertions.it("should have the same length", () => {
                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                });
                for (let i = 0; i < (expectedValue || []).length; i++) {
                    ((actualValue, expectedValue, i) => {
                        this.assertions.describe(`index ${i}`, () => {
                            this.FileDefinitionTestRunner.runTest(actualValue as any as FileDefinition, expectedValue as any as FileDefinitionTestStructure);
                        });
                    })(actualValue[i], expectedValue![i], i);
                }
            });
        });
    }
}

export interface InterfaceMethodParameterStructureTestStructure extends BaseParameterStructureTestStructure {
}

export class InterfaceMethodParameterStructureTestRunner implements TestRunner<InterfaceMethodParameterStructure, InterfaceMethodParameterStructureTestStructure> {
    private BaseParameterStructureTestRunner: TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterStructureTestRunner: TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure>) {
        this.BaseParameterStructureTestRunner = BaseParameterStructureTestRunner;
    }

    runTest(actual: InterfaceMethodParameterStructure, expected: InterfaceMethodParameterStructureTestStructure) {
        this.assertions.describe("InterfaceMethodParameterStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface ClassMethodParameterStructureTestStructure extends BaseClassMethodParameterStructureTestStructure {
}

export class ClassMethodParameterStructureTestRunner implements TestRunner<ClassMethodParameterStructure, ClassMethodParameterStructureTestStructure> {
    private BaseClassMethodParameterStructureTestRunner: TestRunner<BaseClassMethodParameterStructure, BaseClassMethodParameterStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassMethodParameterStructureTestRunner: TestRunner<BaseClassMethodParameterStructure, BaseClassMethodParameterStructureTestStructure>) {
        this.BaseClassMethodParameterStructureTestRunner = BaseClassMethodParameterStructureTestRunner;
    }

    runTest(actual: ClassMethodParameterStructure, expected: ClassMethodParameterStructureTestStructure) {
        this.assertions.describe("ClassMethodParameterStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassMethodParameterStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface ClassStaticMethodParameterStructureTestStructure extends BaseClassMethodParameterStructureTestStructure {
}

export class ClassStaticMethodParameterStructureTestRunner implements TestRunner<ClassStaticMethodParameterStructure, ClassStaticMethodParameterStructureTestStructure> {
    private BaseClassMethodParameterStructureTestRunner: TestRunner<BaseClassMethodParameterStructure, BaseClassMethodParameterStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseClassMethodParameterStructureTestRunner: TestRunner<BaseClassMethodParameterStructure, BaseClassMethodParameterStructureTestStructure>) {
        this.BaseClassMethodParameterStructureTestRunner = BaseClassMethodParameterStructureTestRunner;
    }

    runTest(actual: ClassStaticMethodParameterStructure, expected: ClassStaticMethodParameterStructureTestStructure) {
        this.assertions.describe("ClassStaticMethodParameterStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseClassMethodParameterStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface FunctionParameterStructureTestStructure extends BaseParameterStructureTestStructure {
}

export class FunctionParameterStructureTestRunner implements TestRunner<FunctionParameterStructure, FunctionParameterStructureTestStructure> {
    private BaseParameterStructureTestRunner: TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterStructureTestRunner: TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure>) {
        this.BaseParameterStructureTestRunner = BaseParameterStructureTestRunner;
    }

    runTest(actual: FunctionParameterStructure, expected: FunctionParameterStructureTestStructure) {
        this.assertions.describe("FunctionParameterStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface BaseParameterStructureTestStructure extends BaseStructureTestStructure, OptionallyNamedStructureTestStructure, OptionalStructureTestStructure, TypedStructureTestStructure, DefaultExpressionedStructureTestStructure {
    isRestParameter?: (undefined | true | false);
    destructuringProperties?: (undefined | ObjectPropertyStructureTestStructure[]);
}

export class BaseParameterStructureTestRunner implements TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure> {
    private BaseStructureTestRunner: TestRunner<BaseStructure, BaseStructureTestStructure>;
    private OptionallyNamedStructureTestRunner: TestRunner<OptionallyNamedStructure, OptionallyNamedStructureTestStructure>;
    private OptionalStructureTestRunner: TestRunner<OptionalStructure, OptionalStructureTestStructure>;
    private TypedStructureTestRunner: TestRunner<TypedStructure, TypedStructureTestStructure>;
    private DefaultExpressionedStructureTestRunner: TestRunner<DefaultExpressionedStructure, DefaultExpressionedStructureTestStructure>;
    private ObjectPropertyStructureTestRunner: TestRunner<ObjectPropertyStructure, ObjectPropertyStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseStructureTestRunner: TestRunner<BaseStructure, BaseStructureTestStructure>, OptionallyNamedStructureTestRunner: TestRunner<OptionallyNamedStructure, OptionallyNamedStructureTestStructure>, OptionalStructureTestRunner: TestRunner<OptionalStructure, OptionalStructureTestStructure>, TypedStructureTestRunner: TestRunner<TypedStructure, TypedStructureTestStructure>, DefaultExpressionedStructureTestRunner: TestRunner<DefaultExpressionedStructure, DefaultExpressionedStructureTestStructure>, ObjectPropertyStructureTestRunner: TestRunner<ObjectPropertyStructure, ObjectPropertyStructureTestStructure>) {
        this.BaseStructureTestRunner = BaseStructureTestRunner;
        this.OptionallyNamedStructureTestRunner = OptionallyNamedStructureTestRunner;
        this.OptionalStructureTestRunner = OptionalStructureTestRunner;
        this.TypedStructureTestRunner = TypedStructureTestRunner;
        this.DefaultExpressionedStructureTestRunner = DefaultExpressionedStructureTestRunner;
        this.ObjectPropertyStructureTestRunner = ObjectPropertyStructureTestRunner;
    }

    runTest(actual: BaseParameterStructure, expected: BaseParameterStructureTestStructure) {
        this.assertions.describe("BaseParameterStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseStructureTestRunner.runTest(actual, expected);
            this.OptionallyNamedStructureTestRunner.runTest(actual, expected);
            this.OptionalStructureTestRunner.runTest(actual, expected);
            this.TypedStructureTestRunner.runTest(actual, expected);
            this.DefaultExpressionedStructureTestRunner.runTest(actual, expected);
            this.assertions.describe("isRestParameter", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.isRestParameter, undefined);
                    });
                }, () => {
                    let actualValue = actual.isRestParameter;
                    let expectedValue = expected.isRestParameter;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = false;
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as true, expectedValue as true);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as false, expectedValue as false);
                        });
                    });
                });
            });
            this.assertions.describe("destructuringProperties", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.destructuringProperties, undefined);
                    });
                }, () => {
                    let actualValue = actual.destructuringProperties;
                    let expectedValue = expected.destructuringProperties;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = [];
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same length", () => {
                                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                                });
                                for (let i = 0; i < (expectedValue || []).length; i++) {
                                    ((actualValue, expectedValue, i) => {
                                        this.assertions.describe(`index ${i}`, () => {
                                            this.ObjectPropertyStructureTestRunner.runTest(actualValue as any as ObjectPropertyStructure, expectedValue as any as ObjectPropertyStructureTestStructure);
                                        });
                                    })(actualValue[i], expectedValue![i], i);
                                }
                            })(actualValue as ObjectPropertyStructure[], expectedValue as ObjectPropertyStructureTestStructure[]);
                        });
                    });
                });
            });
        });
    }
}

export interface BaseClassMethodParameterStructureTestStructure extends BaseParameterStructureTestStructure, DecoratableStructureTestStructure {
}

export class BaseClassMethodParameterStructureTestRunner implements TestRunner<BaseClassMethodParameterStructure, BaseClassMethodParameterStructureTestStructure> {
    private BaseParameterStructureTestRunner: TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure>;
    private DecoratableStructureTestRunner: TestRunner<DecoratableStructure, DecoratableStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseParameterStructureTestRunner: TestRunner<BaseParameterStructure, BaseParameterStructureTestStructure>, DecoratableStructureTestRunner: TestRunner<DecoratableStructure, DecoratableStructureTestStructure>) {
        this.BaseParameterStructureTestRunner = BaseParameterStructureTestRunner;
        this.DecoratableStructureTestRunner = DecoratableStructureTestRunner;
    }

    runTest(actual: BaseClassMethodParameterStructure, expected: BaseClassMethodParameterStructureTestStructure) {
        this.assertions.describe("BaseClassMethodParameterStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseParameterStructureTestRunner.runTest(actual, expected);
            this.DecoratableStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface ObjectPropertyStructureTestStructure extends BaseObjectPropertyStructureTestStructure {
}

export class ObjectPropertyStructureTestRunner implements TestRunner<ObjectPropertyStructure, ObjectPropertyStructureTestStructure> {
    private BaseObjectPropertyStructureTestRunner: TestRunner<BaseObjectPropertyStructure, BaseObjectPropertyStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseObjectPropertyStructureTestRunner: TestRunner<BaseObjectPropertyStructure, BaseObjectPropertyStructureTestStructure>) {
        this.BaseObjectPropertyStructureTestRunner = BaseObjectPropertyStructureTestRunner;
    }

    runTest(actual: ObjectPropertyStructure, expected: ObjectPropertyStructureTestStructure) {
        this.assertions.describe("ObjectPropertyStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseObjectPropertyStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface BaseStructureTestStructure {
}

export class BaseStructureTestRunner implements TestRunner<BaseStructure, BaseStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: BaseStructure, expected: BaseStructureTestStructure) {
        this.assertions.describe("BaseStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
        });
    }
}

export interface OptionallyNamedStructureTestStructure {
    name?: (undefined | string);
}

export class OptionallyNamedStructureTestRunner implements TestRunner<OptionallyNamedStructure, OptionallyNamedStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: OptionallyNamedStructure, expected: OptionallyNamedStructureTestStructure) {
        this.assertions.describe("OptionallyNamedStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("name", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.name, undefined);
                    });
                }, () => {
                    let actualValue = actual.name;
                    let expectedValue = expected.name;
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as string, expectedValue as string);
                        });
                    });
                });
            });
        });
    }
}

export interface OptionalStructureTestStructure {
    isOptional?: (undefined | true | false);
}

export class OptionalStructureTestRunner implements TestRunner<OptionalStructure, OptionalStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: OptionalStructure, expected: OptionalStructureTestStructure) {
        this.assertions.describe("OptionalStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isOptional", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.isOptional, undefined);
                    });
                }, () => {
                    let actualValue = actual.isOptional;
                    let expectedValue = expected.isOptional;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = false;
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as true, expectedValue as true);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as false, expectedValue as false);
                        });
                    });
                });
            });
        });
    }
}

export interface TypedStructureTestStructure {
    type?: (undefined | string);
}

export class TypedStructureTestRunner implements TestRunner<TypedStructure, TypedStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: TypedStructure, expected: TypedStructureTestStructure) {
        this.assertions.describe("TypedStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("type", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.type, undefined);
                    });
                }, () => {
                    let actualValue = actual.type;
                    let expectedValue = expected.type;
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as string, expectedValue as string);
                        });
                    });
                });
            });
        });
    }
}

export interface DefaultExpressionedStructureTestStructure {
    defaultExpression?: (undefined | string);
}

export class DefaultExpressionedStructureTestRunner implements TestRunner<DefaultExpressionedStructure, DefaultExpressionedStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: DefaultExpressionedStructure, expected: DefaultExpressionedStructureTestStructure) {
        this.assertions.describe("DefaultExpressionedStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("defaultExpression", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.defaultExpression, undefined);
                    });
                }, () => {
                    let actualValue = actual.defaultExpression;
                    let expectedValue = expected.defaultExpression;
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as string, expectedValue as string);
                        });
                    });
                });
            });
        });
    }
}

export interface DecoratableStructureTestStructure {
    decorators?: (undefined | DecoratorStructureTestStructure[]);
}

export class DecoratableStructureTestRunner implements TestRunner<DecoratableStructure, DecoratableStructureTestStructure> {
    private DecoratorStructureTestRunner: TestRunner<DecoratorStructure, DecoratorStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(DecoratorStructureTestRunner: TestRunner<DecoratorStructure, DecoratorStructureTestStructure>) {
        this.DecoratorStructureTestRunner = DecoratorStructureTestRunner;
    }

    runTest(actual: DecoratableStructure, expected: DecoratableStructureTestStructure) {
        this.assertions.describe("DecoratableStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("decorators", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.decorators, undefined);
                    });
                }, () => {
                    let actualValue = actual.decorators;
                    let expectedValue = expected.decorators;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = [];
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same length", () => {
                                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                                });
                                for (let i = 0; i < (expectedValue || []).length; i++) {
                                    ((actualValue, expectedValue, i) => {
                                        this.assertions.describe(`index ${i}`, () => {
                                            this.DecoratorStructureTestRunner.runTest(actualValue as any as DecoratorStructure, expectedValue as any as DecoratorStructureTestStructure);
                                        });
                                    })(actualValue[i], expectedValue![i], i);
                                }
                            })(actualValue as DecoratorStructure[], expectedValue as DecoratorStructureTestStructure[]);
                        });
                    });
                });
            });
        });
    }
}

export interface BaseObjectPropertyStructureTestStructure extends BasePropertyStructureTestStructure, DefaultExpressionedStructureTestStructure {
}

export class BaseObjectPropertyStructureTestRunner implements TestRunner<BaseObjectPropertyStructure, BaseObjectPropertyStructureTestStructure> {
    private BasePropertyStructureTestRunner: TestRunner<BasePropertyStructure, BasePropertyStructureTestStructure>;
    private DefaultExpressionedStructureTestRunner: TestRunner<DefaultExpressionedStructure, DefaultExpressionedStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BasePropertyStructureTestRunner: TestRunner<BasePropertyStructure, BasePropertyStructureTestStructure>, DefaultExpressionedStructureTestRunner: TestRunner<DefaultExpressionedStructure, DefaultExpressionedStructureTestStructure>) {
        this.BasePropertyStructureTestRunner = BasePropertyStructureTestRunner;
        this.DefaultExpressionedStructureTestRunner = DefaultExpressionedStructureTestRunner;
    }

    runTest(actual: BaseObjectPropertyStructure, expected: BaseObjectPropertyStructureTestStructure) {
        this.assertions.describe("BaseObjectPropertyStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BasePropertyStructureTestRunner.runTest(actual, expected);
            this.DefaultExpressionedStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface DecoratorStructureTestStructure extends BaseStructureTestStructure, NamedStructureTestStructure {
    arguments?: (undefined | string[]);
    isDecoratorFactory?: (undefined | true | false);
}

export class DecoratorStructureTestRunner implements TestRunner<DecoratorStructure, DecoratorStructureTestStructure> {
    private BaseStructureTestRunner: TestRunner<BaseStructure, BaseStructureTestStructure>;
    private NamedStructureTestRunner: TestRunner<NamedStructure, NamedStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseStructureTestRunner: TestRunner<BaseStructure, BaseStructureTestStructure>, NamedStructureTestRunner: TestRunner<NamedStructure, NamedStructureTestStructure>) {
        this.BaseStructureTestRunner = BaseStructureTestRunner;
        this.NamedStructureTestRunner = NamedStructureTestRunner;
    }

    runTest(actual: DecoratorStructure, expected: DecoratorStructureTestStructure) {
        this.assertions.describe("DecoratorStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseStructureTestRunner.runTest(actual, expected);
            this.NamedStructureTestRunner.runTest(actual, expected);
            this.assertions.describe("arguments", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.arguments, undefined);
                    });
                }, () => {
                    let actualValue = actual.arguments;
                    let expectedValue = expected.arguments;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = [];
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same length", () => {
                                    this.assertions.strictEqual(actualValue!.length, expectedValue!.length);
                                });
                                for (let i = 0; i < (expectedValue || []).length; i++) {
                                    ((actualValue, expectedValue, i) => {
                                        this.assertions.describe(`index ${i}`, () => {
                                            this.assertions.it("should have the same value", () => {
                                                this.assertions.strictEqual(actualValue, expectedValue);
                                            });
                                        });
                                    })(actualValue[i], expectedValue![i], i);
                                }
                            })(actualValue as string[], expectedValue as string[]);
                        });
                    });
                });
            });
            this.assertions.describe("isDecoratorFactory", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.isDecoratorFactory, undefined);
                    });
                }, () => {
                    let actualValue = actual.isDecoratorFactory;
                    let expectedValue = expected.isDecoratorFactory;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = false;
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as true, expectedValue as true);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as false, expectedValue as false);
                        });
                    });
                });
            });
        });
    }
}

export interface BasePropertyStructureTestStructure extends BaseStructureTestStructure, NamedStructureTestStructure, OptionalStructureTestStructure, TypedStructureTestStructure, ReadonlyableStructureTestStructure {
}

export class BasePropertyStructureTestRunner implements TestRunner<BasePropertyStructure, BasePropertyStructureTestStructure> {
    private BaseStructureTestRunner: TestRunner<BaseStructure, BaseStructureTestStructure>;
    private NamedStructureTestRunner: TestRunner<NamedStructure, NamedStructureTestStructure>;
    private OptionalStructureTestRunner: TestRunner<OptionalStructure, OptionalStructureTestStructure>;
    private TypedStructureTestRunner: TestRunner<TypedStructure, TypedStructureTestStructure>;
    private ReadonlyableStructureTestRunner: TestRunner<ReadonlyableStructure, ReadonlyableStructureTestStructure>;

    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize(BaseStructureTestRunner: TestRunner<BaseStructure, BaseStructureTestStructure>, NamedStructureTestRunner: TestRunner<NamedStructure, NamedStructureTestStructure>, OptionalStructureTestRunner: TestRunner<OptionalStructure, OptionalStructureTestStructure>, TypedStructureTestRunner: TestRunner<TypedStructure, TypedStructureTestStructure>, ReadonlyableStructureTestRunner: TestRunner<ReadonlyableStructure, ReadonlyableStructureTestStructure>) {
        this.BaseStructureTestRunner = BaseStructureTestRunner;
        this.NamedStructureTestRunner = NamedStructureTestRunner;
        this.OptionalStructureTestRunner = OptionalStructureTestRunner;
        this.TypedStructureTestRunner = TypedStructureTestRunner;
        this.ReadonlyableStructureTestRunner = ReadonlyableStructureTestRunner;
    }

    runTest(actual: BasePropertyStructure, expected: BasePropertyStructureTestStructure) {
        this.assertions.describe("BasePropertyStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.BaseStructureTestRunner.runTest(actual, expected);
            this.NamedStructureTestRunner.runTest(actual, expected);
            this.OptionalStructureTestRunner.runTest(actual, expected);
            this.TypedStructureTestRunner.runTest(actual, expected);
            this.ReadonlyableStructureTestRunner.runTest(actual, expected);
        });
    }
}

export interface NamedStructureTestStructure {
    name: string;
}

export class NamedStructureTestRunner implements TestRunner<NamedStructure, NamedStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: NamedStructure, expected: NamedStructureTestStructure) {
        this.assertions.describe("NamedStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("name", () => {
                let actualValue = actual.name;
                let expectedValue = expected.name;
                this.assertions.it("should have the same value", () => {
                    this.assertions.strictEqual(actualValue, expectedValue);
                });
            });
        });
    }
}

export interface ReadonlyableStructureTestStructure {
    isReadonly?: (undefined | true | false);
}

export class ReadonlyableStructureTestRunner implements TestRunner<ReadonlyableStructure, ReadonlyableStructureTestStructure> {
    constructor(private readonly assertions: WrapperAssertions) {
    }

    initialize() {
    }

    runTest(actual: ReadonlyableStructure, expected: ReadonlyableStructureTestStructure) {
        this.assertions.describe("ReadonlyableStructure", () => {
            if (this.assertions.isNull(actual, expected)) return;
            this.assertions.describe("isReadonly", () => {
                this.assertions.assertAny(() => {
                    this.assertions.it("should be undefined", () => {
                        this.assertions.strictEqual(actual.isReadonly, undefined);
                    });
                }, () => {
                    let actualValue = actual.isReadonly;
                    let expectedValue = expected.isReadonly;
                    if (typeof expectedValue === "undefined") {
                        expectedValue = false;
                    }
                    this.assertions.it("should equal one of the union types", () => {
                        this.assertions.assertAny(() => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as undefined, expectedValue as undefined);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as true, expectedValue as true);
                        }, () => {
                            ((actualValue, expectedValue) => {
                                this.assertions.it("should have the same value", () => {
                                    this.assertions.strictEqual(actualValue, expectedValue);
                                });
                            })(actualValue as false, expectedValue as false);
                        });
                    });
                });
            });
        });
    }
}

export function runBaseDefinitionTests(actual: BaseDefinition, expected: BaseDefinitionTestStructure) {
    new TestRunnerFactory().getBaseDefinitionTestRunner().runTest(actual, expected);
}

export function runFunctionBodyWriteableDefinitionTests(actual: FunctionBodyWriteableDefinition, expected: FunctionBodyWriteableDefinitionTestStructure) {
    new TestRunnerFactory().getFunctionBodyWriteableDefinitionTestRunner().runTest(actual, expected);
}

export function runNamedDefinitionTests(actual: NamedDefinition, expected: NamedDefinitionTestStructure) {
    new TestRunnerFactory().getNamedDefinitionTestRunner().runTest(actual, expected);
}

export function runOptionallyNamedDefinitionTests(actual: OptionallyNamedDefinition, expected: OptionallyNamedDefinitionTestStructure) {
    new TestRunnerFactory().getOptionallyNamedDefinitionTestRunner().runTest(actual, expected);
}

export function runOrderableDefinitionTests(actual: OrderableDefinition, expected: OrderableDefinitionTestStructure) {
    new TestRunnerFactory().getOrderableDefinitionTestRunner().runTest(actual, expected);
}

export function runOptionalDefinitionTests(actual: OptionalDefinition, expected: OptionalDefinitionTestStructure) {
    new TestRunnerFactory().getOptionalDefinitionTestRunner().runTest(actual, expected);
}

export function runAbstractableDefinitionTests(actual: AbstractableDefinition, expected: AbstractableDefinitionTestStructure) {
    new TestRunnerFactory().getAbstractableDefinitionTestRunner().runTest(actual, expected);
}

export function runAmbientableDefinitionTests(actual: AmbientableDefinition, expected: AmbientableDefinitionTestStructure) {
    new TestRunnerFactory().getAmbientableDefinitionTestRunner().runTest(actual, expected);
}

export function runAsyncableDefinitionTests(actual: AsyncableDefinition, expected: AsyncableDefinitionTestStructure) {
    new TestRunnerFactory().getAsyncableDefinitionTestRunner().runTest(actual, expected);
}

export function runDocumentationedDefinitionTests(actual: DocumentationedDefinition, expected: DocumentationedDefinitionTestStructure) {
    new TestRunnerFactory().getDocumentationedDefinitionTestRunner().runTest(actual, expected);
}

export function runBaseExpressionDefinitionTests(actual: BaseExpressionDefinition, expected: BaseExpressionDefinitionTestStructure) {
    new TestRunnerFactory().getBaseExpressionDefinitionTestRunner().runTest(actual, expected);
}

export function runCallSignatureParameterDefinitionTests(actual: CallSignatureParameterDefinition, expected: CallSignatureParameterDefinitionTestStructure) {
    new TestRunnerFactory().getCallSignatureParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runCallSignatureDefinitionTests(actual: CallSignatureDefinition, expected: CallSignatureDefinitionTestStructure) {
    new TestRunnerFactory().getCallSignatureDefinitionTestRunner().runTest(actual, expected);
}

export function runIndexSignatureDefinitionTests(actual: IndexSignatureDefinition, expected: IndexSignatureDefinitionTestStructure) {
    new TestRunnerFactory().getIndexSignatureDefinitionTestRunner().runTest(actual, expected);
}

export function runTypeParameterDefinitionTests(actual: TypeParameterDefinition, expected: TypeParameterDefinitionTestStructure) {
    new TestRunnerFactory().getTypeParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runReadonlyableDefinitionTests(actual: ReadonlyableDefinition, expected: ReadonlyableDefinitionTestStructure) {
    new TestRunnerFactory().getReadonlyableDefinitionTestRunner().runTest(actual, expected);
}

export function runTypedDefinitionTests(actual: TypedDefinition, expected: TypedDefinitionTestStructure) {
    new TestRunnerFactory().getTypedDefinitionTestRunner().runTest(actual, expected);
}

export function runBasePropertyDefinitionTests(actual: BasePropertyDefinition, expected: BasePropertyDefinitionTestStructure) {
    new TestRunnerFactory().getBasePropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runTypePropertyDefinitionTests(actual: TypePropertyDefinition, expected: TypePropertyDefinitionTestStructure) {
    new TestRunnerFactory().getTypePropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runTypeParameteredDefinitionTests(actual: TypeParameteredDefinition, expected: TypeParameteredDefinitionTestStructure) {
    new TestRunnerFactory().getTypeParameteredDefinitionTestRunner().runTest(actual, expected);
}

export function runExportableDefinitionTests(actual: ExportableDefinition, expected: ExportableDefinitionTestStructure) {
    new TestRunnerFactory().getExportableDefinitionTestRunner().runTest(actual, expected);
}

export function runTypeAliasDefinitionTests(actual: TypeAliasDefinition, expected: TypeAliasDefinitionTestStructure) {
    new TestRunnerFactory().getTypeAliasDefinitionTestRunner().runTest(actual, expected);
}

export function runDecoratorDefinitionTests(actual: DecoratorDefinition, expected: DecoratorDefinitionTestStructure) {
    new TestRunnerFactory().getDecoratorDefinitionTestRunner().runTest(actual, expected);
}

export function runObjectPropertyDefinitionTests(actual: ObjectPropertyDefinition, expected: ObjectPropertyDefinitionTestStructure) {
    new TestRunnerFactory().getObjectPropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runTypeFunctionParameterDefinitionTests(actual: TypeFunctionParameterDefinition, expected: TypeFunctionParameterDefinitionTestStructure) {
    new TestRunnerFactory().getTypeFunctionParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runTypeNodeDefinitionTests(actual: TypeNodeDefinition, expected: TypeNodeDefinitionTestStructure) {
    new TestRunnerFactory().getTypeNodeDefinitionTestRunner().runTest(actual, expected);
}

export function runTypeDefinitionTests(actual: TypeDefinition, expected: TypeDefinitionTestStructure) {
    new TestRunnerFactory().getTypeDefinitionTestRunner().runTest(actual, expected);
}

export function runUserDefinedTypeGuardDefinitionTests(actual: UserDefinedTypeGuardDefinition, expected: UserDefinedTypeGuardDefinitionTestStructure) {
    new TestRunnerFactory().getUserDefinedTypeGuardDefinitionTestRunner().runTest(actual, expected);
}

export function runBaseTypeDefinitionTests(actual: BaseTypeDefinition, expected: BaseTypeDefinitionTestStructure) {
    new TestRunnerFactory().getBaseTypeDefinitionTestRunner().runTest(actual, expected);
}

export function runExpressionDefinitionTests(actual: ExpressionDefinition, expected: ExpressionDefinitionTestStructure) {
    new TestRunnerFactory().getExpressionDefinitionTestRunner().runTest(actual, expected);
}

export function runThisTypedDefinitionTests(actual: ThisTypedDefinition, expected: ThisTypedDefinitionTestStructure) {
    new TestRunnerFactory().getThisTypedDefinitionTestRunner().runTest(actual, expected);
}

export function runDefaultExpressionedDefinitionTests(actual: DefaultExpressionedDefinition, expected: DefaultExpressionedDefinitionTestStructure) {
    new TestRunnerFactory().getDefaultExpressionedDefinitionTestRunner().runTest(actual, expected);
}

export function runDecoratableDefinitionTests(actual: DecoratableDefinition, expected: DecoratableDefinitionTestStructure) {
    new TestRunnerFactory().getDecoratableDefinitionTestRunner().runTest(actual, expected);
}

export function runBaseObjectPropertyDefinitionTests(actual: BaseObjectPropertyDefinition, expected: BaseObjectPropertyDefinitionTestStructure) {
    new TestRunnerFactory().getBaseObjectPropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runBaseParameterDefinitionTests(actual: BaseParameterDefinition, expected: BaseParameterDefinitionTestStructure) {
    new TestRunnerFactory().getBaseParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runReturnTypedDefinitionTests(actual: ReturnTypedDefinition, expected: ReturnTypedDefinitionTestStructure) {
    new TestRunnerFactory().getReturnTypedDefinitionTestRunner().runTest(actual, expected);
}

export function runOverloadSignaturedDefinitionTests(actual: OverloadSignaturedDefinition, expected: OverloadSignaturedDefinitionTestStructure) {
    new TestRunnerFactory().getOverloadSignaturedDefinitionTestRunner().runTest(actual, expected);
}

export function runEnumMemberDefinitionTests(actual: EnumMemberDefinition, expected: EnumMemberDefinitionTestStructure) {
    new TestRunnerFactory().getEnumMemberDefinitionTestRunner().runTest(actual, expected);
}

export function runEnumDefinitionTests(actual: EnumDefinition, expected: EnumDefinitionTestStructure) {
    new TestRunnerFactory().getEnumDefinitionTestRunner().runTest(actual, expected);
}

export function runScopedDefinitionTests(actual: ScopedDefinition, expected: ScopedDefinitionTestStructure) {
    new TestRunnerFactory().getScopedDefinitionTestRunner().runTest(actual, expected);
}

export function runBaseClassMethodParameterDefinitionTests(actual: BaseClassMethodParameterDefinition, expected: BaseClassMethodParameterDefinitionTestStructure) {
    new TestRunnerFactory().getBaseClassMethodParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runBaseClassPropertyDefinitionTests(actual: BaseClassPropertyDefinition, expected: BaseClassPropertyDefinitionTestStructure) {
    new TestRunnerFactory().getBaseClassPropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runInterfaceMethodParameterDefinitionTests(actual: InterfaceMethodParameterDefinition, expected: InterfaceMethodParameterDefinitionTestStructure) {
    new TestRunnerFactory().getInterfaceMethodParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runInterfaceMethodDefinitionTests(actual: InterfaceMethodDefinition, expected: InterfaceMethodDefinitionTestStructure) {
    new TestRunnerFactory().getInterfaceMethodDefinitionTestRunner().runTest(actual, expected);
}

export function runInterfacePropertyDefinitionTests(actual: InterfacePropertyDefinition, expected: InterfacePropertyDefinitionTestStructure) {
    new TestRunnerFactory().getInterfacePropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runInterfaceDefinitionTests(actual: InterfaceDefinition, expected: InterfaceDefinitionTestStructure) {
    new TestRunnerFactory().getInterfaceDefinitionTestRunner().runTest(actual, expected);
}

export function runClassConstructorParameterDefinitionTests(actual: ClassConstructorParameterDefinition, expected: ClassConstructorParameterDefinitionTestStructure) {
    new TestRunnerFactory().getClassConstructorParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runClassConstructorDefinitionTests(actual: ClassConstructorDefinition, expected: ClassConstructorDefinitionTestStructure) {
    new TestRunnerFactory().getClassConstructorDefinitionTestRunner().runTest(actual, expected);
}

export function runClassMethodParameterDefinitionTests(actual: ClassMethodParameterDefinition, expected: ClassMethodParameterDefinitionTestStructure) {
    new TestRunnerFactory().getClassMethodParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runClassMethodDefinitionTests(actual: ClassMethodDefinition, expected: ClassMethodDefinitionTestStructure) {
    new TestRunnerFactory().getClassMethodDefinitionTestRunner().runTest(actual, expected);
}

export function runClassPropertyDefinitionTests(actual: ClassPropertyDefinition, expected: ClassPropertyDefinitionTestStructure) {
    new TestRunnerFactory().getClassPropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runClassStaticMethodParameterDefinitionTests(actual: ClassStaticMethodParameterDefinition, expected: ClassStaticMethodParameterDefinitionTestStructure) {
    new TestRunnerFactory().getClassStaticMethodParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runClassStaticMethodDefinitionTests(actual: ClassStaticMethodDefinition, expected: ClassStaticMethodDefinitionTestStructure) {
    new TestRunnerFactory().getClassStaticMethodDefinitionTestRunner().runTest(actual, expected);
}

export function runClassStaticPropertyDefinitionTests(actual: ClassStaticPropertyDefinition, expected: ClassStaticPropertyDefinitionTestStructure) {
    new TestRunnerFactory().getClassStaticPropertyDefinitionTestRunner().runTest(actual, expected);
}

export function runClassDefinitionTests(actual: ClassDefinition, expected: ClassDefinitionTestStructure) {
    new TestRunnerFactory().getClassDefinitionTestRunner().runTest(actual, expected);
}

export function runFunctionParameterDefinitionTests(actual: FunctionParameterDefinition, expected: FunctionParameterDefinitionTestStructure) {
    new TestRunnerFactory().getFunctionParameterDefinitionTestRunner().runTest(actual, expected);
}

export function runFunctionDefinitionTests(actual: FunctionDefinition, expected: FunctionDefinitionTestStructure) {
    new TestRunnerFactory().getFunctionDefinitionTestRunner().runTest(actual, expected);
}

export function runVariableDefinitionTests(actual: VariableDefinition, expected: VariableDefinitionTestStructure) {
    new TestRunnerFactory().getVariableDefinitionTestRunner().runTest(actual, expected);
}

export function runNamespaceDefinitionTests(actual: NamespaceDefinition, expected: NamespaceDefinitionTestStructure) {
    new TestRunnerFactory().getNamespaceDefinitionTestRunner().runTest(actual, expected);
}

export function runModuledDefinitionTests(actual: ModuledDefinition, expected: ModuledDefinitionTestStructure) {
    new TestRunnerFactory().getModuledDefinitionTestRunner().runTest(actual, expected);
}

export function runStarImportPartDefinitionTests(actual: StarImportPartDefinition, expected: StarImportPartDefinitionTestStructure) {
    new TestRunnerFactory().getStarImportPartDefinitionTestRunner().runTest(actual, expected);
}

export function runNamedImportPartDefinitionTests(actual: NamedImportPartDefinition, expected: NamedImportPartDefinitionTestStructure) {
    new TestRunnerFactory().getNamedImportPartDefinitionTestRunner().runTest(actual, expected);
}

export function runReExportDefinitionTests(actual: ReExportDefinition, expected: ReExportDefinitionTestStructure) {
    new TestRunnerFactory().getReExportDefinitionTestRunner().runTest(actual, expected);
}

export function runDefaultImportPartDefinitionTests(actual: DefaultImportPartDefinition, expected: DefaultImportPartDefinitionTestStructure) {
    new TestRunnerFactory().getDefaultImportPartDefinitionTestRunner().runTest(actual, expected);
}

export function runImportDefinitionTests(actual: ImportDefinition, expected: ImportDefinitionTestStructure) {
    new TestRunnerFactory().getImportDefinitionTestRunner().runTest(actual, expected);
}

export function runFileDefinitionTests(actual: FileDefinition, expected: FileDefinitionTestStructure) {
    new TestRunnerFactory().getFileDefinitionTestRunner().runTest(actual, expected);
}

export function runGlobalDefinitionTests(actual: GlobalDefinition, expected: GlobalDefinitionTestStructure) {
    new TestRunnerFactory().getGlobalDefinitionTestRunner().runTest(actual, expected);
}

export function runInterfaceMethodParameterStructureTests(actual: InterfaceMethodParameterStructure, expected: InterfaceMethodParameterStructureTestStructure) {
    new TestRunnerFactory().getInterfaceMethodParameterStructureTestRunner().runTest(actual, expected);
}

export function runClassMethodParameterStructureTests(actual: ClassMethodParameterStructure, expected: ClassMethodParameterStructureTestStructure) {
    new TestRunnerFactory().getClassMethodParameterStructureTestRunner().runTest(actual, expected);
}

export function runClassStaticMethodParameterStructureTests(actual: ClassStaticMethodParameterStructure, expected: ClassStaticMethodParameterStructureTestStructure) {
    new TestRunnerFactory().getClassStaticMethodParameterStructureTestRunner().runTest(actual, expected);
}

export function runFunctionParameterStructureTests(actual: FunctionParameterStructure, expected: FunctionParameterStructureTestStructure) {
    new TestRunnerFactory().getFunctionParameterStructureTestRunner().runTest(actual, expected);
}

export function runBaseParameterStructureTests(actual: BaseParameterStructure, expected: BaseParameterStructureTestStructure) {
    new TestRunnerFactory().getBaseParameterStructureTestRunner().runTest(actual, expected);
}

export function runBaseClassMethodParameterStructureTests(actual: BaseClassMethodParameterStructure, expected: BaseClassMethodParameterStructureTestStructure) {
    new TestRunnerFactory().getBaseClassMethodParameterStructureTestRunner().runTest(actual, expected);
}

export function runObjectPropertyStructureTests(actual: ObjectPropertyStructure, expected: ObjectPropertyStructureTestStructure) {
    new TestRunnerFactory().getObjectPropertyStructureTestRunner().runTest(actual, expected);
}

export function runBaseStructureTests(actual: BaseStructure, expected: BaseStructureTestStructure) {
    new TestRunnerFactory().getBaseStructureTestRunner().runTest(actual, expected);
}

export function runOptionallyNamedStructureTests(actual: OptionallyNamedStructure, expected: OptionallyNamedStructureTestStructure) {
    new TestRunnerFactory().getOptionallyNamedStructureTestRunner().runTest(actual, expected);
}

export function runOptionalStructureTests(actual: OptionalStructure, expected: OptionalStructureTestStructure) {
    new TestRunnerFactory().getOptionalStructureTestRunner().runTest(actual, expected);
}

export function runTypedStructureTests(actual: TypedStructure, expected: TypedStructureTestStructure) {
    new TestRunnerFactory().getTypedStructureTestRunner().runTest(actual, expected);
}

export function runDefaultExpressionedStructureTests(actual: DefaultExpressionedStructure, expected: DefaultExpressionedStructureTestStructure) {
    new TestRunnerFactory().getDefaultExpressionedStructureTestRunner().runTest(actual, expected);
}

export function runDecoratableStructureTests(actual: DecoratableStructure, expected: DecoratableStructureTestStructure) {
    new TestRunnerFactory().getDecoratableStructureTestRunner().runTest(actual, expected);
}

export function runBaseObjectPropertyStructureTests(actual: BaseObjectPropertyStructure, expected: BaseObjectPropertyStructureTestStructure) {
    new TestRunnerFactory().getBaseObjectPropertyStructureTestRunner().runTest(actual, expected);
}

export function runDecoratorStructureTests(actual: DecoratorStructure, expected: DecoratorStructureTestStructure) {
    new TestRunnerFactory().getDecoratorStructureTestRunner().runTest(actual, expected);
}

export function runBasePropertyStructureTests(actual: BasePropertyStructure, expected: BasePropertyStructureTestStructure) {
    new TestRunnerFactory().getBasePropertyStructureTestRunner().runTest(actual, expected);
}

export function runNamedStructureTests(actual: NamedStructure, expected: NamedStructureTestStructure) {
    new TestRunnerFactory().getNamedStructureTestRunner().runTest(actual, expected);
}

export function runReadonlyableStructureTests(actual: ReadonlyableStructure, expected: ReadonlyableStructureTestStructure) {
    new TestRunnerFactory().getReadonlyableStructureTestRunner().runTest(actual, expected);
}
