import ReactPDF, { View, Text  } from "@react-pdf/renderer";
import { digitNormalizer } from "../utils";


function TextField({
  label,
  value,
  faNums = false,
  style,
}: {
  label: string;
  value: string;
  faNums?: boolean;
  style?: ReactPDF.Styles[''];
}) {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        gap: 8,
        ...style,
      }}
    >
      <Text style={{ fontFamily: "Vazirmatn-Bold" }}>:{label}</Text>
      <Text>{faNums ? digitNormalizer(value) : value}</Text>
    </View>
  );
}

export default TextField;
