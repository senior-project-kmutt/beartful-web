import { Cart } from "@/models/cart";
import { CreditCardPayment } from "@/models/payment";
import { createCreditCardCharge } from "@/services/payment/checkout.api";
import {Helmet } from "react-helmet";
interface Props {
    cart: Cart
}

<script type="text/javascript" src="https://cdn.omise.co/omise.js">
</script>

const CheckoutCreditCard = (props:Props) => {
    const publicKey = process.env.OMISE_PUBLIC_KEY;
    const { cart } = props;
    let OmiseCard:any;
    const handleScriptLoad = () => {
        OmiseCard = (window as any).OmiseCard;
        OmiseCard.configure({
          publicKey,
          frameLabel: "Sabai Shop",
          submitLabel: "PAY NOW",
          currency: "thb"
        });
      };

      const creditCardConfigure = () => {
        OmiseCard.configure({
          defaultPaymentMethod: "credit_card",
          otherPaymentMethods: []
        });
        OmiseCard.configureButton("#credit-card");
        OmiseCard.attach();
      };
    
      const omiseCardHandler = () => {
        OmiseCard.open({
          frameDescription: "Invoice #3847",
          amount: cart.amount,
          onCreateTokenSuccess: (token: any) => {
            const charge:CreditCardPayment = {
                email: cart.email,
                name: cart.name,
                amount: cart.amount,
                token: token
            }
            createCreditCardCharge(charge);
          },
          onFormClosed: () => {}
        });
      };

      const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        creditCardConfigure();
        omiseCardHandler();
      };

    return(
        <div className="own-form">
        {/* <Helmet>
              <script src="/path/to/resource.js" type="text/javascript" onLoad={handleScriptLoad} />
            </Helmet> */}

        <form>
          <button
            id="credit-card"
            className="btn"
            type="button"
            disabled={cart.amount === 0}
            onClick={handleClick}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
        )
    
}

export default CheckoutCreditCard;
