[**react-forms-store v1.0.0**](../README.md)

***

[react-forms-store](../README.md) / Form

# Class: Form\<State\>

Defined in: [packages/react-forms-store/src/forms/Form.tsx:6](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L6)

## Type Parameters

• **State** *extends* [`DefaultFormState`](../type-aliases/DefaultFormState.md) = [`DefaultFormState`](../type-aliases/DefaultFormState.md)

## Constructors

### new Form()

> **new Form**\<`State`\>(`fields`): [`Form`](Form.md)\<`State`\>

Defined in: [packages/react-forms-store/src/forms/Form.tsx:13](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L13)

#### Parameters

##### fields

`State`

#### Returns

[`Form`](Form.md)\<`State`\>

## Properties

### errors

> **errors**: `ValidationResult`[] = `[]`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:9](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L9)

***

### fields

> **fields**: `State`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:7](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L7)

***

### formErrors

> **formErrors**: `string`[] = `[]`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:8](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L8)

***

### submitting

> **submitting**: `boolean` = `false`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:10](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L10)

***

### subscribers

> `readonly` **subscribers**: `Set`\<() => `void`\>

Defined in: [packages/react-forms-store/src/forms/Form.tsx:11](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L11)

## Methods

### formValid()

> **formValid**(): `Promise`\<`boolean`\>

Defined in: [packages/react-forms-store/src/forms/Form.tsx:69](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L69)

Validates all fields in the form.

#### Returns

`Promise`\<`boolean`\>

True if the form is valid, false otherwise.

***

### getData()

> **getData**(): \{ \[Key in string \| number \| symbol\]: State\[Key\]\["value"\] \}

Defined in: [packages/react-forms-store/src/forms/Form.tsx:91](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L91)

Retrieves the current values of all fields in the form.

#### Returns

\{ \[Key in string \| number \| symbol\]: State\[Key\]\["value"\] \}

An object containing the current values of all fields.

***

### isDirty()

> **isDirty**(): `boolean`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:40](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L40)

Checks if any field in the form is dirty.

#### Returns

`boolean`

True if any field is dirty, false otherwise.

***

### raiseErrors()

> **raiseErrors**(`param0`): `void`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:140](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L140)

Raises errors for the form and its fields.

#### Parameters

##### param0

An object containing field and form errors.

###### fieldErrors?

\{ \[Key in string \| number \| symbol\]: string\[\] \}

###### formErrors?

`string`[] = `[]`

#### Returns

`void`

***

### registerFields()

> **registerFields**(`fields`): `void`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:22](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L22)

Registers fields and sets their form reference.

#### Parameters

##### fields

`State`

The fields to register.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:106](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L106)

Resets all fields in the form to their initial values.

#### Returns

`void`

***

### saveState()

> **saveState**(): `void`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:49](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L49)

Saves the current state of all fields.

#### Returns

`void`

***

### submit()

> **submit**(`handleSubmit`): `Promise`\<`undefined` \| `false`\>

Defined in: [packages/react-forms-store/src/forms/Form.tsx:117](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L117)

Submits the form if it is valid.

#### Parameters

##### handleSubmit

(`data`) => `Promise`\<`void`\>

The function to handle form submission.

#### Returns

`Promise`\<`undefined` \| `false`\>

A promise that resolves when the form is submitted or false if the form is invalid.

***

### subscribe()

> **subscribe**(`callback`): () => `void`

Defined in: [packages/react-forms-store/src/forms/Form.tsx:60](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L60)

Subscribes a callback to be triggered on form updates.

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

Defined in: [packages/react-forms-store/src/forms/Form.tsx:32](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/Form.tsx#L32)

Triggers all subscriber callbacks.

#### Returns

`void`
