import { Font, PDFViewer } from "@react-pdf/renderer";
import InvoiceDocument from "../shiveh-invoice";
import "./demo.css";
import vB from "./fonts/Vazirmatn-Bold.ttf";
import vR from "./fonts/Vazirmatn-Regular.ttf";
import BDavat from "./fonts/B Davat.ttf";
import { invoiceDocumentMockProps } from "./mock";
Font.register({
  family: "Vazirmatn-Regular",
  src: vR,
});

Font.register({
  family: "Vazirmatn-Bold",
  src: vB,
});
Font.register({
  family: "B Davat",
  src: BDavat,
});
function Demo() {
  return (
    <PDFViewer style={{ height: "100vh", width: "100vw" }}>
      <InvoiceDocument {...invoiceDocumentMockProps} />
    </PDFViewer>
  );
}

export default Demo;
