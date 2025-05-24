import { OptionTypes } from '../OptionTypes';
import ADS from './../async-dialogs.module.css';
/**
 * Displays an asynchronous confirmation dialog box with the specified options.
 * @param {OptionTypes.IConfirmOptions} options - The options for configuring the confirmation dialog.
 * @returns {Promise<boolean>} A Promise that resolves to true if the user clicks OK button, 
 *   and false if the user clicks Cancel button.
*/
const confirm = async (options: OptionTypes.IConfirmOptions): Promise<boolean> => {
  let dialog = document.createElement("dialog");
  dialog.id = `ad-confirm-${Math.floor(Math.random() * 10000).toString()}`;
  dialog.className = `${ADS['async-dialog']} ${options.className || ''}`
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
  document.body.append(dialog);
  let userResponse = await showAsyncDialog(dialog.id);
  dialog.remove();
  return userResponse !== undefined;
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
export default confirm