[**react-forms-store v1.0.0**](../README.md)

***

[react-forms-store](../README.md) / FileField

# Class: FileField

Defined in: [packages/react-forms-store/src/fields/FileField.tsx:5](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/FileField.tsx#L5)

## Extends

- [`Field`](Field.md)\<`File` \| `undefined`\>

## Constructors

### new FileField()

> **new FileField**(`options`): [`FileField`](FileField.md)

Defined in: [packages/react-forms-store/src/fields/FileField.tsx:6](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/FileField.tsx#L6)

#### Parameters

##### options

`FileFieldOptions`

#### Returns

[`FileField`](FileField.md)

#### Overrides

[`Field`](Field.md).[`constructor`](Field.md#constructors)

## Properties

### defaultValue

> `readonly` **defaultValue**: `undefined` \| `File`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:31](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L31)

#### Inherited from

[`Field`](Field.md).[`defaultValue`](Field.md#defaultvalue)

***

### dirty

> **dirty**: `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:28](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L28)

#### Inherited from

[`Field`](Field.md).[`dirty`](Field.md#dirty)

***

### disabled

> **disabled**: `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:27](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L27)

#### Inherited from

[`Field`](Field.md).[`disabled`](Field.md#disabled)

***

### form?

> `optional` **form**: [`Form`](Form.md)\<`any`\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:43](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L43)

#### Inherited from

[`Field`](Field.md).[`form`](Field.md#form)

***

### helpText?

> `readonly` `optional` **helpText**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:36](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L36)

#### Inherited from

[`Field`](Field.md).[`helpText`](Field.md#helptext)

***

### label

> `readonly` **label**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:34](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L34)

#### Inherited from

[`Field`](Field.md).[`label`](Field.md#label)

***

### name

> `readonly` **name**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:33](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L33)

#### Inherited from

[`Field`](Field.md).[`name`](Field.md#name)

***

### readonly

> `readonly` **readonly**: `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:39](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L39)

#### Inherited from

[`Field`](Field.md).[`readonly`](Field.md#readonly)

***

### required

> `readonly` **required**: `boolean` = `false`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:38](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L38)

#### Inherited from

[`Field`](Field.md).[`required`](Field.md#required)

***

### savedValue

> **savedValue**: `undefined` \| `File`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:30](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L30)

#### Inherited from

[`Field`](Field.md).[`savedValue`](Field.md#savedvalue)

***

### subscribers

> `readonly` **subscribers**: `Set`\<() => `void`\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:40](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L40)

#### Inherited from

[`Field`](Field.md).[`subscribers`](Field.md#subscribers)

***

### testId?

> `readonly` `optional` **testId**: `string`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:35](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L35)

#### Inherited from

[`Field`](Field.md).[`testId`](Field.md#testid)

***

### validator

> `readonly` **validator**: `Validator`\<[`Field`](Field.md)\<`undefined` \| `File`, [`Form`](Form.md)\<`any`\>\>\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:41](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L41)

#### Inherited from

[`Field`](Field.md).[`validator`](Field.md#validator)

## Accessors

### errors

#### Get Signature

> **get** **errors**(): `ValidationResult`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:82](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L82)

Gets the current validation errors of the field.

##### Returns

`ValidationResult`

The current validation errors of the field.

#### Inherited from

[`Field`](Field.md).[`errors`](Field.md#errors)

***

### value

#### Get Signature

> **get** **value**(): `v`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:74](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L74)

Gets the current value of the field.

##### Returns

`v`

The current value of the field.

#### Inherited from

[`Field`](Field.md).[`value`](Field.md#value)

## Methods

### dismissErrors()

> **dismissErrors**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:131](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L131)

Dismisses the current validation errors of the field.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`dismissErrors`](Field.md#dismisserrors)

***

### getValue()

> **getValue**(): `undefined` \| `File`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:124](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L124)

Gets the current value of the field.

#### Returns

`undefined` \| `File`

The current value of the field.

#### Inherited from

[`Field`](Field.md).[`getValue`](Field.md#getvalue)

***

### hasValue()

> **hasValue**(): `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:90](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L90)

Checks if the field has a value.

#### Returns

`boolean`

True if the field has a value, false otherwise.

#### Inherited from

[`Field`](Field.md).[`hasValue`](Field.md#hasvalue)

***

### isRequired()

> **isRequired**(): `boolean`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:98](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L98)

Checks if the field is required.

#### Returns

`boolean`

True if the field is required, false otherwise.

#### Inherited from

[`Field`](Field.md).[`isRequired`](Field.md#isrequired)

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

#### Inherited from

[`Field`](Field.md).[`raiseErrors`](Field.md#raiseerrors)

***

### reset()

> **reset**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:169](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L169)

Resets the field to its saved value.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`reset`](Field.md#reset)

***

### resetToDefaultValue()

> **resetToDefaultValue**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:178](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L178)

Resets the field to its default value.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`resetToDefaultValue`](Field.md#resettodefaultvalue)

***

### saveValue()

> **saveValue**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:105](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L105)

Saves the current value of the field.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`saveValue`](Field.md#savevalue)

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

#### Inherited from

[`Field`](Field.md).[`setDisabled`](Field.md#setdisabled)

***

### setValue()

> **setValue**(`value`): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:155](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L155)

Sets the value of the field.

#### Parameters

##### value

The value to set or a function to compute the new value.

`undefined` | `File` | (`curr`) => `undefined` \| `File`

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`setValue`](Field.md#setvalue)

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

#### Inherited from

[`Field`](Field.md).[`subscribe`](Field.md#subscribe)

***

### triggerSubscribers()

> **triggerSubscribers**(): `void`

Defined in: [packages/react-forms-store/src/fields/Field.tsx:197](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L197)

Triggers all subscriber callbacks.

#### Returns

`void`

#### Inherited from

[`Field`](Field.md).[`triggerSubscribers`](Field.md#triggersubscribers)

***

### validate()

> **validate**(): `Promise`\<`ValidationResult`\>

Defined in: [packages/react-forms-store/src/fields/Field.tsx:188](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/fields/Field.tsx#L188)

Validates the field.

#### Returns

`Promise`\<`ValidationResult`\>

The validation result.

#### Inherited from

[`Field`](Field.md).[`validate`](Field.md#validate)
