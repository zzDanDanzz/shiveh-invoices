import { View, Page, Image, Text, Document } from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";
import ProductDetailsTable from "./components/product-details-table";
import { Seller, Buyer, Invoice } from "./types";
import { dateNormalizer, digitNormalizer } from "./utils";

function Heading({ invoice, logoSrc }: { invoice: Invoice; logoSrc: string }) {
  const { status, updated_at, created_at, id, invoice_number } = invoice;
  
  const isPaid = status === "paid";
  const invoiceType = isPaid ? "فاکتور" : "پیش فاکتور";
  const title = `${invoiceType} فروش کالا و خدمات`;

  const dateTitle = isPaid ? "تاریخ پرداخت" : "تاریخ صدور";
  const dateValue = dateNormalizer(isPaid ? updated_at : created_at);

  const invoiceIdTitle = "شناسه پرداخت";
  const invoiceIdValue = digitNormalizer(id);

  const invoiceNumberTitle = "شماره فاکتور رسمی";
  const invoiceNumberValue = invoice_number
    ? digitNormalizer(invoice_number)
    : null;

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
      <View style={{ flexDirection: "column", gap: 6 }}>
        <View
          style={{
            flexDirection: "row-reverse",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text>{`${dateTitle}`}</Text>
          <Text>{`${dateValue}`}</Text>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text>{`${invoiceIdTitle}`}</Text>
          <Text>{`${invoiceIdValue}`}</Text>
        </View>
        {invoiceNumberValue && (
          <View
            style={{
              flexDirection: "row-reverse",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Text>{`${invoiceNumberTitle}`}</Text>
            <Text>{`${invoiceNumberValue}`}</Text>
          </View>
        )}
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
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 10,
          padding: 8,
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
          flexDirection: "row-reverse",
          alignItems: "center",
          width: "50%",
          borderRight: 1,
          padding: 8,
        }}
      >
        <Text>مهر و امضا خریدار:</Text>
      </View>
    </View>
  );
}

const tomanToRiyal = (n: number) => n * 10;
const invoiceFormatter = (inv: Invoice): Invoice => ({
  ...inv,
  plan: {
    ...inv.plan,
    cost_per_month: tomanToRiyal(inv.plan.cost_per_month),
    cost_per_year: {
      ...inv.plan.cost_per_year,
      en: tomanToRiyal(inv.plan.cost_per_year.en),
    },
  },
  final_price: tomanToRiyal(inv.final_price),
  balance: tomanToRiyal(inv.balance),
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
          padding:'15px 40px 20px 40px'
        }}
      >
        {/* <Heading logoSrc={logoSrc} invoice={formattedInvoice} /> */}
        <PersonDetails person={sellerDetails} invoice={formattedInvoice} type="seller" />
        <PersonDetails person={buyerDetails} invoice={formattedInvoice} type="buyer" />
        <ProductDetailsTable invoice={formattedInvoice}  />
        <StampAndSignature stampSrc={stampSrc} isPaid={invoice.is_paid} />
        <DescriptionRow
          planName={invoice.plan.name}
          type={invoice.type}
          fromDate={dateNormalizer(invoice.from_date)}
          toDate={dateNormalizer(invoice.to_date)}
        />
      </Page>
    </Document>
  );
};

const invoiceTypes = {
  EXTEND_SUB: "eop",
  INTIALIZE_SUB: "mop",
};

function DescriptionRow({
  type,
  planName,
  fromDate,
  toDate,
}: {
  type: string;
  planName: string;
  fromDate: string;
  toDate: string;
}) {
  const isRenewal = type === invoiceTypes.EXTEND_SUB;
  const description = `${
    isRenewal ? "تمدید" : "ارتقا"
  } به پلن ${planName} از تاریخ ${fromDate} تا تاریخ ${toDate}`;

  return (
    <View style={{ textAlign: "right", padding: 2, borderTop: 1 }}>
      <View style={{ display: "flex", flexDirection: "row-reverse", gap: 6 }}>
        <Text>توضیحات:</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

export default InvoiceDocument;
