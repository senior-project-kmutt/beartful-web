
import { Quotation } from "@/models/quotation";

import { CartItem } from "@/models/cart";
import style from "@/styles/payment/checkout.module.scss"

import CheckoutCreditCard from "@/components/CheckoutFormPayment/CheckoutCreditCard";
import CheckoutInternetBanking from "@/components/CheckoutFormPayment/CheckoutInternetBanking";
import Script from "next/script";

interface Props {
  cart: Quotation | CartItem
  paymentMethod: string
  createOrderPurchase: (data: any, transactionId: string, paymentMethod: string) => void
}

const Checkout = (props: Props) => {
  const { cart, paymentMethod, createOrderPurchase } = props
  const publicKey = 'pkey_test_5x1jqlva0xb31kk0ubw';
  let OmiseCard: any;
  const handleScriptLoad = () => {
    console.log('loadCredit');
    OmiseCard = (window as any).OmiseCard;
    OmiseCard.configure({
      publicKey,
      frameLabel: "Mottdy Shop",
      submitLabel: "PAY NOW",
      currency: "thb"
    });
  };

  return (
    <>
      <div className={style.own_form}>
        <Script src="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
        <form>
          <button
            id="credit-card"
            className={style.purchaseButton}
            type="button"
          //   onClick={handleClick}
          >
            ชำระเงิน
          </button>
        </form>
      </div>
      {/* {paymentMethod == 'creditCard' && <CheckoutCreditCard cart={cart} createOrderPurchase={createOrderPurchase} />}
            {paymentMethod == 'promptpay' && <CheckoutInternetBanking cart={cart} createOrderPurchase={createOrderPurchase} />} */}
    </>

  );
};

export default Checkout;