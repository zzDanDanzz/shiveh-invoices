import { Font, PDFViewer } from "@react-pdf/renderer";
import { invoice, user } from "./mock";
import InvoiceDocument from "../shiveh-invoice";
import "./demo.css";
import vR from "./fonts/Vazirmatn-Regular.ttf";
import vB from "./fonts/Vazirmatn-Bold.ttf";
import stamp from "./images/stamp.jpg";
import { digitNormalizer } from "../utils";

Font.register({
  family: "Vazirmatn-Regular",
  src: vR,
});

Font.register({
  family: "Vazirmatn-Bold",
  src: vB,
});

function Demo() {
  return (
    <PDFViewer style={{ height: "100vh", width: "100vw" }}>
      <InvoiceDocument
        stampSrc={stamp}
        sellerDetails={{
          address:
            "استان تهران، شهر تهران، عباس آباد، خیابان بهشتی، خيابان شهید جواد سرافراز، نبش کوچه‌ی نسیم شمال (یکم)، پلاک 9، طبقه 1، واحد 1",
          account_type: "legal",
          company: "شرکت شیوه نرم افزار گستر آسیا",
          national_number: "14006138250",
          financial_code: "411558785873",
          postalcode: "1587613611",
          telephone: "02142070300",
          shaiba_number: `IR${digitNormalizer("۸۸۰۵۵۰۰۱۸۸۰۰۲۰۶۱۵۶۵۷۸۰۰۱")}`,
          account_number: digitNormalizer("۱۸۸-۲-۶۱۵۶۵۷۸-۱"),
          bank_branch:
            "شرکت شیوه نرم‌افزار گستر آسیا - بانک اقتصاد نوین شعبه هفتم تیر ",
        }}
        buyerDetails={user}
        invoice={invoice}
      />
    </PDFViewer>
  );
}

export default Demo;
