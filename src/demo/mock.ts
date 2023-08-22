import { Buyer, Invoice } from "../types";

export const invoice: Invoice = {
    "id": 1106,
    "client_id": 381,
    "details": {
      "plan_id": 22,
      "month": "12",
      "tax_percent": 0.09,
      "tax": 388800
    },
    "from_date": "1403-03-03 14:27:36",
    "to_date": "1404-03-03 14:27:36",
    "is_paid": false,
    "created_at": "1402-03-21 11:13:19",
    "updated_at": "1402-03-21 11:13:19",
    "cost": "4320000",
    "type": "eop",
    "invoice_number": null,
    "cost_in_string": "4,320,000",
    "status": "pending",
    "final_price": 4708800,
    "balance": 0,
    "plan": {
      "id": 22,
      "name": "استارت آپ",
      "cost_per_month": 360000,
      "request_per_day": 15000,
      "cost_per_year": {
        "en": 4320000,
        "fa": "۴۳۲۰۰۰۰"
      }
    }

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
