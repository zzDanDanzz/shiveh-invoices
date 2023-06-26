import { View, Svg, Line, Text } from "@react-pdf/renderer";
import { Invoice } from "../types";
import { addCommas, numberToWords } from "@persian-tools/persian-tools";
import { digitNormalizer } from "../utils";

interface TDataProps {
  bold?: boolean;
  isNum?: boolean;
  children: string;
}

const totalPriceRowData: {
  widthPerc: number;
  isNum?: boolean;
  getValue: ((inv: Invoice) => string) | null;
}[] = [
  {
    widthPerc: 5,
    getValue() {
      return "جمع کل:";
    },
  },
  {
    widthPerc: 45,
    getValue(inv) {
      const numInWords = numberToWords(Math.round(inv.final_price));
      return `${numInWords} ریال`;
    },
  },
  {
    widthPerc: 9,
    getValue() {
      return " ";
    },
  },
  {
    widthPerc: 9,
    getValue() {
      return " ";
    },
  },
  {
    widthPerc: 7,
    getValue() {
      return " ";
    },
  },
  {
    widthPerc: 9,
    getValue: (inv) => inv.details.tax.toString(),
    isNum: true,
  },
  {
    widthPerc: 16,
    getValue: (inv) => inv.final_price.toString(),
    isNum: true,
  },
];

const productTableData: {
  widthPerc: number;
  title: string;
  isNum?: boolean;
  getValue: ((inv: Invoice) => string) | null;
}[] = [
  { widthPerc: 2.5, title: " ", getValue: () => "1", isNum: true },
  { widthPerc: 2.5, title: " ", getValue: null },
  {
    widthPerc: 20,
    title: "شرح کالا",
    getValue: () => "ارائه سرویس میزبانی نقشه",
  },
  {
    widthPerc: 5,
    title: "تعداد",
    isNum: true,
    getValue: (inv) => inv.details.month,
  },
  {
    widthPerc: 8,
    title: "مبلغ واحد",
    getValue: (inv) => inv.plan.cost_per_month.toString(),
    isNum: true,
  },
  {
    widthPerc: 12,

    isNum: true,
    title: "مبلغ کل",
    getValue: ({
      details: { month },
      plan: { cost_per_month, cost_per_year },
    }) => (month === "12" ? cost_per_year.en : cost_per_month).toString(),
  },
  { widthPerc: 9, title: "مبلغ تخفیف", getValue: null, isNum: true },
  { widthPerc: 9, title: "مبلغ کل پس از تخفیف", getValue: null, isNum: true },
  {
    widthPerc: 7,
    title: "بستانکاری",
    getValue: (inv) => inv.balance.toString(),
    isNum: true,
  },
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

function TableData({ children, bold = false, isNum = false }: TDataProps) {
  const text = isNum ? digitNormalizer(addCommas(children)) : children;

  return (
    <Text
      style={{
        height: 16,
        paddingTop: 2,
        textAlign: "center",
        ...(bold && { fontFamily: "Vazirmatn-Bold" }),
      }}
    >
      {text}
    </Text>
  );
}

function HorizontalLine() {
  return (
    <Svg height={2} width={"100%"}>
      <Line x1={0} x2={300} y1={1} y2={1} strokeWidth={1} stroke="black" />
    </Svg>
  );
}

function TableColumn({
  children,
  width,
  withBorderRight,
}: {
  width: string | number;
  withBorderRight: boolean;
} & React.PropsWithChildren) {
  return (
    <View
      style={{
        flexDirection: "column",
        borderRight: 0,
        width,
        ...(withBorderRight && { borderRight: 1 }),
      }}
    >
      {children}
    </View>
  );
}

function ProductDetailsTable({ invoice }: { invoice: Invoice }) {
  return (
    <View style={{ borderTop: 1, fontSize: 6 }}>
      <Text style={{ textAlign: "center", paddingVertical: 2 }}>
        مشخصات کالا یا خدمات مورد معامله )تمامی مبالغ به ریال هستند(
      </Text>

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
        }}
      >
        {productTableData.map(({ title, getValue, widthPerc, isNum }, i) => (
          <TableColumn
            key={title}
            width={`${widthPerc}%`}
            withBorderRight={i !== 0}
          >
            <HorizontalLine />
            <TableData bold>{title}</TableData>
            <HorizontalLine />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TableData isNum={isNum}>{getValue?.(invoice) ?? " "}</TableData>
            <HorizontalLine />
          </TableColumn>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
          borderBottom: 1,
        }}
      >
        {totalPriceRowData.map(({ getValue, widthPerc, isNum }, i) => {
          const value = getValue?.(invoice) ?? " ";
          return (
            <TableColumn
              key={value ?? i}
              width={`${widthPerc}%`}
              withBorderRight={i !== 0}
            >
              <TableData isNum={isNum}>{value}</TableData>
            </TableColumn>
          );
        })}
      </View>
    </View>
  );
}

export default ProductDetailsTable;
