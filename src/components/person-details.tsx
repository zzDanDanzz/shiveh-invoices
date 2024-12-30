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
    alignItems: "center",
    width: "50px",
    height: "60px",
    border: "1px solid black",
    padding: "5px",
    backgroundColor: "#E5E7EC",
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
    nationalCode = (person as Buyer).national_number;
    nationalCodeLabel = "کد ملی";
    phoneNumLabel = "شماره تماس ثابت";
  } else {
    accountType = "حقوقی";
    name = person.company;
    nationalCode = person.national_identity;
    nationalCodeLabel = "شماره ثبت/شناسه ملی";
    phoneNumLabel = "شماره تماس ثابت / نمابر";
  }

  return (
    <View
      style={{
        display: "flex",
        marginBottom: 3,
        flexDirection: "row-reverse",
        gap: 4,
      }}
    >
      {/* rotate title */}
      <View style={styles.title}>
        <Text style={{ transform: "rotate(-90deg)" }}>
          {type === "buyer" ? "خریدار" : "فروشنده"}
        </Text>
      </View>
      {/* details */}
      <View
        style={{
          flexDirection: "column",
          border: 1,
          width: "87.7%",
          padding: "5px",
          gap: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row-reverse",
            gap: "50px",
          }}
        >
          {/* نام، شماره اقتصادی و ملی */}
          <View style={{ gap: 5 }}>
            <TextField
              label={`نام شخص ${accountType}`}
              value={name || `${"نام"} موجود نیست`}
            />
            <TextField
              label={phoneNumLabel}
              value={person.telephone || `${phoneNumLabel} موجود نیست`}
              faNums
            />
          </View>
          {/*  شماره تماس و کد پستی  */}
          <View style={{ gap: 5 }}>
            <NumberField label={nationalCodeLabel} value={nationalCode} />
            <NumberField
              label={"کد پستی"}
              value={person.postalcode || `${"کد پستی"} موجود نیست`}
            />
          </View>
          <View>
            {!isNaturalPerson && (
              <NumberField
                label={"شماره اقتصادی"}
                value={person.financial_code || `${"کد اقتصادی"} موجود نیست`}
              />
            )}
          </View>
        </View>

        {/*نشانی*/}
        <TextField
          label={"نشانی"}
          value={
            person.address
              ? addressNormalizer(person.address)
              : `${"آدرس"} موجود نیست`
          }
          style={{ flexGrow: 1, marginTop: 2 }}
        />
      </View>
    </View>
  );
}

export default PersonDetails;
