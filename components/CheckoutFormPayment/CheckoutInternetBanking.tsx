import { Cart } from "@/models/cart";
import { CreditCardPayment } from "@/models/payment";
import { createIternetBankingCharge } from "@/services/payment/checkout.api";
import { useEffect } from "react";
import style from "@/styles/payment/checkout.module.scss"
import Script from 'next/script';

interface Props {
  cart: Cart
}

const CheckoutInternetBanking = (props: Props) => {

  // const publicKey = process.env.OMISE_PUBLIC_KEY;
  const publicKey = 'pkey_test_5x1jqlva0xb31kk0ubw';
  const { cart } = props;

  let OmiseCard: any;
  const handleScriptLoad = () => {
    OmiseCard = (window as any).OmiseCard;
    OmiseCard.configure({
      publicKey,
      frameLabel: "Mottdy Shop",
      submitLabel: "PAY NOW",
      currency: "thb"
    });
  };

  const internetBankingConfigure = () => {
        OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        // "bill_payment_tesco_lotus",
        // "alipay",
        "promptpay",
        "pay_easy",
        "net_banking",
        "convenience_store"
      ]
    })
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    console.log(cart);
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: (token: any) => {
        const charge: CreditCardPayment = {
          email: cart.email,
          name: cart.name,
          amount: cart.amount,
          token: token
        }
        createIternetBankingCharge(charge);
      },
      onFormClosed: () => { }
    });
  };

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    internetBankingConfigure();
    omiseCardHandler();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = omiseCardHandler;
  }, [handleClick]);
  return (
    <div className={style.own_form}>
      <Script src="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      <form>
      <button
            id="internet-banking"
            className="btn internet-banking"
            type="button"
            disabled={cart.amount === 0}
            onClick={handleClick}
          >
            Pay with Internet Banking / Others
          </button>
      </form>
    </div>
  )

}

export default CheckoutInternetBanking;
