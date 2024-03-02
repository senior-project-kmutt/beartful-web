import { Cart, CartItem } from "@/models/cart";
import { CreditCardPayment } from "@/models/payment";
import { createCreditCardCharge } from "@/services/payment/checkout.api";
import { useEffect } from "react";
import style from "@/styles/payment/checkout.module.scss"
import Script from 'next/script';
import { Quotation } from "@/models/quotation";
import Swal from "sweetalert2";


interface Props {
  cart: Quotation | CartItem
  createOrderPurchase: (data: any, transactionId: string, paymentMethod: string) => void
}

declare global {
  interface Window {
    OmiseCard: {
      configure: (options: { defaultPaymentMethod: string }) => void;
      configureButton: (selector: string) => void;
      attach: () => void;
      open: (options: {
        frameDescription: string;
        amount: number;
        onCreateTokenSuccess: (token: any) => void;
        onFormClosed: () => void;
      }) => void;
    };
  }
}

const CheckoutCreditCard = (props: Props) => {
  // const publicKey =`${process.env.OMISE_PUBLIC_KEY}`;
  const publicKey = 'pkey_test_5x1jqlva0xb31kk0ubw';
  const { cart, createOrderPurchase } = props;

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

  const creditCardConfigure = () => {
    window.OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
    });
    window.OmiseCard.configureButton("#credit-card");
    window.OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    window.OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount * 100,
      onCreateTokenSuccess: (token: any) => {
        const charge: CreditCardPayment = {
          // email: cart.email,
          // name: cart.name,
          amount: cart.amount,
          token: token
        }
        createCreditCardCharge(charge).subscribe(res => {
          if (res.status == 200) {
            createOrderPurchase(cart, res.data.charge.id, 'creditCard')
          }
        }, error => {
          if (error.response.status == 400) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: error.response.data.error,
              icon: "warning"
            })
          }
        });
      },
      onFormClosed: () => { }
    });
  };

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    creditCardConfigure();
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
          id="credit-card"
          className={style.purchaseButton}
          type="button"
          onClick={handleClick}
        >
          ชำระเงิน
        </button>
      </form>
    </div>
  )

}

export default CheckoutCreditCard;
