import { Buyer, Invoice } from "../types";

export const invoice: Invoice = {
  id: 1115,
  client_id: 385,
  details: {
    plan_id: 25,
    month: "12",
    tax_percent: 0.09,
    tax: 9504000,
  },
  from_date: "1402-03-22 17:16:24",
  to_date: "1403-03-22 17:16:24",
  is_paid: false,
  created_at: "1402-03-22 17:16:24",
  updated_at: "1402-03-22 17:16:24",
  cost: "105600000",
  type: "mop",
  invoice_number: null,
  cost_in_string: "105,600,000",
  status: "pending",
  final_price: 115104000,
  balance: 2400000,
  plan: {
    id: 25,
    name: "اختصاصی",
    cost_per_month: 9000000,
    request_per_day: 1000000,
    cost_per_year: {
      en: 108000000,
      fa: "۱۰۸۰۰۰۰۰۰",
    },
  },
};

export const user: Buyer = {
  name: "\u062f\u0646\u06cc",
  address: "آدرس این است 23 و 3 و 56",
  national_number: "1231231231",
  company: "\u06cc\u0633\u0628",
  postalcode: "1849419722",
  telephone: "02155313421",
  national_identity: "21312321",
  financial_code: "123123123222",
  account_type: "natural",
};
