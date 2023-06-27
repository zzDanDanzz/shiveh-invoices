import { Font, PDFViewer } from "@react-pdf/renderer";
import { invoice, user } from "./mock";
import InvoiceDocument from "../shiveh-invoice";
import "./demo.css";
import vR from "./fonts/Vazirmatn-Regular.ttf";
import vB from "./fonts/Vazirmatn-Bold.ttf";
import logo from "./images/some-logo.png";
import stamp from "./images/stamp.jpg";

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
        logoSrc={logo}
        sellerDetails={{
          address:
            "استان تهران، شهر تهران، خيابان شهید جواد سرافراز، نبش کوچه نسیم شمال (یکم)، پلاک 9، طبقه 1، واحد 1",
          account_type: "legal",
          company: "شرکت شیوه نرم افزار گستر آسیا",
          national_number: "14006138250",
          financial_code: "411558785873",
          postalcode: "1587613611",
          telephone: "02142070300",
        }}
        buyerDetails={user}
        invoice={invoice}
      />
    </PDFViewer>
  );
}

export default Demo;
