import stamSrc from './images/stamp.jpg'

export const invoiceDocumentMockProps ={
    "stampSrc": stamSrc,
    "sellerDetails": {
      "address": "استان تهران، شهر تهران، عباس آباد، خیابان بهشتی، خيابان شهید جواد سرافراز، نبش کوچه‌ی نسیم شمال (یکم)، پلاک 9، طبقه 1، واحد 1",
      "account_type": "legal" as const,
      "company": "شرکت شیوه نرم افزار گستر آسیا",
      "financial_code": "411558785873",
      "postalcode": "1587613611",
      "telephone": "02142070300",
      "national_number": "14006138250",
      "shaiba_number": "IR۱۰۰۸۷۵۶۵۱۶۰۲۰۰۸۸۱۰۰۵۵۰۸۸",
      "account_number": "۱-۸۷۵۶۵۱۶-۲-۸۸۱",
      "bank_branch": "شرکت شیوه نرم‌افزار گستر آسیا - بانک اقتصاد نوین شعبه هفتم تیر "
    },
    "buyerDetails": {
      "account_type": "natural" as const,
      "address": "asdcasdc",
      "name": "parisa jandaghi",
      "company": undefined,
      "financial_code": undefined,
      "national_identity": undefined,
      "national_number": "0012212322",
      "postalcode": "1231231232",
      "telephone": "046496546549"
    },
    "invoice": {
      "id": 1300,
      "client_id": 505,
      "details": {
        "plan_id": 22,
        "month": "1",
        "tax_percent": 0.09,
        "tax": 32265
      },
      "from_date": "1402-08-28 13:41:10",
      "to_date": "1402-09-28 13:41:10",
      "is_paid": true,
      "created_at": "1402-08-28 13:41:10",
      "updated_at": "1402-08-28 13:41:26",
      "cost": "358500",
      "type": "mop",
      "invoice_number": null,
      "cost_in_string": "358,500",
      "status": "paid",
      "final_price": 390765,
      "balance": 1500,
      "plan": {
        "id": 22,
        "name": "استارت آپ",
        "cost_per_month": 360000,
        "request_per_day": 15000,
        "cost_per_year": {
          "en": 4320000,
          "fa": "۴۳۲۰۰۰۰"
        }
      },
      "invoice_number_request": {
        "id": 47,
        "invoice_id": 1300,
        "user_id": "677294b1-3c12-4a01-81d0-75bc27be08e2",
        "created_at": "1402-08-28 15:02:12",
        "updated_at": "1402-08-28 15:02:12"
      },
      "remainingDays": 30,
      "remainOfPrevPlan": 135,
      "previousPlanName": "پرداخت تست"
    }
  }
  