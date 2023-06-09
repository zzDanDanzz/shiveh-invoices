import { View, Svg, Line, Text } from "@react-pdf/renderer";
import { Invoice } from "../types";
import { numberToWords } from "@persian-tools/persian-tools";
import { digitsEnToFa } from "@persian-tools/persian-tools";

interface TDataProps {
  bold?: boolean;
  isNum?: boolean;
  children: string;
}

const productTableHeadings: {
  widthPerc: number;
  title: string;
  isNum?: boolean;
  getValue: ((inv: Invoice) => string) | null;
}[] = [
  { widthPerc: 2.5, title: " ", getValue: null },
  { widthPerc: 2.5, title: " ", getValue: () => "1", isNum: true },
  {
    widthPerc: 20,
    title: "شرح کالا یا خدمات",
    getValue: (inv) => inv.plan.name,
  },
  {
    widthPerc: 5,
    title: "تعداد /  مقدار",
    isNum: true,
    getValue: (inv) => inv.details.month,
  },
  { widthPerc: 7, title: "واحد اندازه گیری", getValue: null },
  { widthPerc: 8, title: "مبلغ واحد", getValue: null, isNum: true },
  {
    widthPerc: 12,

    isNum: true,
    title: "مبلغ کل",
    getValue: (inv) =>
      (
        inv["plan"]["cost_per_month"] * Number(inv["details"]["month"])
      ).toString(),
  },
  { widthPerc: 9, title: "مبلغ تخفیف", getValue: null, isNum: true },
  { widthPerc: 9, title: "مبلغ کل پس از تخفیف", getValue: null, isNum: true },
  {
    widthPerc: 9,
    title: "جمع مالیات و عوارض",

    isNum: true,
    getValue: (inv) => inv.details.tax.toString(),
  },
  {
    widthPerc: 16,
    title: `جمع مبلغ کل بعلاوه مالیات و عوارض`,
    isNum: true,
    getValue: (inv) => inv.final_price.toString(),
  },
];

function TData({ children, bold = false, isNum = false }: TDataProps) {
  const text = isNum
    ? digitsEnToFa(children.split(" ")[0]).split("").reverse().join("")
    : children;

  return (
    <Text
      style={{
        height: 16,
        paddingTop: 2,
        textAlign: 'center',
        ...(bold && { fontFamily: "Vazirmatn-Bold" }),
      }}
    >
      {text}
    </Text>
  );
}

function Divider() {
  return (
    <Svg height={2} width={"100%"}>
      <Line x1={0} x2={300} y1={1} y2={1} strokeWidth={1} stroke="black" />
    </Svg>
  );
}

function ProductDetailsTable({ invoice }: { invoice: Invoice }) {
  const numInWords = numberToWords(Math.round(invoice.final_price));
  const finalPrice = `${numInWords} تومان`;
  return (
    <View style={{ borderTop: 1, paddingTop: 8 }}>
      <Text style={{ textAlign: "center" }}>
        مشخصات کالا یا خدمات مورد معامله )تمامی مبالغ به تومان هستند(
      </Text>

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
        }}
      >
        {productTableHeadings.map((heading, i) => (
          <View
            style={{
              flexDirection: "column",
              // alignItems: "flex-end",
              borderRight: 1,
              // position: "relative",
              fontSize: 6,
              ...(productTableHeadings.length - 1 === i && { borderLeft: 1 }),
              width: `${heading.widthPerc}%`,
            }}
            key={heading.title}
          >
            <Divider />
            <TData bold>{heading.title}</TData>
            <Divider />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TData isNum={heading.isNum}>{heading.getValue?.(invoice) ?? " "}</TData>
            <Divider />
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: "Vazirmatn-Bold" }}>جمع کل:</Text>
        <Text>{finalPrice}</Text>
      </View>
    </View>
  );
}

export default ProductDetailsTable;
