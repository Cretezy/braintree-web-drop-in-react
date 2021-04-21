import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import BraintreeWebDropIn from "braintree-web-drop-in";


export default function DropIn({
  options,
  preselectVaultedPaymentMethod,
  onInstance,
  onError,
  onNoPaymentMethodRequestable,
  onPaymentMethodRequestable,
  onPaymentOptionSelected
}) {
  const [wrapper, setWrapper] = useState();
  const [instance, setInstance] = useState();

  useEffect(() => {
    (async () => {
      if (!wrapper) return;

      try {
        const instance = await BraintreeWebDropIn.create({
          container: ReactDOM.findDOMNode(wrapper),
          preselectVaultedPaymentMethod: preselectVaultedPaymentMethod,
          ...options,
        });

        instance.on("noPaymentMethodRequestable", (...args) => {
          if (onNoPaymentMethodRequestable) {
            onNoPaymentMethodRequestable(...args);
          }
        });
        instance.on("paymentMethodRequestable", (...args) => {
          if (onPaymentMethodRequestable) {
            onPaymentMethodRequestable(...args);
          }
        });
        instance.on("paymentOptionSelected", (...args) => {
          if (onPaymentOptionSelected) {
            onPaymentOptionSelected(...args);
          }
        });

        setInstance(instance);
      } catch (error) {
        if (onError)
          onError(error);
      }
    })();

    return () => {
      if (instance)
        return instance.teardown();
    }
  }, [wrapper]);

  // Instance change listener
  useEffect(() => {
    if (instance)
      onInstance(instance);
  }, [instance]);

  return <div ref={setWrapper} />;
}

DropIn.displayName = "BraintreeWebDropIn";

DropIn.propTypes = {
  options: PropTypes.object.isRequired,
  // @deprecated: Include inside options
  preselectVaultedPaymentMethod: PropTypes.bool,

  onInstance: PropTypes.func,
  onError: PropTypes.func,

  onNoPaymentMethodRequestable: PropTypes.func,
  onPaymentMethodRequestable: PropTypes.func,
  onPaymentOptionSelected: PropTypes.func,
};

DropIn.defaultProps = {
  preselectVaultedPaymentMethod: true,
}
