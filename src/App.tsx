import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

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
    fontSize: 12,
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

const SELLER_FORM = {
  DETAILS: "مشخصات فروشنده",
  NAME: "نام شخص حقیقی /  حقوقی",
};

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
      {/* <Text>{e2p(value.toString())}</Text> */}

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
  person: {
    name: string;
  };
  type: "buyer" | "seller";
}) {
  return (
    <View style={{ borderTop: 1, padding: 8, flexDirection: "column", gap: 8 }}>
      <View
        style={{
          flexDirection: "row-reverse",
          gap: 4,
          justifyContent: "center",
          fontSize: 8,
        }}
      >
        <Text>{"مشخصات"}</Text>
        <Text>{type === "buyer" ? "خریدار" : "فروشنده"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          fontSize: 8,
          gap: 24,
        }}
      >
        <View>
          <TextField label={SELLER_FORM.NAME} value={person.name} />
          <View style={{ flexDirection: "row-reverse", gap: 24 }}>
            <TextField label={"استان"} value={"تهران"} />
            <TextField label={"شهرستان"} value={"تهران"} />
            <TextField label={"شهر"} value={"تهران"} />
          </View>
          <TextField
            label={"نشانی"}
            value={
              "خیابان شهید بهشتی -  خیابان  خیابان پاکستان - کوچه شهید ساوجی نیا -  پلاک ۵"
            }
          />
        </View>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <NumberField label={"شماره اقتصادی"} value={411558785873} />
          <NumberField label={"شماره ثبت / شماره ملی"} value={14006138250} />
        </View>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <NumberField label={"کد پستی"} value={411558785873} />
          <TextField
            label={"شماره تلفن / نمابر"}
            value={"(021)42070300"}
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
  { title: "مبلغ واحد )ریال(", key: KEYS.pricePerUnit },
  { title: "مبلغ کل )ریال(", key: KEYS.totalPrice },
  { title: "مبلغ تخفیف )ریال(", key: KEYS.discount },
  { title: "مبلغ کل پس از تخفیف )ریال(", key: KEYS.priceAfterDiscount },
  { title: "جمع مالیات و عوارض )ریال(", key: KEYS.taxSum },
  {
    title: "جمع مبلغ کل بعلاوه مالیات و عوارض )ریال(",
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

function THead({ children }: React.PropsWithChildren) {
  return <Text style={{ borderBottom: 1 }}>{children}</Text>;
}

function TData({ children }: React.PropsWithChildren) {
  return <Text>{children}</Text>;
}

function TCol({ children }: React.PropsWithChildren) {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "yellow",
        alignItems: "flex-end",
        gap: 6,
        // paddingHorizontal: 10,
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
    <View style={{ fontSize: 8 }}>
      <View>
        <Text>مشخصات کالا یا خدمات مورد معامله</Text>
      </View>
      <Table>
        {/* <TRow>
          {productTableHeadings.map((heading) => (
            <THead>{heading.title}</THead>
          ))}
          {productTableHeadings.map((heading) => {
            if (Object.hasOwn(products[0], heading.key)) {
              return <TData>{products[0][heading.key]}</TData>;
            }
            return <TData></TData>;
          })}
        </TRow> */}
        {productTableHeadings.map((heading) => (
          <TCol key={heading.title}>
            <THead>{heading.title}</THead>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TData>{products[0][heading.key] ?? "unknown"}</TData>
          </TCol>
        ))}
      </Table>
    </View>
  );
}

const InvoiceDocument = ({
  date,
  sellerDetails,
}: {
  date: Date;
  sellerDetails: {
    name: string;
  };
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={{ border: 1, margin: 10, borderRadius: 8 }}>
        <Heading date={date} />
        <PersonDetails person={sellerDetails} type="seller" />
        <PersonDetails person={sellerDetails} type="buyer" />
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
          sellerDetails={{ name: "شرکت شیوه نرم افزار گستر آسیا" }}
        />
      </PDFViewer>
    </div>
  );
}

export default App;
