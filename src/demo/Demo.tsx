import { Font, PDFViewer } from "@react-pdf/renderer";
import { invoice, user, history } from "./mock";
import { Invoice } from "../types";
import InvoiceDocument from "../shiveh-invoice";
import "./demo.css";
import vR from "./fonts/Vazirmatn-Regular.ttf";
import vB from "./fonts/Vazirmatn-Bold.ttf";
import stamp from "./images/stamp.jpg";
import { digitNormalizer } from "../utils";
import moment from "jalali-moment";
Font.register({
  family: "Vazirmatn-Regular",
  src: vR,
});

Font.register({
  family: "Vazirmatn-Bold",
  src: vB,
});
function getPlanDateDiff({ invoice }: { invoice: Invoice }) {
  const index = history.findIndex((currentValue) => {
    return currentValue.from_date === invoice.from_date;
  });
  if (index === -1) return null;
  const fromDateOfCurrInvoiceHistory = history[index].from_date;
  const fromDateOfPrevPlan = history[index + 1]?.from_date;

  const momentDate1 = moment(fromDateOfCurrInvoiceHistory, "jYYYY/jM/jD");
  const momentDate2 = moment(fromDateOfPrevPlan, "jYYYY/jM/jD");
  const dateDiff = momentDate1.diff(momentDate2, "days");
  const remainingDays =
    invoice.details.month === "1"
      ? 30 - dateDiff
      : invoice.details.month === "12" && 360 - dateDiff;
  const balanceWithTax =
    invoice.balance !== undefined ? invoice.balance * 0.09 : undefined;

  return { remainingDays, balanceWithTax };
}

function Demo() {
  // const result = getPlanDateDiff({ invoice });
  // if (result === null) return;
  // const { remainingDays, balanceWithTax } = result;



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
        invoice={mockInvoice}
      />
    </PDFViewer>
  );
}

const mockInvoice = {
  "id": 1284,
  "client_id": 499,
  "details": {
    "plan_id": 22,
    "month": "1",
    "tax_percent": 0.09,
    "tax": 32265
  },
  "from_date": "1402-08-23 13:00:59",
  "to_date": "1402-09-23 13:00:59",
  "is_paid": true,
  "created_at": "1402-08-23 13:00:59",
  "updated_at": "1402-08-23 13:01:21",
  "cost": "358500",
  "type": "mop",
  "invoice_number": null,
  "cost_in_string": "358,500",
  "status": "paid",
  "final_price": 390765,
  "balance": 1500,
  "plan": {
    "id": 22,
    "name": "استارت آپ",
    "cost_per_month": 360000,
    "request_per_day": 15000,
    "cost_per_year": {
      "en": 4320000,
      "fa": "۴۳۲۰۰۰۰"
    }
  },
  "invoice_number_request": null,
  "remainingDays": 30,
  "remainOfPrevPlan": 135
}

export default Demo;
