import { View, Text } from "@react-pdf/renderer";
import { e2p } from "../utils";

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

      <View style={{ flexDirection: "row" }}>
        {nums.map((n, i) => (
          <View style={{ border: 1, textAlign: "center" }} key={i}>
            <Text style={{ width: 12 }}>{n}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default NumberField;
