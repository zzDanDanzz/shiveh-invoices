import { digitsEnToFa } from "@persian-tools/persian-tools";
import { View, Text } from "@react-pdf/renderer";

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
      <Text>{faNums ? digitsEnToFa(value).split("").reverse().join("") : value}</Text>
    </View>
  );
}


export default TextField