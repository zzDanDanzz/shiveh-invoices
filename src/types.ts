export type Seller = Pick<
  User,
  | "address"
  | "account_type"
  | "company"
  | "national_number"
  | "financial_code"
  | "postalcode"
  | "telephone"
> & {
  shaiba_number: string;
  account_number: string;
  bank_branch: string;
};

export type Buyer = Pick<
  User,
  | "address"
  | "account_type"
  | "company"
  | "name"
  | "national_number"
  | "national_identity"
  | "financial_code"
  | "postalcode"
  | "telephone"
>;
export interface CurrentPlan {
  id: number;
  plan_id: number;
  from_date: string;
  to_date: string;
  expence: number;
  is_paid: boolean;
  client_id: number;
  created_at: string;
  updated_at: string;
  plan: Plan;
}

export interface History {
  id: number;
  plan_id: number;
  from_date: string;
  to_date: string;
  expence: number;
  is_paid: boolean;
  client_id: number;
  created_at: string;
  updated_at: string;
  plan: Plan;
}

export interface Invoice {
  id: number;
  client_id: number;
  details: Details;
  from_date: string;
  to_date: string;
  is_paid: boolean;
  created_at: string;
  updated_at: string;
  cost: string;
  type: string;
  invoice_number?: any;
  cost_in_string: string;
  status: string;
  final_price: number;
  balance: number;
  plan: Plan;
  remainingDays?: any;
  remainOfPrevPlan?: any;
  previousPlanName?:string
}

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  username: string;
  client_id: number;
  scopes: string[];
  created_at: string;
  updated_at: string;
  mobile: string;
  is_disabled: boolean;
  image?: any;
  national_number?: string;
  company?: any;
  postalcode?: any;
  telephone?: any;
  national_identity?: string;
  financial_code?: any;
  account_type: AccountType;
  is_hardcoded: boolean;
  max_projects_count: number;
  last_login: string;
  expiration_time?: any;
  start_time?: any;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  alerts: any[];
  roles: any[];
  my_app?: any;
  action_areas: any[];
  action_time: any[];
}

interface Plan {
  id: number;
  name: string;
  cost_per_month: number;
  request_per_day: number;
  cost_per_year: Costperyear;
}

interface Costperyear {
  en: number;
  fa: string;
}

interface Details {
  plan_id: number;
  month: string;
  tax_percent: number;
  tax: number;
}

interface Plan {
  id: number;
  name: string;
  cost_per_month: number;
  request_per_day: number;
  cost_per_year: CostPerYear;
}

interface CostPerYear {
  en: number;
  fa: string;
}

export interface UsageReportData {
  total: number;
  daily_usage: Dailyusage;
  per_service: Perservice;
  per_status: Perstatus;
}

interface Perstatus {
  status: string[];
  count: number[];
}

interface Perservice {
  service: string[];
  count: number[];
}

interface Dailyusage {
  day: string[];
  count: number[];
}

export type AccountType = "legal" | "natural";
