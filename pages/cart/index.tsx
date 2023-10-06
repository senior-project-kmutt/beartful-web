import CheckoutCreditCard from "@/components/CheckoutFormPayment/CheckoutCreditCard"
import { Cart } from "@/models/cart"

const Cart = () => {
    const cart:Cart =  {
        email: "mottdy@odds.team",
        name: "mottdy",
        items: [],
        amount: 20,
        totalQty: 150000
      }
    return (
        <div>
            <button>Buy</button>
            <CheckoutCreditCard
                cart={cart}
            />
        </div>
    )
}

export default Cart
