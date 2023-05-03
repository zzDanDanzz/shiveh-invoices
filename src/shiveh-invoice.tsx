import { View, Page, Image, Text, Document } from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";
import ProductDetailsTable from "./components/product-details-table";

const HEADING_CONTENT = {
  TITLE: "صورت حساب فروش کالا و خدمات",
};

function Heading({ date }: { date: Date }) {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
      }}
    >
      <Image source={"/some-logo.png"} style={{ width: 64 }} />
      <Text>{HEADING_CONTENT.TITLE}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text>
          {date.toLocaleDateString("fa-IR").split("").reverse().join("")}
        </Text>
        <Text>تاریخ:</Text>
      </View>
    </View>
  );
}

const InvoiceDocument = ({
  date,
  sellerDetails,
  buyerDetails,
  invoice,
}: {
  date: Date;
  sellerDetails: User;
  buyerDetails: User;
  invoice: Project["invoice"][0];
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
        <Heading date={date} />
        <PersonDetails person={sellerDetails} type="seller" />
        <PersonDetails person={buyerDetails} type="buyer" />
        <ProductDetailsTable invoice={invoice} />
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
