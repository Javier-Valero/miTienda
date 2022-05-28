import { Button, Divider, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ message }) => {
  return (
    <>
      <div>
        <Typography variant='h6' align='center'>{message}</Typography>
        <br />
        <Divider />
        <br />
        <Typography variant='subtitle2' align='center' gutterBottom>
          {message === "Pago realizado con éxito."
            ? "Your booking reference : Rgh8787878lkj"
            : ""}
        </Typography>
      </div>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>
        Volver a página Inicio
      </Button>
    </>
  );
};

export default Confirmation;
