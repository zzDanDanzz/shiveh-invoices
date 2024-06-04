import stamSrc from "./images/stamp.jpg";

export const invoiceDocumentMockProps = {
  stampSrc: stamSrc,
  sellerDetails: {
    address:
      "استان تهران، شهر تهران، عباس آباد، خیابان بهشتی، خيابان شهید جواد سرافراز، نبش کوچه‌ی نسیم شمال (یکم)، پلاک 9، طبقه 1، واحد 1",
    account_type: "legal" as const,
    company: "شرکت شیوه نرم افزار گستر آسیا",
    financial_code: "411558785873",
    postalcode: "1587613611",
    telephone: "02142070300",
    national_identity: "14006138250",
    shaiba_number: "IR۱۰۰۸۷۵۶۵۱۶۰۲۰۰۸۸۱۰۰۵۵۰۸۸",
    account_number: "۱-۸۷۵۶۵۱۶-۲-۸۸۱",
    bank_branch:
      "شرکت شیوه نرم‌افزار گستر آسیا - بانک اقتصاد نوین شعبه هفتم تیر ",
  },
  buyerDetails: {
    account_type: "natural" as const,
    address: "تهران شهری ری",
    name: "میرعمادی - ویرایش",
    company: " گستر نوین آسیا - ویرایش",
    financial_code: "523564489551",
    national_identity: "140065464654",
    national_number: "4521452145",
    postalcode: "1854112545",
    telephone: "02155934152",
  },
 invoice: {
    "id": 1681,
    "client_id": 589,
    "details": {
        "plan_id": 24,
        "month": '12',
        "tax_percent": 0.1,
        "tax": 6912000
    },
    "from_date": "1403-03-11 10:22:38",
    "to_date": "1404-03-11 10:22:38",
    "is_paid": false,
    "created_at": "1403-03-11 10:22:38",
    "updated_at": "1403-03-12 04:00:02",
    "cost": "86400000",
    "type": "mop",
    "invoice_number": null,
    "discount_id": 100,
    "discount_value": 17280000,
    "cost_in_string": "86,400,000",
    "status": "expired",
    "final_price": 76032000,
    "balance": 0,
    "plan": {
        "id": 24,
        "name": "اقتصادی",
        "cost_per_month": 7200000,
        "request_per_day": 400000,
        "cost_per_year": {
            "en": 86400000,
            "fa": "۸۶۴۰۰۰۰۰"
        }
    },
    "invoice_number_request": null,
    previousPlanName:'پایه'
}
};

