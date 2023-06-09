import { Buyer, Invoice } from "../types";

export const invoice: Invoice = {
  id: 631,
  client_id: 330,
  details: {
    plan_id: 21,
    month: "1",
    tax_percent: 0.09,
    tax: 930000,
  },
  from_date: "1402-02-12 11:48:47",
  to_date: "1402-03-12 11:48:47",
  is_paid: true,
  created_at: "1402-02-12 11:48:47",
  updated_at: "1402-02-12 11:48:47",
  cost: "10333334",
  type: "mop",
  invoice_number: null,
  cost_in_string: "10,333,334",
  status: "pending",
  final_price: 11263334,
  balance: 4666666,
  plan: {
    id: 21,
    name: "پنج",
    cost_per_month: 15000000,
    request_per_day: 2000000,
    cost_per_year: {
      en: 180000000,
      fa: "۱۸۰۰۰۰۰۰۰",
    },
  },
};

export const user: Buyer = {
  name: "\u062f\u0646\u06cc",
  address:
    "\u0627\u062f\u0631\u0633 \u062f\u0648\u0628\u0627\u0631\u0647 \u0639\u0648\u0636 \u0634\u062f",
  national_number: "1231231231",
  company: "\u06cc\u0633\u0628",
  postalcode: "1849419722",
  telephone: "02155313421",
  national_identity: "21312321",
  financial_code: "123123123222",
  account_type: "natural",
};
