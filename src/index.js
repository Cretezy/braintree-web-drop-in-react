import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import BraintreeWebDropIn from "braintree-web-drop-in";

export default class DropIn extends React.Component {
  static displayName = "BraintreeWebDropIn";

  static propTypes = {
    options: PropTypes.object.isRequired,
    // @deprecated: Include inside options
    preselectVaultedPaymentMethod: PropTypes.bool,

    onInstance: PropTypes.func,
    onError: PropTypes.func,

    onNoPaymentMethodRequestable: PropTypes.func,
    onPaymentMethodRequestable: PropTypes.func,
    onPaymentOptionSelected: PropTypes.func,
  };

  static defaultProps = {
    preselectVaultedPaymentMethod: true,
  };

  wrapper;
  instance;

  async componentDidMount() {
    try {
      this.instance = await BraintreeWebDropIn.create({
        container: ReactDOM.findDOMNode(this.wrapper),
        preselectVaultedPaymentMethod: this.props.preselectVaultedPaymentMethod,
        ...this.props.options,
      });

      this.instance.on("noPaymentMethodRequestable", (...args) => {
        if (this.props.onNoPaymentMethodRequestable) {
          this.props.onNoPaymentMethodRequestable(...args);
        }
      });
      this.instance.on("paymentMethodRequestable", (...args) => {
        if (this.props.onPaymentMethodRequestable) {
          this.props.onPaymentMethodRequestable(...args);
        }
      });
      this.instance.on("paymentOptionSelected", (...args) => {
        if (this.props.onPaymentOptionSelected) {
          this.props.onPaymentOptionSelected(...args);
        }
      });

      if (this.props.onInstance) {
        this.props.onInstance(this.instance);
      }
    } catch (error) {
      if (this.props.onError) {
        this.props.onError(error);
      }
    }
  }

  async componentWillUnmount() {
    if (this.instance) {
      await this.instance.teardown();
    }
  }

  shouldComponentUpdate() {
    // Static
    return false;
  }

  render() {
    return <div ref={(ref) => (this.wrapper = ref)} />;
  }
}
