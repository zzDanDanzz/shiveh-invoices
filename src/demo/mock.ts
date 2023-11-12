import { Buyer, CurrentPlan, Invoice, History } from "../types";

export const history: History[] = [
  {
    id: 6408,
    plan_id: 25,
    from_date: "1402-08-07 16:09:47",
    to_date: "1403-08-07 16:09:47",
    expence: 36800000,
    is_paid: true,
    client_id: 461,
    updated_at: "1402-08-07 16:10:26",
    created_at: "1402-08-07 16:10:26",
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
  },
  {
    id: 6400,
    plan_id: 24,
    from_date: "1402-08-03 10:17:33",
    to_date: "1402-08-07 16:09:47",
    expence: 43200000,
    is_paid: true,
    client_id: 461,
    updated_at: "1402-08-07 16:10:26",
    created_at: "1402-08-03 10:17:51",
    plan: {
      id: 24,
      name: "اقتصادی",
      cost_per_month: 6000000,
      request_per_day: 400000,
      cost_per_year: {
        en: 72000000,
        fa: "۷۲۰۰۰۰۰۰",
      },
    },
  },
];
export const currentplan: CurrentPlan = {
  id: 6147,
  plan_id: 1,
  from_date: "1402-07-22 10:42:00",
  to_date: "1402-08-22 10:42:00",
  expence: 0,
  is_paid: true,
  client_id: 44,
  created_at: "1402-07-22 10:42:00",
  updated_at: "1402-07-22 10:42:00",
  plan: {
    id: 1,
    name: "پایه",
    cost_per_month: 0,
    request_per_day: 3000,
    cost_per_year: {
      en: 0,
      fa: ".",
    },
  },
};
export const invoice: Invoice = {
  id: 1192,
  client_id: 461,
  details: {
    plan_id: 25,
    month: "12",
    tax_percent: 0.09,
    tax: 3312000,
  },
  from_date: "1402-08-07 16:09:47",
  to_date: "1403-08-07 16:09:47",
  is_paid: true,
  created_at: "1402-08-07 16:09:47",
  updated_at: "1402-08-07 16:10:26",
  cost: "36800000",
  type: "mop",
  invoice_number: null,
  cost_in_string: "36,800,000",
  status: "paid",
  final_price: 40112000,
  balance: 71200000,
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
