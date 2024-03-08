import { Quotation } from "@/models/quotation";
import { getQuotationById } from "@/services/quotation/quotation.api";
import { useEffect, useState } from "react";
import NavBar from "@/components/Layout/NavBar";
import ReviewCartOrder from "@/components/Cart/ReviewCartOrder";
import { IUser } from "@/pages/chat";
import { ICreatePurchaseOrder, PayAmount } from "@/models/purchaseOrder";
import { createPurchaseOrder } from "@/services/purchaseOrder/purchaseOrder.api";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { OrderStatus } from "@/enums/orders";

const ReviewOrderHiring = () => {
  const [quotationId, setQuotationId] = useState<string>('');
  const [quotationItem, setQuotationItem] = useState<Quotation>()
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    const userSession = localStorage.getItem('user')
    if (userSession && userSession !== "undefined") {
      const user = JSON.parse(userSession);
      setUser(user)
    }
  }, []);

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const item = params.get('item');
    setQuotationId(item || '')
  }, []);

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const item = params.get('item');
    setQuotationId(item || '')

    if (quotationId) {
      const token = localStorage.getItem("auth");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      getQuotationById(quotationId, headers).then(res => {
        setQuotationItem(res)
      })

    }
  }, [quotationId]);

  const createOrderPurchase = (data: Quotation, transactionId: string, payAmount: PayAmount, paymentMethod: string) => {
    const token = localStorage.getItem("auth");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const purchaseOrderData = {
      purchaseOrder: {
        freelanceId: data.freelanceId,
        customerId: data.customerId,
        quotationId: data._id,
        status: 'pending',
        amount: data.amount,
        vat: payAmount.vat,
        fee: payAmount.fee,
        netAmount: payAmount.net,
        paymentMethod: paymentMethod,
        note: 'This is note',
        type: OrderStatus.hired,
        chargeId: transactionId
      }
    } as ICreatePurchaseOrder
    createPurchaseOrder(purchaseOrderData, headers).then(res => {
      Swal.fire({
        icon: "success",
        title: "สร้างออเดอร์สำเร็จ",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase`)
        }
      });
    })
  }

  return (
    <div>
      <NavBar />
      {quotationItem && (
        <ReviewCartOrder data={quotationItem} type={OrderStatus.hired} createOrderPurchase={createOrderPurchase} />
      )}
    </div>
  );
};

export default ReviewOrderHiring;
