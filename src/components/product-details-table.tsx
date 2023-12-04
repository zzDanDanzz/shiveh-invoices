import { addCommas, numberToWords } from "@persian-tools/persian-tools";
import { Line, Svg, Text, View } from "@react-pdf/renderer";
import { digitNormalizer } from "../utils";

import type { Invoice } from "../types";
import type { Style } from "@react-pdf/types";

interface TDataProps {
  bold?: boolean;
  isNum?: boolean;
  children: string;
  styles?: Style;
}

const totalPriceRowData: {
  widthPerc: number;
  isNum?: boolean;
  alignRight?: boolean;
  getValue: ((inv: Invoice) => string) | null;
}[] = [
  {
    widthPerc: 7,
    getValue() {
      return "جمع کل:";
    },
  },
  {
    widthPerc: 74,
    alignRight: true,
    getValue(inv) {
      const numInWords = numberToWords(Math.round(inv.final_price));
      return `${numInWords} ریال`;
    },
  },

  {
    widthPerc: 21,
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
  { widthPerc: 7, title: "ردیف", getValue: () => "1", isNum: true },
  {
    widthPerc: 20,
    title: "شرح کالا",
    getValue: () => "ارائه سرویس میزبانی نقشه",
  },
  {
    widthPerc: 7,
    title: "مدت",
    getValue: (inv) => `${digitNormalizer(inv.details.month)} ماه`,
  },
  {
    widthPerc: 8,
    title: "مبلغ ماهانه",
    getValue: (inv) => inv.plan.cost_per_month.toString(),
    isNum: true,
  },
  {
    widthPerc: 8,
    isNum: true,
    title: "مبلغ کل",
    getValue: ({ details: { month }, plan: { cost_per_month } }) =>
      (Number(month) > 1
        ? cost_per_month * Number(month)
        : cost_per_month
      ).toString(),
  },
  { widthPerc: 8, title: "مبلغ تخفیف", getValue: null, isNum: true },
  { widthPerc: 13, title: "مبلغ کل پس از تخفیف", getValue: null, isNum: true },
  {
    widthPerc: 10,
    title: "جمع مالیات و عوارض",

    isNum: true,
    getValue: ({ details: { month, tax_percent }, plan: { cost_per_month } }) =>
      (Number(month) > 1
        ? cost_per_month * Number(month) * tax_percent
        : cost_per_month * tax_percent
      ).toString(),
  },
  {
    widthPerc: 21,
    title: `جمع مبلغ کل بعلاوه مالیات و عوارض`,
    isNum: true,
    getValue: (inv) =>
      (
        inv.final_price +
        (inv.balance * inv.details.tax_percent + inv.balance)
      ).toString(),
  },
];

function TableData({
  children,
  bold = false,
  isNum = false,
  styles,
}: TDataProps) {
  const text = isNum ? digitNormalizer(addCommas(children)) : children;

  return (
    <View style={{ padding: 8, backgroundColor: bold ? "#E5E7EC" : undefined }}>
      <Text
        style={{
          height: 16,
          paddingTop: 2,
          textAlign: "center",
          ...(bold && { fontFamily: "Vazirmatn-Bold" }),
          ...styles,
        }}
      >
        {text}
      </Text>
    </View>
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
  withBorderRight?: boolean;
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
    <View style={{ fontSize: 7, borderLeft: 1 }}>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
          borderRight: 1,
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
          </TableColumn>
        ))}
      </View>
      {invoice.balance && (
        <View
          style={{
            borderTop: 1.4,
            height: 30,
            textAlign: "center",
            justifyContent: "flex-end",
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <View
            style={{
              width: "74.5px",
              padding: 4,
              borderRight: 1,
              flexDirection: "column",
            }}
          >
            <View
              style={{ flexDirection: "row-reverse", justifyContent: "center" }}
            >
              <Text>*</Text>
              <Text style={{ fontFamily: "Vazirmatn-Bold" }}>
                مانده از قبل :
              </Text>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Text>(</Text>
              <Text style={{ fontSize: 6 }}>با احتساب ارزش افزوده</Text>
              <Text>)</Text>
            </View>
          </View>
          <Text style={{ width: "156.5px", padding: 8, borderRight: 1 }}>
            {digitNormalizer(invoice.remainOfPrevPlan)}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
          textAlign: "left",
          borderBottom: 1,
          borderRight: 1,
          borderTop: 1.4,
          backgroundColor: "#E5E7EC",
          fontFamily: "Vazirmatn-Bold",
        }}
      >
        {totalPriceRowData.map(
          ({ getValue, widthPerc, isNum, alignRight }, i) => {
            const value = getValue?.(invoice) ?? " ";
            const styles: Style =
              alignRight === true ? { textAlign: "right" } : {};
            return (
              <TableColumn
                key={value ?? i}
                width={`${widthPerc}%`}
                withBorderRight={i !== 0}
              >
                <TableData isNum={isNum} styles={styles}>
                  {value}
                </TableData>
              </TableColumn>
            );
          }
        )}
      </View>
    </View>
  );
}

export default ProductDetailsTable;
