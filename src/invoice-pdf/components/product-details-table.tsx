import { View, Svg, Line, Text } from "@react-pdf/renderer";
import { Invoice, Project } from "../../types";

interface TDataProps extends React.PropsWithChildren {
  bold?: boolean;
}

const productTableHeadings: {
  title: string;
  getValue: ((inv: Invoice) => string) | null;
}[] = [
  { title: "شرح کالا یا خدمات", getValue: (inv) => inv.plan.name },
  { title: "تعداد /  مقدار", getValue: (inv) => inv.details.month },
  {
    title: "مبلغ کل",
    getValue: (inv) =>
      (
        inv["plan"]["cost_per_month"] * Number(inv["details"]["month"])
      ).toString(),
  },
  { title: "مبلغ تخفیف", getValue: null },
  { title: "مبلغ کل پس از تخفیف", getValue: null },
  {
    title: "جمع مالیات و عوارض",
    getValue: (inv) => inv.details.tax.toString(),
  },
  {
    title: "جمع مبلغ کل بعلاوه مالیات و عوارض",
    getValue: (inv) => inv.final_price.toString(),
  },
];

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

function ProductDetailsTable({ invoice }: { invoice: Project["invoice"][0] }) {
  return (
    <View style={{ borderTop: 1, paddingTop: 8 }}>
      <Text style={{ textAlign: "center" }}>
        مشخصات کالا یا خدمات مورد معامله )تمامی مبالغ به ریال هستند(
      </Text>
      <View
        style={{
          padding: 16,
          flexDirection: "row-reverse",
          justifyContent: "center",
        }}
      >
        {productTableHeadings.map((heading) => (
          <TCol key={heading.title}>
            <TData bold>{heading.title}</TData>
            <Svg height={2} width={"100%"}>
              <Line
                x1={0}
                x2={300}
                y1={0}
                y2={0}
                strokeWidth={2}
                stroke="black"
              />
            </Svg>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <TData>{heading.getValue?.(invoice) ?? ""}</TData>
          </TCol>
        ))}
      </View>
    </View>
  );
}

export default ProductDetailsTable;
