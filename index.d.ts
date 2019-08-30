declare module 'braintree-web-drop-in-react' {
  import * as React from 'react';
  import { Options as Opts, Dropin } from 'braintree-web-drop-in';

  export type Options = Omit<Opts, 'container'>;
  export type DropinInstance = Dropin;

  interface Props {
    options: Options;
    onInstance: (instance: Dropin) => void;
  }
  
  export default class DropIn extends React.Component<Props> { }
}
