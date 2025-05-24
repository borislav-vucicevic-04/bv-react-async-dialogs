/**
* Namespace containing various option types for configuring dialogs.
*/
export namespace OptionTypes { 
  // default options for all dialogs
  export interface IDefaultOptions {
    /**
    * String representing the dialog title.
    */
    title: string,
    /**
    * String representing the dialog message.
    */
    message: string,
    /**
    * Additional CSS class name(s) for styling the dialog (optional).
    */
    className?: string,
    /**
    * The text for the OK button in the dialog (optional).
    * Default value is 'OK' if not provided.
    */
    okText?: string,
    /**
    * The text for the Cancel button in the dialog (optional).
    * Default value is 'Cancel' if not provided.
    */
    cancelText?: string
  }
  // alert dialog options
  export interface IAlertOptions { 
    /**
    * The title displayed in the alert dialog.
    */
    title: string,
    /**
    * The message displayed in the alert dialog.
    */
    message: string,
    /**
    * Additional CSS class name(s) for styling the alert dialog (optional).
    */
    className?: string,
    /**
    * The text for the OK button in the alert dialog (optional).
    * Default value is 'OK' if not provided.
    */
    okText?: string
  }
  export interface IConfirmOptions extends IDefaultOptions {
    
  }
  /**
  * Represents options for configuring a select input.
  * Extends the base interface `IDefaultOptions`.
  */
  export interface ISelectOptions extends IDefaultOptions {
    /**
    * The list of choices available for selection.
    * Each choice can be represented as a string or an object with `value` and `label` properties.
    * - If choices are represented as objects, each object should have a `value` property representing
    *   the underlying value associated with the choice, and a `label` property representing the
    *   display text shown to the user.
    */
    choiceList: string[] | {value: string, label: string}[],
    /**
    * Indicates whether multiple selections are allowed (optional).
    * Default value is false if not provided.
    */
    multiselect?: boolean
  }
  /**
  * Represents options for configuring a prompt for a string input.
  * Extends the base interface `IDefaultOptions`.
  */
  export interface IPromptStringOptions extends IDefaultOptions {
    /**
    * Specifies the type of the prompt, which is always 'string' for this interface.
    */
    type: 'string';
    /**
    * Specifies the initial value to display in the input field (optional).
    */
    value?: string;
    /**
    * Specifies a placeholder text to display in the input field when it is empty (optional).
    */
    placeholder?: string;
    /**
    * Specifies the maximum number of characters allowed in the input field (optional).
    */
    maxlength?: number;
    /**
    * Specifies a regular expression pattern that the input value must match (optional).
    * This can be used for validation purposes.
    */
    pattern?: string;
  }
  /**
  * Represents options for configuring a prompt for a number input.
  * Extends the base interface `IDefaultOptions`.
  */
  export interface IPromptNumberOptions extends IDefaultOptions {
    /**
    * Specifies the type of the prompt, which is always 'number' for this interface.
    */
    type: 'number';
    /**
    * Specifies the initial value to display in the input field (optional).
    */
    value?: number;
    /**
    * Specifies the minimum value allowed in the input field (optional).
    */
    min?: number;
    /**
    * Specifies the maximum value allowed in the input field (optional).
    */
    max?: number;
    /**
    * Specifies the step increment or decrement for the input field (optional).
    */
    step?: number;
  }
  
  /**
  * Represents options for configuring a prompt for a date input.
  * Extends the base interface `IDefaultOptions`.
  */
  export interface IPromptDateOptions extends IDefaultOptions {
    /**
    * Specifies the type of the prompt, which is always 'date' for this interface.
    */
    type: 'date';
    /**
    * Specifies the initial date value to display in the input field (optional).
    */
    value?: Date;
    /**
    * Specifies the minimum allowed date value in the input field (optional).
    */
    min?: Date;
    /**
    * Specifies the maximum allowed date value in the input field (optional).
    */
    max?: Date;
    /**
    * Indicates whether the time should be included in the input (optional).
    * If true, both date and time will be prompted; if false, only date will be prompted.
    * Default value is false if not provided.
    */
    includeTime?: boolean;
  }
  /**
  * Represents options for configuring a prompt for a time input.
  * Extends the base interface `IDefaultOptions`.
  */
  export interface IPromptTimeOptions extends IDefaultOptions {
    /**
    * Specifies the type of the prompt, which is always 'time' for this interface.
    */
    type: 'time';
    /**
    * Specifies the initial time value to display in the input field (optional).
    * Time format should be in HH:mm (24-hour format).
    * Example: '14:30' for 2:30 PM.
    */
    value?: `${number | ''}${number}:${number}${number}`;
    /**
    * Specifies the minimum allowed time value in the input field (optional).
    * Time format should be in HH:mm (24-hour format).
    * Example: '08:00' for 8:00 AM.
    */
    min?: `${number | ''}${number}:${number}${number}`;
    /**
    * Specifies the maximum allowed time value in the input field (optional).
    * Time format should be in HH:mm (24-hour format).
    * Example: '17:00' for 5:00 PM.
    */
    max?: `${number | ''}${number}:${number}${number}`;
  }
}