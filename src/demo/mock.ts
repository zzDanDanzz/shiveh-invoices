import { Buyer, CurrentPlan, Invoice,History } from "../types";

export const history : History={
  'id': 6368 ,
  'plan_id': 23,
  'from_date': "1402-07-30 10:42:00",
  'to_date': "1403-07-30 10:42:00",
  'expence': 28440000,
  'is_paid': true,
  'client_id': 449,
  'created_at': "1402-07-30 10:42:00",
  'updated_at': "1402-07-30 10:42:00",
  'plan': {
    "id":23 ,
    "name":"حرفه ای" ,
    "cost_per_month": 2400000,
    "request_per_day":80000, 
    "cost_per_year": {
      "en": 28800000,
      "fa": '28800000'
    }

  }
}
// ,{
//   'id': 6367 ,
//   'plan_id': 22,
//   'from_date': "1402-07-30 10:42:00",
//   'to_date': "1402-08-30 10:42:00",
//   'expence': 360000,
//   'is_paid': true,
//   'client_id': 449,
//   'created_at': "1402-07-30 10:42:00",
//   'updated_at': "1402-07-30 10:42:00",
//   'plan': {
//     "id":22 ,
//     "name":"استارت آپ" ,
//     "cost_per_month": 360000,
//     "request_per_day":15000, 
//     "cost_per_year": {
//       "en": 4320000,
//       "fa": '4320000'
//     }

//   }
// }
export const currentplan: CurrentPlan={
  'id': 6147 ,
  'plan_id': 1,
  'from_date': "1402-07-22 10:42:00",
  'to_date': "1402-08-22 10:42:00",
  'expence': 0,
  'is_paid': true,
  'client_id': 44,
  'created_at': "1402-07-22 10:42:00",
  'updated_at': "1402-07-22 10:42:00",
  'plan': {
    "id":1 ,
    "name":"پایه" ,
    "cost_per_month": 0,
    "request_per_day":3000, 
    "cost_per_year": {
      "en": 0,
      "fa": '.'
    }

  }
}
export const invoice: Invoice = {
    "id": 1146,
    "client_id": 444,
    "details": {
      "plan_id": 22,
      "month": "1",
      "tax_percent": 0.09,
      "tax": 32400
    },
    "from_date": "1402-07-29 16:59:31",
    "to_date": '1402-08-29 16:59:31',
    "is_paid": false,
    "created_at": "1402-07-29 16:59:31",
    "updated_at": "1402-07-29 16:59:31",
    "cost": "360000",
    "type": "eop",
    "invoice_number": null,
    "cost_in_string": "360000",
    "status": "pending",
    "final_price": 392400,
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
