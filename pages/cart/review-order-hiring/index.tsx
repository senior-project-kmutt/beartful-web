import { Quotation } from "@/models/quotation";
import { getQuotationById } from "@/services/quotation/quotation.api";
import { useEffect, useState } from "react";
import NavBar from "@/components/Layout/NavBar";
import ReviewCartOrderHiring from "@/components/Cart/ReviewCartOrderHiring";

const ReviewOrderHiring = () => {
  const [quotationId, setQuotationId] = useState<string>('');
  const [quotationItem, setQuotationItem] = useState<Quotation>()
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

  return (
    <div>
      <NavBar />
      {quotationItem && (
        <ReviewCartOrderHiring quotationItem={quotationItem} />
      )}
    </div>
  );
};

export default ReviewOrderHiring;
