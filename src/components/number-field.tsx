import { digitsEnToFa } from "@persian-tools/persian-tools";
import { View, Text } from "@react-pdf/renderer";

function NumberField({
  label,
  value,
}: {
  label: string;
  value?: number | string;
}) {
  if (!value) {
    return null;
  }

  const nums = digitsEnToFa(String(value)).split("");

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        gap: 5,
      }}
    >
      <Text style={{ fontFamily: "Vazirmatn-Bold" }}>:{label}</Text>
      <View style={{ flexDirection: "row" }}>
        {nums.map((n, i) => (
          <Text key={i}>{n}</Text>
        ))}
      </View>
    </View>
  );
}

export default NumberField;
