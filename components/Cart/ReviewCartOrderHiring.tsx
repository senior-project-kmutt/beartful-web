import { useEffect, useState } from "react";
import style from "@/styles/cart/hiringReviewCartItem.module.scss"
import { IUser } from "@/pages/chat";
import { Quotation } from "@/models/quotation";
import { createPurchaseOrder } from "@/services/purchaseOrder/purchaseOrder.api";
import { ICreatePurchaseOrder } from "@/models/purchaseOrder";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface Props {
    quotationItem: Quotation
}

const ReviewCartOrderHiring = (props: Props) => {
    const { quotationItem } = props;
    const router = useRouter();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const userSession = localStorage.getItem('user')
        if(userSession && userSession !== "undefined") {
          const user = JSON.parse(userSession);
          setUser(user)
        }
      }, []);
    
    const getDateFormat = (dateTime: Date) => {
        const dateObject = new Date(dateTime);
        const date = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${date}/${month}/${year}`;
    }

    const createOrderPurchase = () => {
        const token = localStorage.getItem("auth");
        const headers = {
            Authorization: `Bearer ${token}`,
          };
        const purchaseOrderData = {
            purchaseOrder: {
                customerId: user?.id,
                quotationId: quotationItem._id,
                status: 'pending',
                amount: quotationItem.amount,
                vat: 0,
                netAmount: quotationItem.amount,
                paymentMethod: 'promptpay',
                note: 'This is note',
                type: "hiring"
            }
        } as ICreatePurchaseOrder
        createPurchaseOrder(purchaseOrderData, headers).then(res => {
            Swal.fire({
                icon: "success",
                title: "สร้างบัญชีสำเร็จ",
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`)
                }
              });
        })

    }

    return (
        <div className="px-20 py-16">
        {quotationItem && (
          <div>
            <div>
              <h1 className="text-center text-2xl font-bold mb-8">ยืนยันการจัดซื้อ / จัดจ้าง</h1>
              {/* review {quotationId} */}

              <div className={style.cartItem}>
                <div className={`${style.formGrid} pt-5 mb-4`} style={{fontSize: "smaller"}}>
                  <p className="ml-6">ผลงานที่จัดซื้อ/จัดจ้าง</p>
                  <p className="mr-9">ราคา</p>
                </div>
                <div className={style.formGrid}>
                  <div className={style.information}>
                    <img className={style.userImage} src="../../xxxx"></img>
                    <div className={style.detail}>
                      <p className={style.artworkName}>{quotationItem.name}</p>
                      <p className={style.description}>เลขที่ : {quotationItem.quotationNumber}</p>
                      <p className={style.description}>สิ่งที่ได้รับ : {quotationItem.benefits}</p>
                      <p className={style.description}>การแก้ไข : {quotationItem.numberOfEdit}</p>
                      <p className={style.description}>ระยะเวลาการทำงาน : {getDateFormat(quotationItem.startDate)} - {getDateFormat(quotationItem.endDate)}</p>
                      {quotationItem.note && (
                        <p className={style.description}>หมายเหตุเพิ่มเติม : {quotationItem.note}</p>
                      )}
                    </div>
                  </div>
                  <div className={style.price}>{quotationItem.amount} Baht</div>
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
                  <div>{quotationItem.amount} บาท</div>
                  <div>ยอดชำระเงินทั้งหมด</div>
                  <div className={style.totalAmount}>{quotationItem.amount} บาท</div>
                </div>
              </div>
            </div>
            <div className={style.buttonConfirm}>
              <button className={style.backButton}>ย้อนกลับ</button>
              <button className={style.purchaseButton} onClick={() => createOrderPurchase()}>ชำระเงิน</button>
            </div>
          </div>
        )}
      </div>
    );
};

export default ReviewCartOrderHiring;