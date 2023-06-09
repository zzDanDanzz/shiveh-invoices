import { View, Page, Image, Text, Document } from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";
import ProductDetailsTable from "./components/product-details-table";
import { Seller, Buyer, Invoice } from "./types";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function Heading({ invoice, logoSrc }: { invoice: Invoice; logoSrc: string }) {
  const isPaid = invoice.status === "paid";
  const invoiceType = isPaid ? "فاکتور" : "پیش فاکتور";
  const title = `${invoiceType} فروش کالا و خدمات`;

  const dateType = isPaid ? "تاریخ پرداخت" : "تاریخ صدور";
  const invoiceDate = isPaid ? invoice.updated_at : invoice.created_at;
  const dateText = digitsEnToFa(invoiceDate.split(" ")[0])
    .split("")
    .reverse()
    .join("");

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

function StampAndSignature({
  stampSrc,
  isPaid,
}: {
  stampSrc: string;
  isPaid: boolean;
}) {
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
        {isPaid ? (
          <Image source={stampSrc} style={{ width: 100 }} />
        ) : (
          <View style={{ height: 100 }}></View>
        )}
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

const tomanToRiyal = (n: number) => n * 10;
const invoiceFormatter = (inv: Invoice) => ({
  ...inv,
  plan: {
    ...inv.plan,
    cost_per_month: tomanToRiyal(inv.plan.cost_per_month),
  },
  final_price: tomanToRiyal(inv.final_price),
  details: {
    ...inv.details,
    tax: tomanToRiyal(inv.details.tax),
  },
});

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
}) => {
  const formattedInvoice: Invoice = invoiceFormatter(invoice);

  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={{
          fontFamily: "Vazirmatn-Regular",
          fontSize: 8,
        }}
      >
        <View style={{ border: 1, margin: 10,  }}>
          <Heading logoSrc={logoSrc} invoice={formattedInvoice} />
          <PersonDetails person={sellerDetails} type="seller" />
          <PersonDetails person={buyerDetails} type="buyer" />
          <ProductDetailsTable invoice={formattedInvoice} />
          <StampAndSignature stampSrc={stampSrc} isPaid={invoice.is_paid} />
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
