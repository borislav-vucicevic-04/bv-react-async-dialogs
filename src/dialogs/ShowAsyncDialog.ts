/**
 * Displays an asynchronous dialog with the specified ID and returns form data upon interaction.
 * @param {string} dialogID - The ID of the dialog element to display.
 * @returns {Promise<FormData | undefined>} A Promise that resolves to the form data submitted
 *   when the dialog is closed with an 'OK' action, or undefined if the dialog is canceled or closed.
 * @throws {Error} Throws an error if no dialog element is found with the specified ID.
 */
const showAsyncDialog = async (dialogID: string): Promise<FormData | undefined> => {
  var ReturnState = undefined;
  let element = document.getElementById(dialogID);
  if(!element) throw new Error(`There is not a single dialog with "${dialogID}" as their ID!`);
  
  const dialog = element as HTMLDialogElement;

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
    return ReturnState;
  }
}

export default showAsyncDialog;