import { View, Text } from "@react-pdf/renderer";
import { User } from "../../types";
import NumberField from "./number-field";
import TextField from "./text-field";

function PersonDetails({
  person,
  type,
}: {
  person: User;
  type: "buyer" | "seller";
}) {
  let accountType, name, nationalCode, nationalCodeLabel, phoneNumLabel;
  const isNaturalPerson = person.account_type === "natural";

  if (isNaturalPerson) {
    accountType = "حقیقی";
    name = person.name;
    nationalCode = person.national_identity;
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
      <View
        style={{
          flexDirection: "row-reverse",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Text>{"مشخصات"}</Text>
        <Text>{type === "buyer" ? "خریدار" : "فروشنده"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              gap: 8,
            }}
          >
            {!isNaturalPerson && (
              <NumberField
                label={"شماره اقتصادی"}
                value={person.financial_code || `${"کد اقتصادی"} موجود نیست`}
              />
            )}
            <NumberField label={nationalCodeLabel} value={nationalCode} />
          </View>
          <NumberField
            label={"کد پستی"}
            value={person.postalcode || `${"کد پستی"} موجود نیست`}
          />
        </View>
        <View style={{ flexDirection: "column", gap: 6 }}>
          <TextField
            label={`نام شخص ${accountType}`}
            value={name || `${"نام"} موجود نیست`}
          />
          <TextField
            label={"نشانی"}
            value={person.address || `${"آدرس"} موجود نیست`}
          />
          <TextField
            label={phoneNumLabel}
            value={person.telephone || `${phoneNumLabel} موجود نیست`}
            faNums
          />
        </View>
      </View>
    </View>
  );
}

export default PersonDetails;
