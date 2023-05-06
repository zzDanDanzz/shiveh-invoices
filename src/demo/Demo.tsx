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
            "تهران، تهران، خیابان شهید بهشتی -  خیابان  خیابان پاکستان - کوچه شهید ساوجی نیا -  پلاک ۵",
          account_type: "legal",
          company: "شرکت شیوه نرم افزار گستر آسیا",
          national_number: "14006138250",
          financial_code: "411558785873",
          postalcode: "1531735614",
          telephone: "(021)42070300",
        }}
        buyerDetails={user}
        invoice={invoice}
      />
    </PDFViewer>
  );
}

export default Demo;
