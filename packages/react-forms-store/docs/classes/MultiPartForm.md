[**react-forms-store v1.0.0**](../README.md)

***

[react-forms-store](../README.md) / MultiPartForm

# Class: MultiPartForm\<State\>

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:5](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L5)

## Type Parameters

• **State** *extends* [`MultiPartFormState`](../type-aliases/MultiPartFormState.md) = [`MultiPartFormState`](../type-aliases/MultiPartFormState.md)

## Constructors

### new MultiPartForm()

> **new MultiPartForm**\<`State`\>(`fields`): [`MultiPartForm`](MultiPartForm.md)\<`State`\>

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:14](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L14)

#### Parameters

##### fields

`State`

#### Returns

[`MultiPartForm`](MultiPartForm.md)\<`State`\>

## Properties

### currentStep

> **currentStep**: keyof `State`

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:8](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L8)

***

### forms

> **forms**: \{ \[K in string \| number \| symbol\]: Form\<State\[K\]\> \}

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:10](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L10)

***

### steps

> **steps**: keyof `State`[]

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:9](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L9)

## Methods

### getCurrentForm()

> **getCurrentForm**(): [`Form`](Form.md)\<`State`\[keyof `State`\]\>

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:68](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L68)

Retrieves the current form for the current step.

#### Returns

[`Form`](Form.md)\<`State`\[keyof `State`\]\>

The form for the current step.

***

### getData()

> **getData**(): `State`

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:105](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L105)

Retrieves the form data for all steps.

#### Returns

`State`

The form data for all steps.

***

### nextStep()

> **nextStep**(): `boolean`

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:38](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L38)

Moves to the next step in the form.

#### Returns

`boolean`

True if the step was changed, false otherwise.

***

### previousStep()

> **previousStep**(): `boolean`

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:53](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L53)

Moves to the previous step in the form.

#### Returns

`boolean`

True if the step was changed, false otherwise.

***

### setFormElement()

> **setFormElement**(`element`): `void`

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:30](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L30)

Sets the form element reference.

#### Parameters

##### element

The form element.

`null` | `HTMLFormElement`

#### Returns

`void`

***

### stepValid()

> **stepValid**(): `Promise`\<`boolean`\>

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:76](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L76)

Validates all fields in the current step.

#### Returns

`Promise`\<`boolean`\>

True if the current step is valid, false otherwise.

***

### submitStep()

> **submitStep**(`handleSubmit`): `Promise`\<`undefined` \| `false`\>

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:85](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L85)

Submits the form if the current step is valid.

#### Parameters

##### handleSubmit

(`data`) => `Promise`\<`void`\>

The function to handle form submission.

#### Returns

`Promise`\<`undefined` \| `false`\>

A promise that resolves when the form is submitted or false if the current step is invalid.

***

### subscribe()

> **subscribe**(`callback`): () => `void`

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:118](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L118)

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

Defined in: [packages/react-forms-store/src/forms/MultiPartForm.tsx:126](https://github.com/Jme797/react-forms-store/blob/bcf10e5e14284a3a1fb279250085af1b7f3948bb/packages/react-forms-store/src/forms/MultiPartForm.tsx#L126)

Triggers all subscriber callbacks.

#### Returns

`void`
