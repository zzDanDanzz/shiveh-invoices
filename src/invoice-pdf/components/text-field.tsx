import { View, Text } from "@react-pdf/renderer";
import { e2p } from "../utils";

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


export default TextField