import { OptionTypes } from "../OptionTypes";
import ADS from '../async-dialogs.module.css'
/**
 * Displays an asynchronous selection dialog box with the specified options.
 * @param {OptionTypes.ISelectOptions} options - The options for configuring the selection dialog.
 * @returns {Promise<string | string[] | undefined>} A Promise that resolves to the selected value(s)
 *   if the user confirms the selection, and undefined if the user cancels or closes the dialog.
*/
const select = async (options: OptionTypes.ISelectOptions): Promise<string | string[] | undefined> => {
  let dialog = document.createElement("dialog");
  dialog.id = `ad-select-${Math.floor(Math.random() * 10000).toString()}`;
  dialog.className = `${ADS['async-dialog']} ${ADS['ad-select']} ${options.className || ''}`
  dialog.innerHTML = `
    <form method='dialog' class=${ADS['ad-wrapper']} >
      <div class=${ADS['ad-title']}>${options.title}</div>
      <div class=${ADS['ad-body']}>
        <div>${options.message}</div>
      </div>
      <div class=${ADS['ad-buttons']}>
        <button type='submit' value='cancel' class=${ADS['ad-cancel']}>${options.cancelText || 'Cancel'}</button>
        <button type='submit' value='ok' class=${ADS['ad-ok']}>${options.okText || 'OK'}</button>
      </div>
    </form>
  `
  let i = 0;
  for (const opt of options.choiceList) {
    var adBody = dialog.querySelector(`.${ADS['ad-body']}`)!;
    let label = document.createElement("label");
    let input = document.createElement("input");
    let span = document.createElement("span");

    input.type = options.multiselect ? 'checkbox' : 'radio';
    input.name = "ad-select-option";
    if(i === 0) input.checked = input.type === 'radio';
    if(typeof opt === 'string') {
      input.value = span.innerText = opt
    }
    else{
      input.value = opt.value;
      span.innerText = opt.label;
    }
    label.append(input, span);
    adBody.append(label);
    i++;
  }
  document.body.append(dialog);
  let userResponse = await showAsyncDialog(dialog.id);
  dialog.remove();
  if(!userResponse) return undefined
  if(!options.multiselect) return userResponse.get("ad-select-option")!.toString();
  else return userResponse.getAll("ad-select-option")!.map((item) => item.toString());
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
export default select
