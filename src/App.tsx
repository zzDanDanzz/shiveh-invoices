import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Line,
  Svg,
} from "@react-pdf/renderer";

import { User } from "./types";
import { user } from "./mock";

Font.register({
  family: "Vazirmatn-Regular",
  src: "/fonts/Vazirmatn-Regular.ttf",
});

Font.register({
  family: "Vazirmatn-Bold",
  src: "/fonts/Vazirmatn-Bold.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Vazirmatn-Regular",
    fontSize: 8,
  },
});

const p = "۰۱۲۳۴۵۶۷۸۹";
const e2p = (s: string) => s.replace(/\d/g, (d) => p[Number(d)]);

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

function TextField({
  label,
  value,
  faNums = false,
}: {
  label: string;
  value: string;
  faNums?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        gap: 8,
      }}
    >
      <Text style={{ fontFamily: "Vazirmatn-Bold" }}>:{label}</Text>
      <Text>{faNums ? e2p(value).split("").reverse().join("") : value}</Text>
    </View>
  );
}

function NumberField({ label, value }: { label: string; value: number }) {
  const nums = e2p(value.toString()).split("");

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        gap: 8,
      }}
    >
      <Text style={{ fontFamily: "Vazirmatn-Bold" }}>:{label}</Text>

      <View style={{ flexDirection: "row" }}>
        {nums.map((n, i) => (
          <View
            style={{ border: 1, textAlign: "center" }}
            key={n.toString() + i}
          >
            <Text style={{ width: 12 }}>{n}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PersonDetails({
  person,
  type,
}: {
  person: User;
  type: "buyer" | "seller";
}) {
  let accountType, name, nationalCode, nationalCodeLabel, phoneNumLabel;
  const isNaturalPerson = person.account_type === "natural";

  if (isNaturalPerson) {
    accountType = "حقیقی";
    name = person.name;
    nationalCode = person.national_identity;
    nationalCodeLabel = "شماره ملی";
    phoneNumLabel = "تلفن ثابت";
  } else {
    accountType = "حقوقی";
    name = person.company;
    nationalCode = person.national_number;
    nationalCodeLabel = "شماره ثبت";
    phoneNumLabel = "تلفن ثابت / نمابر";
  }

  return (
    <View style={{ borderTop: 1, padding: 8, flexDirection: "column", gap: 8 }}>
      <View
        style={{
          flexDirection: "row-reverse",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Text>{"مشخصات"}</Text>
        <Text>{type === "buyer" ? "خریدار" : "فروشنده"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              gap: 8,
            }}
          >
            {!isNaturalPerson && (
              <NumberField
                label={"شماره اقتصادی"}
                value={person.financial_code || `${"کد اقتصادی"} موجود نیست`}
              />
            )}
            <NumberField label={nationalCodeLabel} value={nationalCode} />
          </View>
          <NumberField
            label={"کد پستی"}
            value={person.postalcode || `${"کد پستی"} موجود نیست`}
          />
        </View>
        <View style={{ flexDirection: "column", gap: 6 }}>
          <TextField
            label={`نام شخص ${accountType}`}
            value={name || `${"نام"} موجود نیست`}
          />
          <TextField
            label={"نشانی"}
            value={person.address || `${"آدرس"} موجود نیست`}
          />
          <TextField
            label={phoneNumLabel}
            value={person.telephone || `${phoneNumLabel} موجود نیست`}
            faNums
          />
        </View>
      </View>
    </View>
  );
}

const KEYS = {
  description: "description",
  quantity: "quantity",
  pricePerUnit: "price_per_unit",
  totalPrice: "total_price",
  discount: "discount",
  priceAfterDiscount: "price_after_discount",
  taxSum: "tax_sum",
  totalPriceWithTaxes: "total_price_with_taxes",
} as const;

const productTableHeadings = [
  { title: "شرح کالا یا خدمات", key: KEYS.description },
  { title: "تعداد /  مقدار", key: KEYS.quantity },
  { title: "مبلغ واحد", key: KEYS.pricePerUnit },
  { title: "مبلغ کل", key: KEYS.totalPrice },
  { title: "مبلغ تخفیف", key: KEYS.discount },
  { title: "مبلغ کل پس از تخفیف", key: KEYS.priceAfterDiscount },
  { title: "جمع مالیات و عوارض", key: KEYS.taxSum },
  {
    title: "جمع مبلغ کل بعلاوه مالیات و عوارض",
    key: KEYS.totalPriceWithTaxes,
  },
];

const products = [
  {
    [KEYS.description]: "ارائه میزبانی سرویس نقشه یک ساله",
    [KEYS.pricePerUnit]: "10000",
    [KEYS.totalPrice]: "10000",
    [KEYS.taxSum]: "10000",
    [KEYS.totalPriceWithTaxes]: "10000",
  },
];

function Table({ children }: React.PropsWithChildren) {
  return (
    <View style={{ padding: 16, flexDirection: "row-reverse" }}>
      {children}
    </View>
  );
}

interface TDataProps extends React.PropsWithChildren {
  bold?: boolean;
}

function TData({ children, bold = false }: TDataProps) {
  // const style: Style = bold ? { fontFamily: "Vazirmatn-Bold" } : undefined;
  return (
    <Text
      style={{
        fontFamily: bold ? "Vazirmatn-Bold" : undefined,
        paddingHorizontal: 12,
      }}
    >
      {children}
    </Text>
  );
}

function TCol({ children }: React.PropsWithChildren) {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "yellow",
        alignItems: "flex-end",
        gap: 6,
        borderRight: 1,
        position: "relative",
      }}
    >
      {children}
    </View>
  );
}

function ProductDetailsTable() {
  return (
    <View style={{ marginTop: 100 }}>
      <View>
        <Text>
          مشخصات کالا یا خدمات مورد معامله (تمامی مبالغ به ریال هستند)
        </Text>
      </View>
      <Table>
        {productTableHeadings.map((heading) => (
          <TCol key={heading.title}>
            <TData bold>{heading.title}</TData>
            <Svg height={1} width={"100%"}>
              <Line
                x1={0}
                x2={300}
                y1={0}
                y2={0}
                strokeWidth={1}
                stroke="red"
              />
            </Svg>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TData>{products[0][heading.key] ?? ""}</TData>
          </TCol>
        ))}
      </Table>
    </View>
  );
}

const InvoiceDocument = ({
  date,
  sellerDetails,
  buyerDetails,
}: {
  date: Date;
  sellerDetails: User;
  buyerDetails: User;
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={{ border: 1, margin: 10, borderRadius: 8 }}>
        <Heading date={date} />
        <PersonDetails person={sellerDetails} type="seller" />
        <PersonDetails person={buyerDetails} type="buyer" />
        <ProductDetailsTable />
      </View>
    </Page>
  </Document>
);

function App() {
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
        />
      </PDFViewer>
    </div>
  );
}

export default App;
