import { View, Text, StyleSheet } from "@react-pdf/renderer";
import NumberField from "./number-field";
import TextField from "./text-field";
import { Buyer, Seller } from "../types";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const swapParentheses = (str: string) =>
  str.replace(/[()]/g, (match) => (match === "(" ? ")" : "("));

const reverseNums = (str: string) =>
  str.replace(/\d+/g, (match) => match.split("").reverse().join(""));

const addressNormalizer = (address: string) => {
  return digitsEnToFa(swapParentheses(reverseNums(address)));
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row-reverse",
    gap: 4,
    justifyContent: "center",
  },
});

function PersonDetails({
  person,
  type,
}: {
  person: Buyer | Seller;
  type: "buyer" | "seller";
}) {
  let accountType, name, nationalCode, nationalCodeLabel, phoneNumLabel;
  const isNaturalPerson = person.account_type === "natural";

  if (isNaturalPerson) {
    accountType = "حقیقی";
    name = (person as Buyer).name;
    nationalCode = (person as Buyer).national_identity;
    nationalCodeLabel = "شماره ملی";
    phoneNumLabel = "تلفن ثابت";
  } else {
    accountType = "حقوقی";
    name = person.company;
    nationalCode = person.national_number;
    nationalCodeLabel = "شماره ثبت";
    phoneNumLabel = "تلفن ثابت / نمابر";
  }

  return (
    <View style={{ borderTop: 1, padding: 8, flexDirection: "column", gap: 8 }}>
      <View style={styles.title}>
        <Text>{"مشخصات"}</Text>
        <Text>{type === "buyer" ? "خریدار" : "فروشنده"}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* نام، شماره اقتصادی و ملی */}
        <View style={{ flexDirection: "row-reverse", gap: 8 }}>
          <TextField
            label={`نام شخص ${accountType}`}
            value={name || `${"نام"} موجود نیست`}
            style={{ flexGrow: 1 }}
          />
          {!isNaturalPerson && (
            <NumberField
              label={"شماره اقتصادی"}
              value={person.financial_code || `${"کد اقتصادی"} موجود نیست`}
            />
          )}
          <NumberField label={nationalCodeLabel} value={Number(nationalCode)} />
        </View>
        {/* ناشنی و کد پستی  */}
        <View style={{ flexDirection: "row-reverse" }}>
          <TextField
            label={"نشانی"}
            value={
              person.address
                ? addressNormalizer(person.address)
                : `${"آدرس"} موجود نیست`
            }
            style={{ flexGrow: 1 }}
          />
          <NumberField
            label={"کد پستی"}
            value={person.postalcode || `${"کد پستی"} موجود نیست`}
          />
        </View>
        {/* شماره تلفن */}
        <TextField
          label={phoneNumLabel}
          value={person.telephone || `${phoneNumLabel} موجود نیست`}
          faNums
        />
      </View>
    </View>
  );
}

export default PersonDetails;
