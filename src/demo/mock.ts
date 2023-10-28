import { Buyer, CurrentPlan, Invoice,History } from "../types";

export const history : History[]=[
  {
        "id": 6400,
        "plan_id": 24,
        "from_date": "1402-08-03 10:17:33",
        "to_date": "1403-08-03 10:17:33",
        'expence': 43200000,
        "is_paid": true,
        "client_id": 461,
        "updated_at": "1402-08-03 10:17:51",
        "created_at": "1402-08-03 10:17:51",
        "plan": {
          "id": 24,
          "name": "اقتصادی",
          "cost_per_month": 6000000,
          "request_per_day": 400000,
          "cost_per_year": {
            "en": 72000000,
            "fa": "۷۲۰۰۰۰۰۰"
          }
        }
      }
  ,
  {
    
        "id": 6399,
        "plan_id": 23,
        "from_date": "1402-08-03 09:43:19",
        "to_date": "1402-08-03 10:17:33",
        'expence': 28440000,
        "is_paid": true,
        "client_id": 461,
        "updated_at": "1402-08-03 10:17:51",
        "created_at": "1402-08-03 09:43:37",
        "plan": {
          "id": 23,
          "name": "حرفه‌ای",
          "cost_per_month": 2400000,
          "request_per_day": 80000,
          "cost_per_year": {
            "en": 28800000,
            "fa": "۲۸۸۰۰۰۰۰"
          }
        }
      }
  
]
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
		"id": 1191,
		"client_id": 461,
		"details": {
			"plan_id": 24,
			"month": "12",
			"tax_percent": 0.09,
			"tax": 3888000
		},
		"from_date": "1402-08-03 10:17:33",
		"to_date": "1403-08-03 10:17:33",
		"is_paid": true,
		"created_at": "1402-08-03 10:17:33",
		"updated_at": "1402-08-03 10:17:51",
		"cost": "43200000",
		"type": "mop",
		"invoice_number": null,
		"cost_in_string": "43,200,000",
		"status": "paid",
		"final_price": 47088000,
		"balance": 28800000,
		"plan": {
			"id": 24,
			"name": "اقتصادی",
			"cost_per_month": 6000000,
			"request_per_day": 400000,
			"cost_per_year": {
				"en": 72000000,
				"fa": "۷۲۰۰۰۰۰۰"
			}
		}
	}

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
