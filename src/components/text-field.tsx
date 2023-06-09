import { View, Text } from "@react-pdf/renderer";
import { digitNormalizer } from "../utils";

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
      <Text>{faNums ? digitNormalizer(value) : value}</Text>
    </View>
  );
}

export default TextField;
