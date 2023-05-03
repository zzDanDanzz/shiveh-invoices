import { BlobProvider, PDFViewer, usePDF } from "@react-pdf/renderer";
import { User } from "./types";
import { invoice, user } from "./mock";
import InvoiceDocument from "./invoice-pdf";
import { useEffect, useState } from "react";

// function PrintRealBtn() {
//   console.log("calling hook");

//   if (instance.loading) return <button>Loading ...</button>;

//   if (instance.error || !instance.url)
//     return <button style={{ color: "red" }}>Loading ..</button>;

//   const pdfWindow = window.open();
//   if (!pdfWindow) return <button style={{ color: "red" }}>Loading ..</button>;

//   pdfWindow.location.href = instance.url;

//   return null;
// }

function Demo() {
  const [isPriting, setIsPriting] = useState(false);

  const document = (
    <InvoiceDocument
      date={new Date()}
      sellerDetails={
        {
          address:
            "تهران، تهران، خیابان شهید بهشتی -  خیابان  خیابان پاکستان - کوچه شهید ساوجی نیا -  پلاک ۵",
          account_type: "legal",
          company: "شرکت شیوه نرم افزار گستر آسیا",
          national_number: "14006138250",
          financial_code: "411558785873",
          postalcode: "1531735614",
          telephone: "(021)42070300",
        } as User
      }
      buyerDetails={user}
      invoice={invoice}
    />
  );

  return (
    <div dir="rtl">
      {isPriting ? (
        <BlobProvider document={document}>
          {({ url, loading }) => (
            <>
              {loading || !url ? (
                <button>Loading...</button>
              ) : (
                <PrintBtn url={url} setIsPriting={setIsPriting}/>
              )}
            </>
          )}
        </BlobProvider>
      ) : (
        <button onClick={() => setIsPriting(true)}>Print</button>
      )}
    </div>
  );
}

function PrintBtn({
  url,
  setIsPriting,
}: {
  url: string;
  setIsPriting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const pdfWindow = window.open();
    if (!pdfWindow) return;
    pdfWindow.location.href = url;
    setIsPriting(false);
  }, [setIsPriting, url]);

  return <button>Print</button>;
}

export default Demo;
