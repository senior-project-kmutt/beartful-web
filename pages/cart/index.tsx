// import CheckoutCreditCard from "@/components/CheckoutFormPayment/CheckoutCreditCard";
// import CheckoutInternetBanking from "@/components/CheckoutFormPayment/CheckoutInternetBanking";
// import NavBar from "@/components/Layout/NavBar";
// import { Cart } from "@/models/cart";

// const Cart = () => {
//   const cart: Cart = {
//     email: "mottdy@odds.team",
//     name: "mottdy",
//     items: [],
//     amount: 150000,
//     totalQty: 20,
//   };
//   return (
//     <div>
//       <NavBar />
//       <button>Buy</button>
//       <CheckoutCreditCard cart={cart} />
//       <CheckoutInternetBanking cart={cart} />
//     </div>
//   );
// };

// export default Cart;

import CustomerCart from "@/components/Cart/CustomerCart";

const Cart = () => {

  return (
    <>
      <CustomerCart />
    </>
  );
};

export default Cart;
