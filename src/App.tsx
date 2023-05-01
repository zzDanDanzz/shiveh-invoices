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

// Create Document Component
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
      <View style={{ border: 1, margin: 10 }}>
        <Heading date={date} />
        <View
          style={{
            flexDirection: "row-reverse",
            backgroundColor: "yellow",
            fontSize: 8,
            gap: 24,
            padding: 8,
          }}
        >
          <View>
            <TextField label={SELLER_FORM.NAME} value={sellerDetails.name} />
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
