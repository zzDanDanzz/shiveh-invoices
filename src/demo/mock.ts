import { Buyer, CurrentPlan, Invoice, History } from "../types";

export const history: History[] = [
  {
    id: 6517,
    plan_id: 23,
    from_date: "1402-08-22 10:18:54",
    to_date: "1402-09-22 10:18:54",
    expence: 2040000,
    is_paid: true,
    client_id: 479,
    updated_at: "1402-08-22 10:19:04",
    created_at: "1402-08-22 10:19:04",
    plan: {
      id: 23,
      name: "حرفه‌ای",
      cost_per_month: 2400000,
      request_per_day: 80000,
      cost_per_year: {
        en: 28800000,
        fa: "۲۸۸۰۰۰۰۰",
      },
    },
  },
  {
    id: 6516,
    plan_id: 22,
    from_date: "1402-08-22 10:18:22",
    to_date: "1402-08-22 10:18:54",
    expence: 360000,
    is_paid: true,
    client_id: 479,
    updated_at: "1402-08-22 10:19:04",
    created_at: "1402-08-22 10:18:31",
    plan: {
      id: 22,
      name: "استارت آپ",
      cost_per_month: 360000,
      request_per_day: 15000,
      cost_per_year: {
        en: 4320000,
        fa: "۴۳۲۰۰۰۰",
      },
    },
  },
  {
    id: 6515,
    plan_id: 1,
    from_date: "1402-08-22 10:18:03",
    to_date: "1402-08-22 10:18:22",
    expence: 0,
    is_paid: true,
    client_id: 479,
    updated_at: "1402-08-22 10:18:31",
    created_at: "1402-08-22 10:18:03",
    plan: {
      id: 1,
      name: "پایه",
      cost_per_month: 0,
      request_per_day: 3000,
      cost_per_year: {
        en: 0,
        fa: "۰",
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
  id: 1240,
  client_id: 479,
  details: {
    plan_id: 22,
    month: "1",
    tax_percent: 0.09,
    tax: 32400,
  },
  from_date: "1402-08-22 10:18:22",
  to_date: "1402-09-22 10:18:22",
  is_paid: true,
  created_at: "1402-08-22 10:18:22",
  updated_at: "1402-08-22 10:18:31",
  cost: "360000",
  type: "mop",
  invoice_number: null,
  cost_in_string: "360,000",
  status: "paid",
  final_price: 392400,
  balance: 0,
  plan: {
    id: 22,
    name: "استارت آپ",
    cost_per_month: 360000,
    request_per_day: 15000,
    cost_per_year: {
      en: 4320000,
      fa: "۴۳۲۰۰۰۰",
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
