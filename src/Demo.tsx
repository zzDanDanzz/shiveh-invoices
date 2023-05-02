import { PDFViewer } from "@react-pdf/renderer";
import { User } from "./types";
import { invoice, user } from "./mock";
import InvoiceDocument from "./invoice-pdf";

function Demo() {
  return (
    <div dir="rtl">
      <PDFViewer className="w-screen h-screen">
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
      </PDFViewer>
    </div>
  );
}

export default Demo;
