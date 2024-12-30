import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import PersonDetails from "./components/person-details";

import cloneDeep from "lodash.clonedeep";
import MapLogo from "./components/MapLogo";
import ProductDetailsTable from "./components/product-details-table";
import TextField from "./components/text-field";
import { Buyer, Invoice, Seller } from "./types";
import { dateNormalizer, digitNormalizer } from "./utils";

function InvoiceInfo({ invoice }: { invoice: Invoice }) {
  const { status, updated_at, created_at, id, invoice_number } = invoice;
  const isPaid = status === "paid";
  const dateTitle = isPaid ? "تاریخ پرداخت :" : "تاریخ :";
  const dateValue = dateNormalizer(isPaid ? updated_at : created_at);

  const invoiceIdTitle = "شناسه پرداخت :";
  const invoiceIdValue = digitNormalizer(id);

  const invoiceNumberTitle = "شماره فاکتور : ";
  const invoiceNumberValue = invoice_number
    ? digitNormalizer(invoice_number)
    : "-";
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "column", gap: 3 }}>
        <View>
          {invoiceNumberValue && (
            <View
              style={{
                flexDirection: "column",
                gap: 7,
                justifyContent: "center",
                alignItems: "center",
                width: "152px",
                height: "60px",
                border: 1,
              }}
            >
              <Text
                style={{ fontFamily: "Vazirmatn-Bold" }}
              >{`${invoiceNumberTitle}`}</Text>
              <Text
                style={{
                  fontFamily: "B Davat",
                  fontWeight: "bold",
                  color: invoice_number ? "red" : "black",
                  fontSize: 17,
                }}
              >{`${invoiceNumberValue}`}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "152px",
            height: "60px",
            border: 1,
            gap: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Text>{`${dateTitle}`}</Text>
            <Text>{`${dateValue}`}</Text>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Text>{`${invoiceIdTitle}`}</Text>
            <Text>{`${invoiceIdValue}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
function Heading({ invoice }: { invoice: Invoice }) {
  const { status } = invoice;
  const isPaid = status === "paid";
  const invoiceType = isPaid ? "فاکتور" : "پیش فاکتور";
  const title = `${invoiceType} فروش کالا و خدمات`;

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 208,
        paddingBottom: 5,
      }}
    >
      <MapLogo />
      <Text style={{ fontFamily: "Vazirmatn-Bold", fontSize: 12 }}>
        {title}
      </Text>
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
          width: "51%",
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
          width: "51%",
          padding: 8,
        }}
      >
        <Text>مهر و امضا خریدار:</Text>
      </View>
    </View>
  );
}

const tomanToRiyal = (n: number) => n * 10;

const invoiceFormatter = (inv: Invoice) => {
  const invCopy = cloneDeep(inv);
  invCopy.plan.cost_per_month = tomanToRiyal(inv.plan.cost_per_month);
  invCopy.plan.cost_per_year.en = tomanToRiyal(inv.plan.cost_per_year.en);
  invCopy.final_price = tomanToRiyal(inv.final_price);
  invCopy.balance = tomanToRiyal(inv.balance);
  invCopy.details.tax = tomanToRiyal(inv.details.tax);
  invCopy.remainOfPrevPlan = tomanToRiyal(inv.remainOfPrevPlan);
  invCopy.discount_value = tomanToRiyal(inv.discount_value);
  return invCopy;
};

export type InvoiceDocumentProps = {
  sellerDetails: Seller;
  buyerDetails: Buyer;
  invoice: Invoice;
  stampSrc: string;
};

const InvoiceDocument = ({
  sellerDetails,
  buyerDetails,
  invoice,
  stampSrc,
}: InvoiceDocumentProps) => {
  const riyalizedInvoice = invoiceFormatter(invoice);
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
        <Heading invoice={riyalizedInvoice} />
        <View style={{ display: "flex", flexDirection: "row-reverse" }}>
          <View>
            <PersonDetails person={sellerDetails} type="seller" />
            <PersonDetails person={buyerDetails} type="buyer" />
          </View>
          <View>
            <InvoiceInfo invoice={riyalizedInvoice} />
          </View>
        </View>
        <ProductDetailsTable invoice={riyalizedInvoice} />
        <StampAndSignature
          stampSrc={stampSrc}
          isPaid={riyalizedInvoice.is_paid}
        />
        <DescriptionRow
          invoice={invoice}
          planName={riyalizedInvoice.plan.name}
          type={riyalizedInvoice.type}
          fromDate={dateNormalizer(riyalizedInvoice.from_date)}
          toDate={dateNormalizer(riyalizedInvoice.to_date)}
          shaibaNumber={sellerDetails.shaiba_number}
          accountNumber={sellerDetails.account_number}
          bankBranch={sellerDetails.bank_branch}
          remainingDays={riyalizedInvoice.remainingDays}
          remainOfPrevPlan={riyalizedInvoice.remainOfPrevPlan}
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
  remainingDays,
  remainOfPrevPlan,
  invoice,
}: {
  type: string;
  planName: string;
  fromDate: string;
  toDate: string;
  shaibaNumber: string;
  accountNumber: string;
  bankBranch: string;
  remainingDays?: number;
  remainOfPrevPlan?: number;
  invoice: Invoice;
}) {
  const isRenewal = type === invoiceTypes.EXTEND_SUB;

  const description = !isRenewal
    ? `ارتقا از ${invoice?.previousPlanName} به ${planName}`
    : `تمدید پلن ${planName}`;

  const date = `از ${fromDate} تا ${toDate}`;

  return (
    <View style={{ display: "flex", flexDirection: "row-reverse" }}>
      <View
        style={{
          flexDirection: "row-reverse",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          border: "1px solid black",
          padding: "5px",
          backgroundColor: "#E5E7EC",
        }}
      >
        <Text style={{ transform: "rotate(-90deg)" }}>توضیحات</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "right",
          paddingHorizontal: 20,
          border: 1,
          marginRight: 3,
          height: `${remainOfPrevPlan && remainingDays ? "80" : "60"}`,
          width: "100%",
          gap: 10,
        }}
      >
        <View
          style={{
            marginVertical: 7,
            fontFamily: "Vazirmatn-Bold",
            gap: 10,
          }}
        >
          <Text>{bankBranch}</Text>
          <View
            style={{
              flexDirection: "row-reverse",
            }}
          >
            <Text>*</Text>
            <Text>تمام قیمت ها به ریال است.</Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 7,

            gap: 10,
          }}
        >
          <TextField label={"شماره حساب "} value={accountNumber} />
          <TextField label="تاریخ" value={date} />
        </View>
        <View
          style={{
            marginVertical: 7,
            gap: 10,
          }}
        >
          <TextField label={"شماره شبا "} value={shaibaNumber} />
          <TextField label="نوع پلن" value={description} />
          {remainingDays && remainOfPrevPlan && (
            <View style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Text>*</Text>
              <View style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Text>مانده از پلن قبلی ، </Text>
                <Text> {digitNormalizer(remainingDays)} </Text>
                <Text> روز معادل </Text>
                <Text>
                  {" "}
                  {digitNormalizer(
                    Math.round(remainOfPrevPlan).toLocaleString()
                  )}{" "}
                </Text>
                <Text> ریال می‌باشد. </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default InvoiceDocument;
