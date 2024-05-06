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
    id: 1269,
    client_id: 384,
    details: {
      plan_id: 28,
      month: "1",
      tax_percent: 0.09,
      tax: 135,
    },
    from_date: "1402-08-22 16:11:25",
    to_date: "1402-09-22 16:11:25",
    is_paid: true,
    created_at: "1402-08-22 16:11:25",
    updated_at: "1402-08-22 16:11:51",
    cost: "1500",
    type: "mop",
    invoice_number: null,
    cost_in_string: "1,500",
    status: "paid",
    final_price: 1635,
    balance: 0,
    plan: {
      id: 28,
      name: "پرداخت تست",
      cost_per_month: 1500,
      request_per_day: 20000,
      cost_per_year: {
        en: 18000,
        fa: "۱۸۰۰۰",
      },
    },
    invoice_number_request: {
      id: 48,
      invoice_id: 1269,
      user_id: "3d7bc9fb-8273-40d0-97b1-6b84e632ab06",
      created_at: "1402-09-04 12:30:40",
      updated_at: "1402-09-04 12:30:40",
    },
    previousPlanName: "پایه",
  },
};

