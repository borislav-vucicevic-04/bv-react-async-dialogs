import React, { Component } from 'react'
import { OptionTypes } from './OptionTypes'
import ADS from './async-dialogs.module.css'

interface IDialogProps {
  /**
   * The unique identifier for the dialog component.
   */
  id: string;
  /**
   * The title of the dialog.
   */
  title: string;
  /**
   * The content of the dialog.
   * This can include any valid React node(s).
   */
  children: React.ReactNode;
  /**
   * An optional class name(s) to apply additional styles to the dialog component.
   */
  className?: string;
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
/**
 * Renders an asynchronous dialog component with the specified properties.
 * @param {IDialogProps} props - The properties to configure the dialog component.
 * @returns {JSX.Element} The rendered asynchronous dialog component.
 */
export default function AsyncDialog(props: IDialogProps): JSX.Element {
  return (
    <dialog key={props.id} id={props.id} className={`${ADS['async-dialog']} ${props.className || ''}`}>
      <form method='dialog' className={ADS['ad-wrapper']}>
        <div className={ADS['ad-title']}>{props.title}</div>
        <div className={ADS['ad-body']}>
          {props.children}
        </div>
        <div className={ADS['ad-buttons']}>
          <button type="submit" value='cancel' className={ADS['ad-cancel']}>{props.cancelText || 'Cancel'}</button>
          <button type="submit" value='ok' className={ADS['ad-ok']}>{props.okText || 'OK'}</button>
        </div>
      </form>
    </dialog>
  )
}
