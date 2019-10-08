import * as React from 'react';
import { Options as BraintreeOptions, Dropin } from 'braintree-web-drop-in';

export type Options = Omit<BraintreeOptions, 'container'>;

export interface IDropInProps {
  options: Options;
  preselectVaultedPaymentMethod?: boolean,
  onInstance?: (instance: Dropin) => void;
}

export default class DropIn extends React.Component<IDropInProps> { }
