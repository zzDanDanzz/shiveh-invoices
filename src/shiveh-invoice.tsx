import {
  View,
  Page,
  Image,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";
import ProductDetailsTable from "./components/product-details-table";
import { Seller, Buyer, Invoice } from "./types";
import { dateNormalizer, digitNormalizer } from "./utils";
import TextField from "./components/text-field";
const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "5%",
    height: "60px",
    border: "1px solid black",
    padding: "5px",
    backgroundColor: "#E5E7EC",
  },
});

function Heading({ invoice}: { invoice: Invoice}) {
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
        border: 1,
        marginVertical: 4,
        height: 100,
      }}
    >
      <View
        style={{
          flexDirection: "row-reverse",
          gap: 10,
          padding: 8,
          width: "50%",
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
          borderRight: 1,
          width: "50%",
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
          padding: "15px 40px 20px 40px",
        }}
      >
        {/* <Heading logoSrc={logoSrc} invoice={formattedInvoice} /> */}
        <PersonDetails
          person={sellerDetails}
          type="seller"
        />
        <PersonDetails
          person={buyerDetails}
          type="buyer"
        />
        <ProductDetailsTable invoice={formattedInvoice} />
        <StampAndSignature stampSrc={stampSrc} isPaid={invoice.is_paid} />
        <DescriptionRow
          planName={invoice.plan.name}
          type={invoice.type}
          fromDate={dateNormalizer(invoice.from_date)}
          toDate={dateNormalizer(invoice.to_date)}
          shaibaNumber={sellerDetails.shaiba_number}
          accountNumber={sellerDetails.account_number}
          bankBranch={sellerDetails.bank_branch}
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
  shaibaNumber,
  accountNumber,
  bankBranch,
}: {
  type: string;
  planName: string;
  fromDate: string;
  toDate: string;
  shaibaNumber: string;
  accountNumber: string;
  bankBranch: string;
}) {
  const isRenewal = type === invoiceTypes.EXTEND_SUB;
  const description = 
  `${
    isRenewal ? "تمدید" : "ارتقا"
  } به پلن ${planName}`;
  const date = `از ${fromDate} تا ${toDate}`;
  return (
    <View style={{ display: "flex", flexDirection: "row-reverse" }}>
      <View style={styles.title}>
        <Text style={{ transform: "rotate(-90deg)" }}>توضیحات</Text>
      </View>
      <View
        style={{
          textAlign: "right",
          padding: 7,
          border: 1,
          marginRight: 3,
          width: "100%",
          gap: 15,
        }}
      >
        <View
          style={{ display: "flex", flexDirection: "row-reverse", gap: 20 }}
        >
          <View
            style={{ display: "flex", flexDirection: "row-reverse", gap: 4 }}
          >
            <TextField label={"شماره شبا "} value={shaibaNumber} />
          </View>
          <View
            style={{ display: "flex", flexDirection: "row-reverse", gap: 4 }}
          >
            <TextField label={"شماره حساب "} value={accountNumber} />
          </View>
          <Text style={{ fontFamily: "Vazirmatn-Bold" }}>{bankBranch}</Text>
        </View>
        <View
          style={{ display: "flex", flexDirection: "row-reverse",gap:55 }}
        >
          <TextField label="نوع پلن" value={description}/>
          <TextField label="تاریخ" value={date} />
          <View style={{flexDirection:'row-reverse',gap:1,fontFamily:'Vazirmatn-Bold'}}>
            <Text>*</Text>
            <Text>تمام قیمت ها به ریال است.</Text>
          </View>
          
        </View>
      </View>
    </View>
  );
}

export default InvoiceDocument;
