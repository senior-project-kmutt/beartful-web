import { Cart, CartItem } from "@/models/cart";
import { CreditCardPayment } from "@/models/payment";
import { createIternetBankingCharge } from "@/services/payment/checkout.api";
import { useEffect, useState } from "react";
import style from "@/styles/payment/checkout.module.scss"
import Script from 'next/script';
import { Quotation } from "@/models/quotation";
import Swal from "sweetalert2";
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

interface Props {
  cart: Quotation | CartItem
  createOrderPurchase: (data: any) => void
}

const CheckoutInternetBanking = (props: Props) => {
  // const publicKey = `${process.env.REACT_APP_OMISE_PUBLIC_KEY}`;
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

  const internetBankingConfigure = () => {
    window.OmiseCard.configure({
      defaultPaymentMethod: 'promptpay',
    });
    window.OmiseCard.configureButton('#internet-banking');
    window.OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    window.OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: (token: any) => {
        const charge: CreditCardPayment = {
          amount: cart.amount,
          token: token
        }
        createIternetBankingCharge(charge).subscribe(res => {
          if (res.status == 200) {
            createOrderPurchase(cart)
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

export default CheckoutInternetBanking;
