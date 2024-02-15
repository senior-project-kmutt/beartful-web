import { useEffect, useState } from "react";
import style from "@/styles/cart/hiringReviewCartItem.module.scss"
import { IUser } from "@/pages/chat";
import { Quotation } from "@/models/quotation";
import { useRouter } from "next/router";
import { CartItem } from "@/models/cart";
import { OrderStatus } from "@/enums/orders";
import { HIRED_IMAGE, READYMADE_IMAGE } from "@/config/constants";

interface Props {
  data: Quotation | CartItem
  type: string;
  createOrderPurchase: (data: any) => void
}

const ReviewCartOrder = (props: Props) => {
  const { data, type, createOrderPurchase } = props;
  const imgItem = type === OrderStatus.hired ? HIRED_IMAGE : READYMADE_IMAGE
  const router = useRouter()

  const getDateFormat = (dateTime: Date) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${date}/${month}/${year}`;
  }

  return (
    <div className="px-20 py-16">
      {data && (
        <div>
          <div>
            <h1 className="text-center text-2xl font-bold mb-8">ยืนยันการจัดซื้อ / จัดจ้าง</h1>
            <div className={style.cartItem}>
              <div className={`${style.formGrid} pt-5 mb-4`} style={{ fontSize: "smaller" }}>
                <p className="ml-6">ผลงานที่จัดซื้อ/จัดจ้าง</p>
                <p className="mr-9">ราคา</p>
              </div>
              <div className={style.formGrid}>
                <div className={style.information}>
                  <img className={style.userImage} src={imgItem}></img>
                  {type === OrderStatus.hired && (
                    <div className={style.detail}>
                      <p className={style.artworkName}>{(data as Quotation).name}</p>
                      <p className={style.description}>เลขที่ : {(data as Quotation).quotationNumber}</p>
                      <p className={style.description}>สิ่งที่ได้รับ : {(data as Quotation).benefits}</p>
                      <p className={style.description}>การแก้ไข : {(data as Quotation).numberOfEdit}</p>
                      <p className={style.description}>ระยะเวลาการทำงาน : {getDateFormat((data as Quotation).startDate)} - {getDateFormat((data as Quotation).endDate)}</p>
                      {(data as Quotation).note && (
                        <p className={style.description}>หมายเหตุเพิ่มเติม : {(data as Quotation).note}</p>
                      )}
                    </div>
                  )}

                  {type === OrderStatus.readyMade && (
                    <div className={style.detail}>
                      <p className={style.artworkName}>{(data as CartItem).artworkName}</p>
                      <p className={style.description}>เลขที่ : {(data as CartItem).description}</p>
                    </div>
                  )}
                </div>
                <div className={style.price}>{data.amount} Baht</div>
              </div>
            </div>
          </div>
          <div className={style.paymentMethod}>
            <p>วิธีการชำระเงิน</p>
            <button>QR PromptPay</button>
            <button>Credit / Debit Card</button>
          </div>
          <div className={style.amountBlock}>
            <div className={style.payment}>
              <div className="grid grid-cols-2 gap-4">
                <div>รวมการสั่งซื้อ / จ้าง</div>
                <div>{data.amount} บาท</div>
                <div>ยอดชำระเงินทั้งหมด</div>
                <div className={style.totalAmount}>{data.amount} บาท</div>
              </div>
            </div>
          </div>
          <div className={style.buttonConfirm}>
            <button className={style.backButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/cart`)}>ย้อนกลับ</button>
            <button className={style.purchaseButton} onClick={() => createOrderPurchase(data)}>ชำระเงิน</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCartOrder;