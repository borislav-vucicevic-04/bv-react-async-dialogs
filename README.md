# React Async Dialogs

**React Async Dialogs** is a lightweight and flexible library for creating custom dialogs in React applications. It supports both pre-built and fully custom dialogs using TypeScript’s `async/await` syntax, making user interactions easy to manage and highly readable.


## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Dialogs](#dialogs)
  - [Alert Dialog](#alert-dialog)
  - [Confirm Dialog](#confirm-dialog)
  - [Select Dialog](#select-dialog)
  - [Prompt Dialog](#prompt-dialog)
- [AsyncDialog Component](#asyncDialog-component)
  - [Building Custom Dialog](#building-custom-dialog)
  - [Props](#props)
  - [Behavior](#behavior)
- [OptionTypes](#optiontypes)
  - [IDefaultOptions](#idefaultoptions)
  - [IAlertOptions](#ialertoptions)
  - [IConfirmOptions](#iconfirmoptions)
  - [ISelectOptions](#iselectoptions)
  - [IPromptStringOptions](#ipromptstringoptions)
  - [IPromptNumberOptions](#ipromptnumberoptions)
  - [IPromptDateOptions](#ipromptdateoptions)
  - [IPromptTimeOptions](#iprompttimeoptions)
- [Custom Styling](#custom-styling)
- [License](#license)


## Installation

To install the library, open the root folder of your project in the terminal and type the following:

```bash
npm install bv-react-async-dialogs
```

## Features

This library allows you to create and trigger custom dialogs using TypeScript’s `async/await` functionality. All dialog methods return a `Promise`, making it easy to work with asynchronous logic.

It provides the following features:

* **`Dialogs`** – a set of functions for calling pre-built dialogs
* **`OptionTypes`** – a namespace containing types for dialog configuration
* **`AsyncDialog`** – a component for building fully custom dialogs

## Usage

To use the features mentioned above, you need to import them into your React application.

```typescript
import { Dialogs, OptionTypes, AsyncDialog } from 'bv-react-async-dialogs';
```

## Dialogs

As previously mentioned, this package comes with **pre-made dialogs** that you can use in your code. You can also apply **custom styling** to them.

Here is the list of dialogs this library includes:

* **`alert`**: for displaying a simple message to the user
* **`confirm`**: to prompt the user to confirm their action
* **`select`**: to prompt the user with pre-defined choices
* **`prompt`**: to allow the user to enter some kind of data

To check how to apply custom styling, please go to [Custom styling](#custom-styling).

### Alert Dialog

To create a simple alert dialog, you can call the `Dialogs.alert` method.

```typescript
const alertOptions: IAlertOptions = {
    title: 'Hello world!',
    message: 'Hey! I am a simple alert dialog.',
    okText: 'OK'
};
await Dialogs.alert(alertOptions);
```

This method takes in one object of type [`IAlertOptions`](#ialertoptions), available from the `OptionTypes` namespace.

### Confirm Dialog

In order to display a confirmation dialog, use the `Dialogs.confirm` method. Example below shows how you can display a simple confirm dialog with custom styling and text for buttons.

```typescript
const confirmOptions: IConfirmOptions = {
    title: 'Delete the record',
    message: 'Are you sure you want to delete this record? This action is irreversible!',
    className: 'confirmationDialog',
    okText: 'Delete',
    cancelText: 'No, keep it'
};
const result = await Dialogs.confirm(confirmOptions);
```

This method takes in one object of type [`IConfirmOptions`](#iconfirmoptions), available from the `OptionTypes` namespace.

### Select Dialog

In order to prompt users with a predefined list of choices, use the `Dialogs.select` method. You can set it to have different display and real values in the choice list, and you can allow users to select multiple options if they would like to.

Example below displays a select dialog with custom styling where the user is prompted to choose their gender to complete their application. This dialog has the same real and display values.

```typescript
const selectOptions: ISelectOptions = {
    title: 'What is your gender?',
    message: 'Please choose your gender to complete your application.',
    className: 'genderDialog',
    choiceList: ["male", "female", "I don't want to specify"],
    okText: 'Submit'
};
const result = await Dialogs.select(selectOptions);
```

Example below displays a select dialog with custom styling where the user is prompted to choose preferred activities for their team-building event. This dialog has different real and display values for choices and allows users to select multiple choices.

```typescript
const selectOptions: ISelectOptions = {
    title: 'Preferred activities',
    message: 'Please tell which of the provided activities you would like to enjoy on our team-building event.',
    className: 'activitiesDialog',
    choiceList: [
        { value: "act-1", label: "Bowling" },
        { value: "act-2", label: "Karaoke" },
        { value: "act-3", label: "Darts" },
        { value: "act-4", label: "Mini golf" }
    ],
    multiSelect: true,
    okText: 'Submit'
};
const result = await Dialogs.select(selectOptions);
```

This method takes in one object of type [`ISelectOptions`](#iselectoptions), available from the `OptionTypes` namespace.

### Prompt Dialog

In order to prompt the user to enter some kind of data (a text, a number, or a date), use the `Dialogs.prompt` method. This method has four overloads which are called depending on the type of object you are passing as a parameter to this method.

Example below displays a simple prompt dialog with custom styling, where the user is prompted to enter the country code of their country. This dialog takes a parameter of type `IPromptStringOptions`. In order to prompt the user to enter a different type of data (e.g. number or date), use the appropriate type for the options object.

```typescript
const promptOptions: IPromptStringOptions = {
    type: 'string',
    title: 'Country code missing',
    message: 'Please enter the country code for your country in order for your application to be complete.',
    className: 'countryCodeDialog',
    placeholder: 'Example: USA',
    pattern: "[A-Za-z]{3}",
    maxlength: 3,
    okText: 'Submit'
};
const result = await Dialogs.prompt(promptOptions);
```

This method (in this example) takes in one object of type [`IPromptStringOptions`](#ipromptstringoptions), available from the `OptionTypes` namespace.

## AsyncDialog Component

The `AsyncDialog` component is a reusable dialog UI element designed for asynchronous workflows such as confirmations, prompts, or custom forms. It provides a title, customizable content, and two buttons (OK and Cancel), with built-in styling and accessibility considerations.

### Building Custom Dialog

To display a custom `AsyncDialog`, you must use the `Dialog.showAsyncDialog(dialogID)` method. This function takes the `id` of your dialog component and returns a `Promise`.

- If the user clicks the **OK** button, the `Promise` resolves to a `FormData` object.
- If the user clicks the **Cancel** button or closes the dialog, the `Promise` resolves to `undefined`.

```tsx
<AsyncDialog
  id="user-name-dialog"
  title="Enter Your Name"
  okText="Submit"
  cancelText="Cancel"
>
  <label htmlFor="username">Name:</label>
  <input type="text" id="username" name="username" required />
</AsyncDialog>
```

Example below, show how to use your custom made dialog inside your code:
```ts
// Somewhere in your app logic:
const formData = await Dialog.showAsyncDialog('user-name-dialog');

if (formData) {
  const name = formData.get('username');
  console.log('User entered name:', name);
} else {
  console.log('Dialog was cancelled');
}
```

### Props

| Prop         | Type              | Optional | Description                                                                 | Default     |
|--------------|-------------------|----------|-----------------------------------------------------------------------------|-------------|
| `id`         | `string`          | optional       | The unique identifier for the dialog. This is required by `Dialog.showAsyncDialog`. | —           |
| `title`      | `string`          | optional       | The title text displayed at the top of the dialog.                         | —           |
| `children`   | `React.ReactNode` | optional       | The content of the dialog. You can include any valid React elements here.  | —           |
| `className`  | `string`          | mandatory       | Optional class name(s) to customize the dialog style.                      | `''`        |
| `okText`     | `string`          | mandatory       | The label for the **OK** button.                                           | `"OK"`      |
| `cancelText` | `string`          | mandatory       | The label for the **Cancel** button.                                       | `"Cancel"`  |

---

### Behavior

To open and use a custom `AsyncDialog`, you must call the `Dialog.showAsyncDialog` method. This method takes the dialog's `id` as a parameter and returns a `Promise`.

- If the user clicks the **OK** button, the promise resolves with a `FormData` object containing all the form inputs inside the dialog.
- If the user clicks **Cancel** or closes the dialog, the promise resolves to `undefined`.

## OptionTypes

The **`OptionTypes`** namespace is a key part of this library. Without it, you are unable to use any of the pre-made dialogs.

This namespace includes the following types:

* **`IDefaultOptions`**: default options that each pre-made dialog has. The only exception is the `alert` dialog.
* **`IAlertOptions`**: defines key properties of the alert dialog, such as the dialog’s title and message
* **`IConfirmOptions`**: defines key properties of the confirm dialog
* **`ISelectOptions`**: defines key properties of the select dialog, such as the list of choices presented to the user
* **`IPromptStringOptions`**: defines key properties of the prompt dialog, where the user enters a string value
* **`IPromptNumberOptions`**: defines key properties of the prompt dialog, where the user enters a numeric value
* **`IPromptDateOptions`**: defines key properties of the prompt dialog, where the user enters a date
* **`IPromptTimeOptions`**: defines key properties of the prompt dialog, where the user enters a time

### IDefaultOptions

This type includes **basic properties** that each pre-made dialog should include. All other types, except for `IAlertOptions`, extend from this type.

| Property     | Explanation                                             | Optional  |
| ------------ | ------------------------------------------------------- | --------- |
| `title`      | Text shown in the header of the dialog                  | mandatory |
| `message`    | Message that will be displayed in the body              | mandatory |
| `className`  | A CSS class name(s) to apply custom styling             | optional  |
| `okText`     | Text displayed on the OK button (default: "OK")         | optional  |
| `cancelText` | Text displayed on the Cancel button (default: "Cancel") | optional  |

### IAlertOptions

`IAlertOptions` defines the set of properties used to configure the appearance and content of an alert dialog. Unlike other dialog types, it does **not** extend from `IDefaultOptions`, but it still shares several common fields like `title`, `message`, and `okText`.

| Property    | Explanation                                     | Optional  |
| ----------- | ----------------------------------------------- | --------- |
| `title`     | Text shown in the header of the dialog          | mandatory |
| `message`   | Message that will be displayed in the body      | mandatory |
| `className` | A CSS class name(s) to apply custom styling     | optional  |
| `okText`    | Text displayed on the OK button (default: "OK") | optional  |

### IConfirmOptions

`IConfirmOptions` extends from `IDefaultOptions` and does not define any additional properties of its own. It reuses all the properties specified in `IDefaultOptions` to configure the confirm dialog.

### ISelectOptions

`ISelectOptions` extends from `IDefaultOptions` and is used to configure select dialogs. It adds properties that allow you to define the available choices and whether multiple selections are allowed. Choices can either be an array of strings, or objects with different display and real values.

| Property      | Explanation                                                            | Optional  |
| ------------- | ---------------------------------------------------------------------- | --------- |
| `choiceList`  | A list of choices (strings or objects with `value` and `label` fields) | mandatory |
| `multiSelect` | Whether multiple choices can be selected (default is `false`)          | optional  |

### IPromptStringOptions

`IPromptStringOptions` extends from `IDefaultOptions` and is used to configure prompt dialogs where the user inputs a **string**.

| Property      | Explanation                                     | Optional  |
| ------------- | ----------------------------------------------- | --------- |
| `type`        | Must be `'string'`                              | mandatory |
| `value`       | Initial string value to pre-fill the input      | optional  |
| `placeholder` | Placeholder text when input is empty            | optional  |
| `maxlength`   | Maximum number of characters allowed            | optional  |
| `pattern`     | Regular expression pattern for validating input | optional  |

### IPromptNumberOptions

`IPromptNumberOptions` extends from `IDefaultOptions` and is used to configure prompt dialogs where the user inputs a **number**.

| Property | Explanation              | Optional  |
| -------- | ------------------------ | --------- |
| `type`   | Must be `'number'`       | mandatory |
| `value`  | Initial numeric value    | optional  |
| `min`    | Minimum allowed number   | optional  |
| `max`    | Maximum allowed number   | optional  |
| `step`   | Step increment/decrement | optional  |

### IPromptDateOptions

`IPromptDateOptions` extends from `IDefaultOptions` and is used to configure prompt dialogs where the user selects a **date**.

| Property      | Explanation                                                   | Optional  |
| ------------- | ------------------------------------------------------------- | --------- |
| `type`        | Must be `'date'`                                              | mandatory |
| `value`       | Initial `Date` object                                         | optional  |
| `min`         | Minimum allowed date                                          | optional  |
| `max`         | Maximum allowed date                                          | optional  |
| `includeTime` | If `true`, includes time along with date (default is `false`) | optional  |

### IPromptTimeOptions

`IPromptTimeOptions` extends from `IDefaultOptions` and is used to configure prompt dialogs where the user inputs a **time**.

| Property | Explanation                                                  | Optional  |
| -------- | ------------------------------------------------------------ | --------- |
| `type`   | Must be `'time'`                                             | mandatory |
| `value`  | Initial time value in `HH:mm` 24-hour format (e.g., `14:30`) | optional  |
| `min`    | Minimum allowed time value in `HH:mm` format                 | optional  |
| `max`    | Maximum allowed time value in `HH:mm` format                 | optional  |

## Custom Styling

This library allows you to customize the appearance of dialogs by overriding a set of CSS custom properties (variables). These properties control colors, spacing, font sizes, and other visual aspects of the dialogs. Below is a detailed explanation of each available CSS variable along with its default value.

| CSS Property                     | Description                                         | Default Value          |
|---------------------------------|-----------------------------------------------------|-----------------------|
| `--ad-backdrop-color`            | Color of the overlay backdrop behind the dialog     | `rgba(0,0,0,0.5)`     |
| `--ad-padding`                   | Padding applied uniformly inside the dialog         | `20px`                |
| `--ad-title-backgroundColor`    | Background color of the dialog title bar             | `#fefefe`             |
| `--ad-title-fontSize`            | Font size of the dialog title text                    | `20px`                |
| `--ad-title-color`               | Color of the dialog title text                        | `#131313`             |
| `--ad-footer-backgroundColor`   | Background color of the dialog footer area            | `#fefefe`             |
| `--ad-button-height`             | Height of buttons in dialogs                           | `50px`                |
| `--ad-button-fontSize`           | Font size used on dialog buttons                       | `20px`                |
| `--ad-button-hover-filter`       | CSS filter effect applied on buttons when hovered     | `brightness(115%)`    |
| `--ad-ok-color`                  | Text color of the OK button                            | `#fefefe`             |
| `--ad-ok-backgroundColor`       | Background color of the OK button                      | `#0b57d0`             |
| `--ad-ok-border`                 | Border style of the OK button                          | `solid 2px #0b57d0`   |
| `--ad-cancel-color`              | Text color of the Cancel button                        | `#131313`             |
| `--ad-cancel-backgroundColor`   | Background color of the Cancel button                  | `#ccc`                |
| `--ad-cancel-border`             | Border style of the Cancel button                      | `solid 2px #ccc`      |
| `--ad-body-backgroundColor`     | Background color of the dialog content/body            | `#fefefe`             |
| `--ad-body-row-gap`              | Vertical spacing (gap) between elements in the dialog | `16px`                |
| `--ad-body-fontSize`             | Font size of the dialog body text                       | `20px`                |

### Select Dialog Specific Styling

| CSS Property                   | Description                                         | Default Value       |
|-------------------------------|-----------------------------------------------------|---------------------|
| `--ad-select-fontSize`         | Font size used in select dialog                      | `20px`              |
| `--ad-select-selectorSize`     | Size of the selector checkbox/radio button          | `16px`              |
| `--ad-select-selectorColor`    | Color of the selector checkbox/radio button          | `#0b57d0`           |

### Prompt Dialog Specific Styling

| CSS Property                     | Description                                             | Default Value       |
|---------------------------------|---------------------------------------------------------|---------------------|
| `--ad-prompt-fontSize`           | Font size of prompt dialog text                          | `20px`              |
| `--ad-prompt-input-padding`      | Padding inside the input field                           | `6px`               |
| `--ad-prompt-input-outlineColor` | Outline color of the input field when inactive          | `#131313`           |
| `--ad-prompt-input-focus-outlineColor` | Outline color of the input field when focused         | `#0b57d0`           |

---

To customize these styles, define your own values for these CSS variables in your application's CSS, targeting the root element or dialog container. For example:

```css
:root {
  --ad-backdrop-color: rgba(10, 10, 50, 0.7);
  --ad-ok-backgroundColor: #0077ff;
  --ad-button-height: 60px;
}
```
This will override the default styles and apply your custom look to all dialogs.

## License

[MIT](https://choosealicense.com/licenses/mit/)
