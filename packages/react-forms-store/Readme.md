# React Forms Store

The Form store is an excellent choice for React state management because it isolates field state updates to the level of each individual field, rather than triggering re-renders on the Form component itself. This approach ensures that the performance of the application remains optimal, as only the components that need to update will do so. Additionally, it maintains the accessibility of all form data within the Form component, providing a centralized and efficient way to manage and validate form inputs without unnecessary re-renders.

## Installation

To install the React Forms Store package, use the following command:

```bash
npm install react-forms-store
```

# Basic example (Form)

This example demonstrates how to create a basic form using the `Form` class.

```typescript
import { Form, NumberField, TextField } from 'react-forms-store';

const form = new Form({
    fields: {
        name: new TextField({ label: 'Name', required: true }),
        age: new NumberField({ label: 'Age', required: true, min: 0 }),
    },
});

form.setValue('name', 'John Doe');
form.setValue('age', 30);

form.submit(async data => {
    console.log('Form submitted successfully:', data);
});
````

# Subscribing to field state in a Field component

Here is a util hook that you can use to subscribe to state changes in the fields using react
Not included to avoid the dependency on React in this package.

```typescript
# React <18
import {useSyncExternalStore} from 'use-sync-external-store/shim';

# React >= 18
import {useSyncExternalStore} from 'react';

import {Field} from 'react-forms-store';

type UseFieldResult<T extends Field> = {
    value: T['value'];
    errors: string[];
    hasErrors: boolean;
};

const useField = <T extends Field>(field: T): UseFieldResult<T> => {
    const value = useSyncExternalStore(field.subscribe, () => field.value);
    const errors = useSyncExternalStore(field.subscribe, () => field.errors);

    const errorMessages = errors.errors?.map(error => error.msg) || [];

    return {
        value,
        errors: errorMessages,
        hasErrors: errorMessages.length > 0,
    };
};

export default useField;

```

# React Form Example using `useField` and `useSyncExternalStore`

This example demonstrates how to use a basic field in React with the `useField` hook and the `useSyncExternalStore` hook.

## Creating a Field component (TextField example)

```typescript
import React from 'react';
import { useField } from './your-utils';
import { useSyncExternalStore } from 'react';

const TextFieldComponent = ({ field }: { field: TextField }) => {
    const { value, hasErrors, errors } = useField();

    const handleChange = (e: React.ChangeEvent) => {
        field.setValue(e.target.value);
    };

    return (
        <>
            <label htmlFor={field.name}>
                {field.label}
            </label>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                id={field.name}
            />
        </>
    );
};
```

## Using the custom field type (TextField example)

```typescript
const FormComponent = () => {
    const form = new Form({
        textInput: new TextField({
            label: 'Text field',
        }),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ...existing code...
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextFieldComponent field={form.fields.textInput} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

# Complex example (MultiPartForm)

This example demonstrates how to create a multi-part form using the `MultiPartForm` class interface.

```typescript
import {FileField, Form, MultiPartForm, TextField} from 'react-forms-store';

const personalInfoForm = new Form({
    fields: {
        firstName: new TextField({label: 'First Name', required: true}),
        lastName: new TextField({label: 'Last Name', required: true}),
    },
});

const contactInfoForm = new Form({
    fields: {
        email: new TextField({label: 'Email', required: true}),
        phone: new TextField({label: 'Phone', required: true}),
    },
});

const documentForm = new Form({
    fields: {
        resume: new FileField({label: 'Resume', required: true}),
    },
});

const multiPartForm = new MultiPartForm({
    forms: {
        personalInfo: personalInfoForm,
        contactInfo: contactInfoForm,
        documents: documentForm,
    },
});

personalInfoForm.setValue('firstName', 'John');
personalInfoForm.setValue('lastName', 'Doe');
contactInfoForm.setValue('email', 'john.doe@example.com');
contactInfoForm.setValue('phone', '1234567890');
documentForm.setValue(
    'resume',
    new File(['content'], 'resume.pdf', {type: 'application/pdf'})
);

multiPartForm.submit(async data => {
    console.log('Multi-part form submitted successfully:', data);
});
```

# Field

The `Field` class is the base class for all form fields. It provides common functionality such as setting and getting values, validation, and managing errors.

```typescript
import {Field} from 'react-forms-store';

class CustomField extends Field<string> {
    constructor() {
        super({label: 'Custom Field', required: true});
    }
}

const customField = new CustomField();
customField.setValue('Custom Value');
console.log(customField.value); // Output: Custom Value
```

# TextField

The `TextField` class is used to create text input fields.

```typescript
import {TextField} from 'react-forms-store';

const textField = new TextField({label: 'Text Field', required: true});
textField.setValue('Sample Text');
console.log(textField.value); // Output: Sample Text
```

# NumberField

The `NumberField` class is used to create number input fields.

```typescript
import {NumberField} from 'react-forms-store';

const numberField = new NumberField({
    label: 'Number Field',
    required: true,
    min: 0,
    max: 100,
});
numberField.setValue(50);
console.log(numberField.value); // Output: 50
```

# ChoiceField

The `ChoiceField` class is used to create single-choice input fields.

```typescript
import {ChoiceField} from 'react-forms-store';

const choiceField = new ChoiceField({
    label: 'Choice Field',
    required: true,
    options: [
        {value: 'option1', label: 'Option 1'},
        {value: 'option2', label: 'Option 2'},
    ],
});
choiceField.setValue('option1');
console.log(choiceField.value); // Output: option1
```

# MultiChoiceField

The `MultiChoiceField` class is used to create multi-choice input fields.

```typescript
import {MultiChoiceField} from 'react-forms-store';

const multiChoiceField = new MultiChoiceField({
    label: 'Multi Choice Field',
    required: true,
    options: [
        {value: 'option1', label: 'Option 1'},
        {value: 'option2', label: 'Option 2'},
    ],
});
multiChoiceField.addValueByValue('option1');
multiChoiceField.addValueByValue('option2');
console.log(multiChoiceField.value); // Output: [{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }]
multiChoiceField.removeValueByValue('option2');
console.log(multiChoiceField.value); // Output: [{ value: 'option1', label: 'Option 1' }]
```

# DateField

The `DateField` class is used to create date input fields.

```typescript
import {DateField} from 'react-forms-store';

const dateField = new DateField({label: 'Date Field', required: true});
dateField.setValue(new Date('2025-03-12'));
console.log(dateField.value); // Output: 2025-03-12T00:00:00.000Z
```

# FileField

The `FileField` class is used to create file input fields.

```typescript
import {FileField} from 'react-forms-store';

const fileField = new FileField({label: 'File Field', required: true});
const file = new File(['content'], 'file.txt', {type: 'text/plain'});
fileField.setValue(file);
console.log(fileField.value); // Output: File object
```

# MultiFileField

The `MultiFileField` class is used to create multiple file input fields.

```typescript
import {MultiFileField} from 'react-forms-store';

const multiFileField = new MultiFileField({
    label: 'Multi File Field',
    required: true,
});
const file1 = new File(['content1'], 'file1.txt', {type: 'text/plain'});
const file2 = new File(['content2'], 'file2.txt', {type: 'text/plain'});
multiFileField.setValue([file1, file2]);
console.log(multiFileField.value); // Output: [File object, File object]
```

# ColorField

The `ColorField` class is used to create color input fields.

```typescript
import {ColorField} from 'react-forms-store';

const colorField = new ColorField({
    label: 'Color Field',
    required: true,
    format: 'hex',
});
colorField.setValue('#ff0000');
console.log(colorField.value); // Output: #ff0000
```

# Validation Definitions

Validation definitions are used to specify custom validation rules for form fields. Each validation `rule` consists of a `rule` function and an `error` message.

```typescript
import {TextField} from 'react-forms-store';

const textField = new TextField({
    label: 'Text Field',
    required: true,
    validation: [
        {
            rule: value => value.length >= 5,
            error: 'Value must be at least 5 characters long.',
        },
    ],
});

textField.setValue('Test');
textField.validate().then(result => {
    if (result.success) {
        console.log('Validation passed');
    } else {
        console.log('Validation failed:', result.errors);
    }
});
```
