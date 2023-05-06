import { View, Page, Image, Text, Document } from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";
import ProductDetailsTable from "./components/product-details-table";
import { Seller, Buyer, Invoice } from "./types";
import { e2p } from "./utils";

function Heading({ invoice, logoSrc }: { invoice: Invoice; logoSrc: string }) {
  const isPaid = invoice.status === "paid";
  const invoiceType = isPaid ? "فاکتور" : "پیش فاکتور";
  const title = `${invoiceType} فروش کالا و خدمات`;

  const dateType = isPaid ? "تاریخ پرداخت" : "تاریخ صدور";
  const invoiceDate = isPaid ? invoice.updated_at : invoice.created_at;
  const dateText = e2p(invoiceDate.split(" ")[0]).split("").reverse().join("");

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
      <Text>{title}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text>{`${dateType}: ${dateText}`}</Text>
      </View>
    </View>
  );
}

function StampAndSignature({ stampSrc }: { stampSrc: string }) {
  return (
    <View
      style={{
        // backgroundColor: "red",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        position: "relative",
        padding: 8,
      }}
    >
      <View
        style={{
          // backgroundColor: "blue",
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text>مهر و امضا فروشنده:</Text>
        <Image source={stampSrc} style={{ width: 100 }} />
      </View>
      <View
        style={{
          // backgroundColor: "green",
          flexDirection: "row-reverse",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Text>مهر و امضا خریدار:</Text>
      </View>
    </View>
  );
}

const InvoiceDocument = ({
  sellerDetails,
  buyerDetails,
  invoice,
  logoSrc,
  stampSrc,
}: {
  sellerDetails: Seller;
  buyerDetails: Buyer;
  invoice: Invoice;
  logoSrc: string;
  stampSrc: string;
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
        <Heading logoSrc={logoSrc} invoice={invoice} />
        <PersonDetails person={sellerDetails} type="seller" />
        <PersonDetails person={buyerDetails} type="buyer" />
        <ProductDetailsTable invoice={invoice} />
        <StampAndSignature stampSrc={stampSrc} />
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
