import { View, Page, Image, Text, Document } from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";
import ProductDetailsTable from "./components/product-details-table";
import { Seller, Buyer, Invoice } from "./types";
import { e2p } from "./utils";

const HEADING_CONTENT = {
  TITLE: "صورت حساب فروش کالا و خدمات",
};

function Heading({ date, logoSrc }: { date: string; logoSrc: string }) {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
      }}
    >
      <Image source={logoSrc} style={{ width: 64 }} />
      <Text>{HEADING_CONTENT.TITLE}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text>{e2p(date.split(" ")[0]).split("").reverse().join("")}</Text>
        <Text>تاریخ:</Text>
      </View>
    </View>
  );
}

const InvoiceDocument = ({
  sellerDetails,
  buyerDetails,
  invoice,
  logoSrc,
}: {
  sellerDetails: Seller;
  buyerDetails: Buyer;
  invoice: Invoice;
  logoSrc: string;
}) => (
  <Document>
    <Page
      size="A4"
      orientation="landscape"
      style={{
        fontFamily: "Vazirmatn-Regular",
        fontSize: 8,
      }}
    >
      <View style={{ border: 1, margin: 10, borderRadius: 8 }}>
        <Heading logoSrc={logoSrc} date={invoice.updated_at} />
        <PersonDetails person={sellerDetails} type="seller" />
        <PersonDetails person={buyerDetails} type="buyer" />
        <ProductDetailsTable invoice={invoice} />
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
