import style from "@/styles/quotation/quotation.module.scss"
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { LOGO_IMAGE } from "@/config/constants";
import { IPurchaseOrderDetail } from "@/models/purchaseOrder";
import jsPDF from 'jspdf';

interface Props {
  data: IPurchaseOrderDetail;
  saveImageData?: Dispatch<SetStateAction<File | undefined>>;
}

const ReceiptImage = (props: Props) => {
  const { data, saveImageData } = props
  useEffect(() => {
    // convertToImage();
    convertToPDF();
    return () => {
      const previewContainer = document.getElementById('preview');
      if (previewContainer) {
        previewContainer.innerHTML = '';
      }
    };
  }, []);

  const convertToPDF = async () => {
    const convertContent = document.getElementById('convert-content');

    if (convertContent && saveImageData) {
      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Convert HTML element to canvas
      const canvas = await html2canvas(convertContent, {
        scale: 6,
        windowWidth: convertContent.offsetWidth * 2,
        windowHeight: convertContent.offsetHeight * 2,
        scrollX: 0,
        scrollY: 0,
      });

      // Add canvas to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 595, 595); // Assuming A4 size, adjust width and height as needed

      // Save the PDF as Blob
      const pdfBlob = pdf.output('blob');

      let fileName = `Receipt.pdf`;
      if (data.order.purchaseOrder.type === 'hired') {
        fileName = `${data.order.quotation?.name}_receipt.pdf`;
      }
      if (data.order.purchaseOrder.type === 'readyMade') {
        fileName = `${data.order.purchaseOrderItem?.name}_receipt.pdf`;
      }

      // Create a File object from Blob
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
      saveImageData(file);
    }
  };

  const convertToImage = async () => {
    const convertContent = document.getElementById('convert-content');

    if (convertContent) {
      const canvas = await html2canvas(convertContent, {
        scale: 5,
        useCORS: true,
        scrollX: 10,
        scrollY: 10
      });

      if (saveImageData) {
        canvas.toBlob(blob => {
          if (blob) {
            let fileName = `Receipt.png`;
            if (data.order.purchaseOrder.type === 'hired') {
              fileName = `${data.order.quotation?.name}_receipt.png`;
            }
            if (data.order.purchaseOrder.type === 'readyMade') {
              fileName = `${data.order.purchaseOrderItem?.name}_receipt.png`;
            }
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
            <p>ใบเสร็จรับเงิน</p>
            <p className="ml-1 mt-1">Receipt</p>
          </div>
          <div></div>
          {/* <div className="mt-5">
            <img src={LOGO_IMAGE} alt="" width={180} />
          </div> */}
        </div>

        <div className="text-sm">
          <div className="flex justify-between mt-8 mb-8">
            <div className="grid grid-col-2 grid-flow-col gap-4">
              <div className="mb-4">
                <p className="mb-2"><span className="font-semibold">ลูกค้า </span>/ Cusomer</p>
                {/* <p><span className="font-semibold">ผู้ออก </span>/ Issuer</p> */}
              </div>
              <div>
                <p className="mb-2">{data.customer.firstname} {data.customer.lastname}</p>
                {/* <p>{data.freelance.firstname}</p> */}
              </div>
            </div>
            <div></div>
            <div className="grid grid-col-2 grid-flow-col gap-4">
              <div>
                {/* <p className="mb-2"><span className="font-semibold">เลขที่</span> / No.</p> */}
                <p className="mb-2"><span className="font-semibold">วันที่</span> / Date</p>
                <p><span className="font-semibold">เวลา</span> / Time</p>
              </div>
              <div>
                {/* <p className="mb-2">{data.freelance.firstname}</p> */}
                <p className="mb-2">{getDateFormat(new Date())}</p>
                <p>{getCurrentTime()}</p>
              </div>
            </div>
          </div>

          <hr className={style.line} />

          <div className="flex justify-between mt-8 mb-8">
            <div className="grid grid-col-2 grid-flow-col gap-4">
              <div className="mb-4">
                <p className="mb-2"><span className="font-semibold">ผู้ออก </span>/ Issuer</p>
                <p><span className="font-semibold"> </span></p>
              </div>
              <div>
                <p className="mb-2">{data.freelance.firstname} {data.freelance.lastname}</p>
                <p>{data.freelance.address}</p>
              </div>
            </div>
          </div>

          <div className="main-content">
            <table className={style.details_table}>
              <tbody>
                <tr>
                  {/* <td style={{ width: "20%" }}>
                    <h1 className="font-semibold">รหัส</h1>
                    <p>ID No.</p>
                  </td> */}
                  <td style={{ width: "55%" }}>
                    <h1 className="font-semibold">คำอธิบาย</h1>
                    <p>Description</p>
                  </td>
                  <td style={{ width: "10%", textAlign: "center" }}>
                    <h1 className="font-semibold">จำนวน</h1>
                    <p>Quatity</p>
                  </td>
                  <td style={{ width: "17.5%", textAlign: "center" }}>
                    <h1 className="font-semibold">ราคาต่อหน่วย</h1>
                    <p>Unit Pirce</p>
                  </td>
                  <td style={{ width: "17.5%", textAlign: "center" }}>
                    <h1 className="font-semibold">ราคา</h1>
                    <p>Price</p>
                  </td>
                </tr>
                <tr>
                  {/* <td>{data.freelance.firstname}</td> */}
                  <td>
                    {data.order.purchaseOrder.type === 'hired' && (
                      <>
                        <p>ชื่องาน : {data.order.quotation?.name}</p>
                        <ul className={style.list}>
                          <li>สิ่งที่ต้องได้รับ : {data.order.quotation?.benefits}</li>
                          <li>การแก้ไข : {data.order.quotation?.numberOfEdit}</li>
                          {(data.order.quotation?.startDate && data.order.quotation?.endDate) && (
                            <li>ระยะเวลาการทำงาน : {getDateFormat(data.order.quotation?.startDate)} - {getDateFormat(data.order.quotation?.endDate)}</li>
                          )}
                          {data.order.quotation?.note && (
                            <li>หมายเหตุเพิ่มเติม : {data.order.quotation?.note}</li>
                          )}
                        </ul>
                      </>
                    )}
                    {data.order.purchaseOrder.type === 'readyMade' && (
                      <>
                        <p>ชื่องาน : {data.order.purchaseOrderItem?.name}</p>
                        <ul className={style.list}>
                          <li>รายละเอียด : {data.order.purchaseOrderItem?.description}</li>
                        </ul>
                      </>
                    )}
                  </td>
                  {data.order.purchaseOrder.type === 'hired' && (
                    <>
                      <td className="text-center">{data.order.quotation?.quatity}</td>
                      <td className="text-center">{data.order.quotation?.amount}</td>
                      <td className="text-center">{data.order.quotation?.amount}</td>
                    </>
                  )}

                  {data.order.purchaseOrder.type === 'readyMade' && (
                    <>
                      <td className="text-center">{data.order.purchaseOrderItem?.quantity}</td>
                      <td className="text-center">{data.order.purchaseOrderItem?.price}</td>
                      <td className="text-center">{data.order.purchaseOrderItem?.price}</td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
            <div className="flex">
              <div className="mt-3" style={{ width: '40%' }}>
                <p>หมายเหตุ / Remarks</p>
                <ul className={style.list}>
                  <li>ใบเสร็จรับเงินนี้จะไม่สมบูรณ์หากยังไม่ได้รับชำระเงิน</li>
                  <li>จำนวนเงินรวมทั้งสิ้นมีการรวมภาษีมูลค่าเพิ่ม 7% แล้ว</li>
                </ul>
              </div>
              <div style={{ width: '60%' }}>
                <table className={style.total_price}>
                  <tbody className="font-semibold">
                    <tr>
                      <td style={{ width: "70%", textAlign: 'right' }}><p>จำนวนเงินรวมทั้งสิ้น (บาท) / Grand Total</p></td>
                      <td style={{ width: "30%", textAlign: 'right' }}>
                        {data.order.purchaseOrder.type === 'hired' && (
                          <p>{data.order.quotation?.amount}</p>
                        )}
                        {data.order.purchaseOrder.type === 'readyMade' && (
                          <p>{data.order.purchaseOrderItem?.price}</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className={`${style.summary} font-semibold`}>
                  <tbody>
                    <tr className="mt-2">
                      <td style={{ width: "50%", paddingTop: '6px' }}>สองร้อยห้าสิบบาทถ้วน</td>
                      <td style={{ width: "50%", textAlign: 'right', paddingTop: '6px' }}><p>สองร้อยห้าสิบบาทถ้วน</p></td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
          <hr className={`${style.line} mt-6`} />
          <div className="flex justify-between mt-6">
            <div className=" leading-7">
              <p>การชำระเงิน / Payment</p>
              <div className="flex items-center">
                <input type="radio" checked={data.order.purchaseOrder.paymentMethod === 'promptpay'} disabled />
                <label htmlFor="huey" className="ml-2">โอน</label>
              </div>
              <div className="flex items-center">
                <input type="radio" checked={data.order.purchaseOrder.paymentMethod === 'creditCard'} disabled />
                <label htmlFor="dewey" className="ml-2">เครดิตการ์ด / Credit Card</label>
              </div>
            </div>
            <div className="text-center leading-6">
              <p className="">ลงชื่อ</p>
              <p className="text-lg font-semibold mb-3 mt-4">{data.freelance.firstname} {data.freelance.lastname}</p>
              <p>( {data.freelance.firstname} {data.freelance.lastname} )</p>
              <p>วันที่ / Date : {getDateFormat(new Date())}</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default ReceiptImage