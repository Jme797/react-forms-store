[**react-forms-store v1.0.0**](../README.md)

***

[react-forms-store](../README.md) / Field

# Class: Field\<v, F\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:23](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L23)

## Extended by

- [`TextField`](TextField.md)
- [`NumberField`](NumberField.md)
- [`ChoiceField`](ChoiceField.md)
- [`MultipleChoiceField`](MultipleChoiceField.md)
- [`DateField`](DateField.md)
- [`FileField`](FileField.md)
- [`MultipleFileField`](MultipleFileField.md)
- [`ColorField`](ColorField.md)

## Type Parameters

• **v** = `any`

• **F** *extends* [`Form`](Form.md)\<`any`\> = [`Form`](Form.md)\<`any`\>

## Constructors

### new Field()

> **new Field**\<`v`, `F`\>(`__namedParameters`): [`Field`](Field.md)\<`v`, `F`\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:45](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L45)

#### Parameters

##### \_\_namedParameters

`Omit`\<[`FieldOptions`](../type-aliases/FieldOptions.md)\<`v`\>, `"initValue"`\> & `object`

#### Returns

[`Field`](Field.md)\<`v`, `F`\>

## Properties

### defaultValue

> `readonly` **defaultValue**: `v`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:31](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L31)

***

### dirty

> **dirty**: `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:28](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L28)

***

### disabled

> **disabled**: `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:27](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L27)

***

### form?

> `optional` **form**: `F`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:43](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L43)

***

### helpText?

> `readonly` `optional` **helpText**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:36](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L36)

***

### label

> `readonly` **label**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:34](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L34)

***

### name

> `readonly` **name**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:33](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L33)

***

### readonly

> `readonly` **readonly**: `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:39](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L39)

***

### required

> `readonly` **required**: `boolean` = `false`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:38](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L38)

***

### savedValue

> **savedValue**: `v`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:30](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L30)

***

### subscribers

> `readonly` **subscribers**: `Set`\<() => `void`\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:40](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L40)

***

### testId?

> `readonly` `optional` **testId**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:35](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L35)

***

### validator

> `readonly` **validator**: `Validator`\<[`Field`](Field.md)\<`v`, [`Form`](Form.md)\<`any`\>\>\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:41](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L41)

## Accessors

### errors

#### Get Signature

> **get** **errors**(): `ValidationResult`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:82](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L82)

Gets the current validation errors of the field.

##### Returns

`ValidationResult`

The current validation errors of the field.

***

### value

#### Get Signature

> **get** **value**(): `v`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:74](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L74)

Gets the current value of the field.

##### Returns

`v`

The current value of the field.

## Methods

### dismissErrors()

> **dismissErrors**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:131](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L131)

Dismisses the current validation errors of the field.

#### Returns

`void`

***

### getValue()

> **getValue**(): `v`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:124](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L124)

Gets the current value of the field.

#### Returns

`v`

The current value of the field.

***

### hasValue()

> **hasValue**(): `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:90](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L90)

Checks if the field has a value.

#### Returns

`boolean`

True if the field has a value, false otherwise.

***

### isRequired()

> **isRequired**(): `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:98](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L98)

Checks if the field is required.

#### Returns

`boolean`

True if the field is required, false otherwise.

***

### raiseErrors()

> **raiseErrors**(`errors`): `ValidationResult`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:141](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L141)

Raises validation errors for the field.

#### Parameters

##### errors

`string`[]

The validation errors to raise.

#### Returns

`ValidationResult`

The validation result with the raised errors.

***

### reset()

> **reset**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:169](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L169)

Resets the field to its saved value.

#### Returns

`void`

***

### resetToDefaultValue()

> **resetToDefaultValue**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:178](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L178)

Resets the field to its default value.

#### Returns

`void`

***

### saveValue()

> **saveValue**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:105](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L105)

Saves the current value of the field.

#### Returns

`void`

***

### setDisabled()

> **setDisabled**(`isDisabled`): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:115](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L115)

Sets the disabled state of the field.

#### Parameters

##### isDisabled

`boolean`

The disabled state to set.

#### Returns

`void`

***

### setValue()

> **setValue**(`value`): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:155](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L155)

Sets the value of the field.

#### Parameters

##### value

The value to set or a function to compute the new value.

`v` | (`curr`) => `v`

#### Returns

`void`

***

### subscribe()

> **subscribe**(`callback`): () => `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:206](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L206)

Subscribes a callback to be triggered on field updates.

#### Parameters

##### callback

() => `void`

The callback to subscribe.

#### Returns

`Function`

A function to unsubscribe the callback.

##### Returns

`void`

***

### triggerSubscribers()

> **triggerSubscribers**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:197](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L197)

Triggers all subscriber callbacks.

#### Returns

`void`

***

### validate()

> **validate**(): `Promise`\<`ValidationResult`\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:188](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L188)

Validates the field.

#### Returns

`Promise`\<`ValidationResult`\>

The validation result.
