
import { useEffect, useState } from "react";
import NavBar from "@/components/Layout/NavBar";
import ReviewCartOrder from "@/components/Cart/ReviewCartOrder";
import { CartItem } from "@/models/cart";
import { getCartById } from "@/services/cart/cart.api";
import { ICreatePurchaseOrder } from "@/models/purchaseOrder";
import { useRouter } from "next/router";
import { OrderStatus } from "@/enums/orders";
import { createPurchaseOrder } from "@/services/purchaseOrder/purchaseOrder.api";
import Swal from "sweetalert2";

const ReviewOrderHiring = () => {
  const [cartItemId, setCartItemId] = useState<string>('');
  const [cartItem, setCartItem] = useState<CartItem>();
  const router = useRouter();

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const item = params.get('item');
    setCartItemId(item || '')
  }, []);

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const item = params.get('item');
    setCartItemId(item || '')

    if (cartItemId) {
      const token = localStorage.getItem("auth");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      getCartById(cartItemId, headers).then(res => {
        setCartItem(res)
      })
    }
  }, [cartItemId]);

  const createOrderPurchase = (data: CartItem) => {
    const token = localStorage.getItem("auth");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const purchaseOrderData = {
      purchaseOrder: {
        freelanceId: data.freelanceId,
        customerId: data.customerId,
        status: 'pending',
        amount: data.amount,
        vat: 0,
        netAmount: data.netAmount,
        paymentMethod: 'promptpay',
        note: 'This is note',
        type: OrderStatus.readyMade
      },
      artworkItem: data.artworkId

    } as ICreatePurchaseOrder
    createPurchaseOrder(purchaseOrderData, headers).then(res => {
      Swal.fire({
        icon: "success",
        title: "สร้างออเดอร์สำเร็จ",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/purchase/`)
        }
      });
    })
  }

  console.log(cartItem);

  return (
    <div>
      <NavBar />
      {cartItem && (
        <ReviewCartOrder data={cartItem} type={OrderStatus.readyMade} createOrderPurchase={createOrderPurchase} />
      )}
    </div>
  );
};

export default ReviewOrderHiring;
