import style from "@/styles/quotation/quotation.module.scss"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { Quotation } from "@/models/quotation";

interface Props {
  data: Quotation;
  saveImageData?: Dispatch<SetStateAction<File | undefined>>;
}

const QuotationImage = (props: Props) => {
  const { data, saveImageData } = props
  const [imageObject, setImageObject] = useState<string>('')
  useEffect(() => {
    convertToImage();
    return () => {
      const previewContainer = document.getElementById('preview');
      if (previewContainer) {
        previewContainer.innerHTML = '';
      }
    };
  }, []);

  const convertToImage = async () => {
    const convertContent = document.getElementById('convert-content');
    const previewContainer = document.getElementById('preview');

    if (convertContent) {
      const canvas = await html2canvas(convertContent, {
        scale: 5,
        useCORS: true,
        scrollX: 10,
        scrollY: 10
      });

      // To Preview Image
      // const imgData = canvas.toDataURL('image/png');
      // const img = document.createElement('img');
      // img.src = imgData;
      // previewContainer.appendChild(img);

      if (saveImageData) {
        canvas.toBlob(blob => {
          if (blob) {
            const fileName = `${data.freelanceName}_${data.customerName}_${getDateFormat(new Date())}`;
            const file = new File([blob], fileName, { type: 'image/png' });
            saveImageData(file);
          }
        }, 'image/png');
      }


    }
  };

  const getDateFormat = (dateTime: Date) => {
    const dateObject = new Date(dateTime);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${date}/${month}/${year}`;
  }

  const getCurrentTime = () => {
    const dateObject = new Date();
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div className="">
      <div id="convert-content" className={`${style.content} p-14`}>
        <div className="flex justify-between mb-12">
          <div className="text-3xl">
            <p>ใบเสนอราคา</p>
            <p className="ml-1 mt-1">Quotation</p>
          </div>
          <div></div>
          <div className="mt-5">
            <img src="/picture/logo.png" alt="" width={180} />
          </div>
        </div>

        <div className="text-sm">
          <div className="flex justify-between mt-8 mb-8">
            <div className="grid grid-col-2 grid-flow-col gap-4">
              <div className="mb-4">
                <p className="mb-2"><span className="font-semibold">ลูกค้า </span>/ Cusomer</p>
                <p><span className="font-semibold">ผู้ออก </span>/ Issuer</p>
              </div>
              <div>
                <p className="mb-2">{data.customerName}</p>
                <p>{data.freelanceName}</p>
              </div>
            </div>
            <div></div>
            <div className="grid grid-col-2 grid-flow-col gap-4">
              <div>
                <p className="mb-2"><span className="font-semibold">เลขที่</span> / No.</p>
                <p className="mb-2"><span className="font-semibold">วันที่</span> / Date</p>
                <p><span className="font-semibold">เวลา</span> / Time</p>
              </div>
              <div>
                <p className="mb-2">{data.quotationNumber}</p>
                <p className="mb-2">{getDateFormat(new Date())}</p>
                <p>{getCurrentTime()}</p>
              </div>
            </div>
          </div>

          <hr className={style.line} />

          <div className="main-content">
            <table className={style.details_table}>
              <tbody>
                <tr>
                  <td style={{ width: "20%" }}>
                    <h1 className="font-semibold">รหัส</h1>
                    <p>ID No.</p>
                  </td>
                  <td style={{ width: "55%" }}>
                    <h1 className="font-semibold">คำอธิบาย</h1>
                    <p>Description</p>
                  </td>
                  <td style={{ width: "10%", textAlign: "center" }}>
                    <h1 className="font-semibold">จำนวน</h1>
                    <p>Quatity</p>
                  </td>
                  <td style={{ width: "20%", textAlign: "center" }}>
                    <h1 className="font-semibold">ราคา (บาท)</h1>
                    <p>Price</p>
                  </td>
                </tr>
                <tr>
                  <td>{data.quotationNumber}</td>
                  <td>
                    <p>ชื่องาน : {data.name}</p>
                    <ul className={style.list}>
                      <li>สิ่งที่ต้องได้รับ : {data.benefits} </li>
                      <li>การแก้ไข : {data.numberOfEdit}</li>
                      <li>ระยะเวลาการทำงาน : {getDateFormat(data.startDate)} - {getDateFormat(data.endDate)}</li>
                    </ul>
                  </td>
                  <td className="text-center">{data.quatity}</td>
                  <td className="text-center">{data.amount}</td>
                </tr>
              </tbody>
            </table>
            <table className={style.total_price}>
              <tbody className="font-semibold">
                <tr>
                  <td style={{ width: "20%" }}></td>
                  <td style={{ width: "55%" }}></td>
                  <td style={{ width: "10%", textAlign: 'right' }}><p>รวม</p></td>
                  <td style={{ width: "20%", textAlign: 'center' }}><p>{data.amount}</p></td>
                </tr>
              </tbody>
            </table>

            <table className={`${style.summary} font-semibold`}>
              <tbody>
                <tr>
                  <td style={{ width: "70%" }}>สองร้อยห้าสิบบาทถ้วน</td>
                  <td style={{ width: "15%", textAlign: 'right' }}><p>ยอดรวมสุทธิ</p></td>
                  <td style={{ width: "20%", textAlign: 'center' }}><p>{data.amount}</p></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <p className="mt-3">ชำระเงินภายในวันที่ : xx/xx/xxxx</p> */}

          <div className="grid grid-col-2 grid-flow-col gap-4 my-16">
            <div className="text-center leading-7">
              <p className="">ลงชื่อ</p>
              <p className="my-2">___________________________</p>
              <p>(_____________________)</p>
              <p>วันที่ / Date : {getDateFormat(new Date())}</p>
            </div>
            <div className="text-center leading-6">
              <p className="">ลงชื่อ</p>
              <p className="text-lg font-semibold mb-3 mt-6">{data.confirmQuotation}</p>
              <p>( {data.freelanceName} )</p>
              <p>วันที่ / Date : {getDateFormat(new Date())}</p>
            </div>
          </div>
          <div>
            <p className="mb-1"><span className="font-semibold">หมายเหตุ</span> / Remarks</p>
            <p>ใบเสร็จรับเงินนี้จะไม่สมบูรณ์หากยังไม่ได้รับชำระเงิน</p>
          </div>
        </div>


      </div>
      {/* <p>Preview</p>
      <div id="preview">
      </div> */}
    </div>
  );
}

export default QuotationImage