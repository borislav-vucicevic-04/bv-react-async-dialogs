import { OptionTypes } from '../OptionTypes';
import ADS from './../async-dialogs.module.css';

/**
 * Displays an asynchronous alert dialog box with the specified options.
 * @param {OptionTypes.IAlertOptions} options - The options for configuring the alert dialog.
 * @returns {Promise<void>} A Promise that resolves when the user interacts with the dialog.
 *   The Promise resolves immediately after the user clicks the OK button.
 */
const alert = async (options: OptionTypes.IAlertOptions) => {
  let dialog = document.createElement("dialog");
  dialog.id = `ad-alert-${Math.floor(Math.random() * 10000).toString()}`;
  dialog.className = `${ADS['async-dialog']} ${options.className || ''}`
  dialog.innerHTML = `
    <form method='dialog' class=${ADS['ad-wrapper']} >
      <div class=${ADS['ad-title']}>${options.title}</div>
      <div class=${ADS['ad-body']}>
        <div>${options.message}</div>
      </div>
      <div class=${ADS['ad-buttons']}>
        <button type='submit' value='ok' class=${ADS['ad-ok']}>${options.okText || 'OK'}</button>
      </div>
    </form>
  `
  document.body.append(dialog);
  await showAsyncDialog(dialog.id);
  dialog.remove()
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
export default alert