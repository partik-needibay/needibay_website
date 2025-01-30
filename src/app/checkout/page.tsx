import Grid from "@component/grid/Grid";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";

const FormCheckout = () => {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm />
      </Grid>
    </Grid>
  );
};

export default FormCheckout;
