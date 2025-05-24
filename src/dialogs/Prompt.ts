import { OptionTypes } from "../OptionTypes";
import ADS from './../async-dialogs.module.css';

/**
 * Displays an asynchronous prompt dialog with the specified options and returns the user input.
 * @param {OptionTypes.IPromptStringOptions} options - The options for configuring the prompt dialog for string input.
 * @returns {Promise<string | undefined>} A Promise that resolves to the user input string if the user confirms,
 *   and undefined if the user cancels or closes the dialog.
 * @throws {Error} Throws an error if there are no overloads for the specified option type.
 */
async function prompt(options: OptionTypes.IPromptStringOptions): Promise<string | undefined>;
/**
 * Displays an asynchronous prompt dialog with the specified options and returns the user input.
 * @param {OptionTypes.IPromptNumberOptions} options - The options for configuring the prompt dialog for number input.
 * @returns {Promise<number | undefined>} A Promise that resolves to the user input number if the user confirms,
 *   and undefined if the user cancels or closes the dialog.
 * @throws {Error} Throws an error if there are no overloads for the specified option type.
 */
async function prompt(options: OptionTypes.IPromptNumberOptions): Promise<number | undefined>;
/**
 * Displays an asynchronous prompt dialog with the specified options and returns the user input.
 * @param {OptionTypes.IPromptDateOptions} options - The options for configuring the prompt dialog for date input.
 * @returns {Promise<Date | undefined>} A Promise that resolves to the user input date if the user confirms,
 *   and undefined if the user cancels or closes the dialog.
 * @throws {Error} Throws an error if there are no overloads for the specified option type.
 */
async function prompt(options: OptionTypes.IPromptDateOptions): Promise<Date | undefined>;
/**
 * Displays an asynchronous prompt dialog with the specified options and returns the user input.
 * @param {OptionTypes.IPromptTimeOptions} options - The options for configuring the prompt dialog for time input.
 * @returns {Promise<string | undefined>} A Promise that resolves to the user input time if the user confirms,
 *   and undefined if the user cancels or closes the dialog.
 * @throws {Error} Throws an error if there are no overloads for the specified option type.
 */
async function prompt(options: OptionTypes.IPromptTimeOptions): Promise<string | undefined>;
/**
 * Displays an asynchronous prompt dialog with the specified options and returns the user input.
 * @param {OptionTypes.IDefaultOptions} options - The options for configuring the prompt dialog.
 * @returns {Promise<string | number | Date | undefined>} A Promise that resolves to the user input value
 *   if the user confirms, and undefined if the user cancels or closes the dialog.
 * @throws {Error} Throws an error if there are no overloads for the specified option type.
 */
async function prompt(options: OptionTypes.IDefaultOptions): Promise<string | number | Date | undefined> {
  let dialog = document.createElement("dialog");
  dialog.id = `ad-prompt-${Math.floor(Math.random() * 10000).toString()}`;
  dialog.className = `${ADS['async-dialog']} ${ADS['ad-prompt']} ${options.className || ''}`
  dialog.innerHTML = `
    <form method='dialog' class=${ADS['ad-wrapper']} >
      <div class=${ADS['ad-title']}>${options.title}</div>
      <div class=${ADS['ad-body']}>
        <div>${options.message}</div>
      </div>
      <div class=${ADS['ad-buttons']}>
        <button type='submit' value='cancel' formnovalidate class=${ADS['ad-cancel']}>${options.cancelText || 'Cancel'}</button>
        <button type='submit' value='ok' class=${ADS['ad-ok']}>${options.okText || 'OK'}</button>
      </div>
    </form>
  `
  if(isPromptStringOptions(options)) {
    document.body.append(dialog)
    dialog.querySelector(`.${ADS['ad-body']}`)?.append(createInputTypeText(options));
    let userResponse = await showAsyncDialog(dialog.id);
    dialog.remove();

    if(!userResponse) return undefined;
    return userResponse.get("ad-prompt-user-input")!.toString();
  }
  else if(isPromptNumberOptions(options)) {
    document.body.append(dialog)
    dialog.querySelector(`.${ADS['ad-body']}`)?.append(createInputTypeNumber(options));
    let userResponse = await showAsyncDialog(dialog.id);
    dialog.remove();

    if(!userResponse) return undefined;
    return Number(userResponse.get("ad-prompt-user-input"));
  }
  else if(isPromptDateOptions(options)) {
    document.body.append(dialog)
    dialog.querySelector(`.${ADS['ad-body']}`)?.append(createInputTypeDate(options));
    let userResponse = await showAsyncDialog(dialog.id);
    dialog.remove();

    if(!userResponse) return undefined;
    return new Date(userResponse.get("ad-prompt-user-input")!.toString());
  }
  else if(isPromptTimeOptions(options)) {
    document.body.append(dialog)
    dialog.querySelector(`.${ADS['ad-body']}`)?.append(createInputTypeTime(options));
    let userResponse = await showAsyncDialog(dialog.id);
    dialog.remove();

    if(!userResponse) return undefined;
    return userResponse.get("ad-prompt-user-input")!.toString();
  }
  else throw new Error("There are no overloads for this type");
}
const showAsyncDialog = async (dialogID: string): Promise<FormData | undefined> => {
  var ReturnState = undefined;
  var dialog = document.getElementById(dialogID)! as HTMLDialogElement;
  try {
    await new Promise((resolve: any, reject: any) => {
      dialog.showModal()
      dialog.addEventListener('close', () => {
        if(dialog.returnValue === 'ok') resolve();
        else reject();
      })
    });
    ReturnState = new FormData(dialog.querySelector("form") as HTMLFormElement);
  }
  catch(error) {
    if(error instanceof Error) console.error(error);
    
    ReturnState = undefined;
  }
  finally {
    dialog!.style.display = 'none';
    return ReturnState;
  }
}

export default prompt
// typecheckers
const isPromptStringOptions = (obj: any): obj is OptionTypes.IPromptStringOptions => {
  return obj.type === 'string';
}
const isPromptNumberOptions = (obj: any): obj is OptionTypes.IPromptNumberOptions => {
  return obj.type === 'number';
}
const isPromptDateOptions = (obj: any): obj is OptionTypes.IPromptDateOptions => {
  return obj.type === 'date';
}
const isPromptTimeOptions = (obj: any): obj is OptionTypes.IPromptTimeOptions => {
  return obj.type === 'time';
}
// helper functions
const createInputTypeText = (settings: OptionTypes.IPromptStringOptions): HTMLInputElement =>  {
  let {maxlength, placeholder, value, pattern} = settings;
  let input = document.createElement("input");
  input.type = 'text';
  input.setAttribute("required", 'true');
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') e.preventDefault() });
  input.name = "ad-prompt-user-input"
  if(maxlength !== undefined && maxlength > 0) {
    input.setAttribute("maxlength", maxlength.toString());
    input.addEventListener('input', (event) => {
      let self = event.target as HTMLInputElement;
      let maxlength = Number(self.getAttribute("maxlength"));
      if(self.value.length > maxlength) self.value = self.value.slice(0, -1);
    })
  }
  if(pattern !== undefined) {
    input.setAttribute('pattern', pattern);
    input.addEventListener('input', (event) => {
      let self = event.target as HTMLInputElement;
      let pattern = new RegExp(self.getAttribute("pattern")!.toString());
      while(!pattern.test(self.value) && self.value.length !== 0)self.value = self.value.slice(0, -1);
    })
  }
  if(placeholder !== undefined) input.setAttribute("placeholder", placeholder);
  if(value !== undefined) input.setAttribute("value", value.toString());

  return input;
}
const createInputTypeNumber = (settings: OptionTypes.IPromptNumberOptions) => {
  let {value, min, max, step} = settings;
  let input = document.createElement("input");
  input.type = 'number';
  input.setAttribute("required", 'true');
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') e.preventDefault() });
  input.name = "ad-prompt-user-input";
  input.inputMode = 'decimal'

  if(value !== undefined) input.setAttribute("value", value.toString());
  if(min !== undefined) input.setAttribute("min", min.toString());
  if(max !== undefined) input.setAttribute("max", max.toString());
  if(step !== undefined) input.setAttribute("step", step.toString());

  return input;
}
const createInputTypeDate = (settings: OptionTypes.IPromptDateOptions) => {
  let {value, min, max, includeTime} = settings;
  let input = document.createElement("input");
  input.type = includeTime ? 'datetime-local' : 'date';
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') e.preventDefault() });
  input.setAttribute("required", 'true');
  input.name = "ad-prompt-user-input";

  if(value !== undefined) input.setAttribute("value", value.toString());
  if(min !== undefined) input.setAttribute("min", min.toString());
  if(max !== undefined) input.setAttribute("max", max.toString());

  return input;
}
const createInputTypeTime = (settings: OptionTypes.IPromptTimeOptions) => {
  let {value, min, max} = settings;
  let input = document.createElement("input");
  input.type = 'time';
  input.setAttribute("required", 'true');
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') e.preventDefault() });
  input.name = "ad-prompt-user-input";

  if(value !== undefined) {
    let h = Number(value.split(':')[0]);
    let m = Number(value.split(':')[1]);
    if(h > 23) throw new Error("Invalid value for hours!");
    if(m > 59) throw new Error("Invalid value for minutes!");
    input.setAttribute("value", value.toString());
  }
  if(min !== undefined) {
    let h = Number(min.split(':')[0]);
    let m = Number(min.split(':')[1]);
    if(h > 23) throw new Error("Invalid value for hours!");
    if(m > 59) throw new Error("Invalid value for minutes!");
    input.setAttribute("min", min.toString())}
  ;
  if(max !== undefined) {
    let h = Number(max.split(':')[0]);
    let m = Number(max.split(':')[1]);
    if(h > 23) throw new Error("Invalid value for hours!");
    if(m > 59) throw new Error("Invalid value for minutes!");
    input.setAttribute("max", max.toString())}
  ;

  return input;
}