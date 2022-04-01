import {
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; //trae stripe
import { getBasketTotal } from "../reducer";
import Review from "../components/ProcessOrder/Review";
import { useStateValue } from "../StateProvider";
import accounting from "accounting";
import axios from "axios";
import { useState } from "react";
import { actionTypes } from "../reducer";
import { DialerSip } from "@material-ui/icons";

//Cargamos la conexión hacia la plataforma. Conectamos nuestro stripe
const stripePromise = loadStripe(
  "pk_test_51Kj4NiDXhcebCoTAjFDgXNdaH67Axl5pQj2m31NrM8pgIbrv3GnUKtLM4e2nIOu64mUWQ6A3W057DydWtIgiQeHn0044wBbixj"
);

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};


const CheckoutForm = ({ backStep, nextStep }) => {
  const [{ basket, paymentMessage }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  let sin_completar = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //el hook useStripe nos devuelve la conexión a stripe.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), //CardElement es el formulario de la tarjeta. Así capturamos los números tecleados.
    }); //puedo enviar el método de pago, pero todavía no sé que es lo que estoy pagando.
    setLoading(true);
    if (!error) {
      console.log('mi_paymentMethod',paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: getBasketTotal(basket) * 100,
          }
        );
        /* enviamos al backend, y la información que vamos a enviar al backend */
        console.log(data); //lo que va a ir al backend
        dispatch({
          type: actionTypes.SET_PAYMENT_MESSAGE,
          paymentMessage: data.message,
        });
        if (data.message === "Pago realizado con éxito.") {
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          });
        }

        elements.getElement(CardElement).clear();
        nextStep();
      } catch (error) {
        console.log(error);
        nextStep();
      }
      setLoading(false);
    }
  };

  const activa_boton = (e) => {
    console.log("epo__esta_Ready", e.complete)
    sin_completar = e.complete
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} onReady={(e) => activa_boton(e)} onChange={(e) => activa_boton(e)} />
      {/* input ya preparado para ser validado que trae la biblioteca de Stripe */}
      {/*  googlear stripe card test para acceder a las distintas tarjetas */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button onClick={backStep} variant='outlined'>
          Back
        </Button>
        {console.log('epo_________',stripe, elements)}
        <Button
          type='submit'
          disabled={!stripe || !sin_completar}
          variant='contained'
          color='primary'
        >
          {loading ? (
            <CircularProgress />
          ) : (
            `Pay ${accounting.formatMoney(getBasketTotal(basket), "€")}`
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        {/* permite acceder al objeto Stripe desde sus hijos */}
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
        {/* Formulario de pago */}
      </Elements>
    </>
  );
};

export default PaymentForm;
