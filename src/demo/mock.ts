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
    account_type: "legal" as const,
    address:
      "استان تهران، شهر تهران، نيلوفر- شهيد قندي/15317، کوچه شهیدعباس ساوجی نیا (هشتم )، پلاک 5، طبقه همکف، کد پستی:1531735613",
    name: "درسا درافشانی",
    company: "شیوه",
    financial_code: "111111111",
    national_identity: "0012212322",
    national_number: "1630303542",
    postalcode: "1531735613",
    telephone: "02142070300",
  },
  invoice: {
    id: 1110,
    client_id: 385,
    details: {
      plan_id: 23,
      month: "1",
      tax_percent: 0.09,
      tax: 184680,
    },
    from_date: "1402-03-22 13:30:39",
    to_date: "1402-04-22 13:30:39",
    is_paid: true,
    created_at: "1402-03-22 13:30:39",
    updated_at: "1402-03-22 17:15:39",
    cost: "2052000",
    type: "mop",
    invoice_number: null,
    cost_in_string: "2,052,000",
    status: "paid",
    final_price: 2236680,
    balance: 348000,
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
    invoice_number_request: null,
    remainingDays: 191,
    remainOfPrevPlan: 379320,
    previousPlanName: "استارت آپ",
  },
};
