import CustomerPurchase from "@/components/Profile/Customer/Purchase/CustomerPurchase";
import FreelancePurchase from "@/components/Profile/Freelance/Purchase/FreelancePurchase";

const Purchase = () => {
    return (
        <>
            {/* เช็คว่าเป็น role ไหนแล้วเลือกไปตาม role*/}
            <FreelancePurchase />
        </>
    );
};

export default Purchase;
