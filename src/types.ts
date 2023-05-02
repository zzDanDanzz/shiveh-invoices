
export interface User {
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
    national_number?: any;
    company?: any;
    postalcode?: any;
    telephone?: any;
    national_identity?: any;
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
    roles: Role[];
    my_app?: any;
    action_areas: any[];
    action_time: any[];
  }
  
  interface Role {
    id: number;
    name: string;
    scope?: string;
    title?: string;
    user_count: number;
    pivot: Pivot;
    permissions: Permission[];
  }
  
  interface Permission {
    id: number;
    domain?: string | string;
    action: string;
    access: string;
    subdomain?: string;
    description?: string;
    service: string;
    identifier?: any;
    title?: (null | string)[];
    pivot: Pivot2;
  }
  
  interface Pivot2 {
    role_id: number;
    permission_id: number;
  }
  
  interface Pivot {
    user_id: string;
    role_id: number;
  }
  
  export interface Project {
    id: number;
    name: string;
    scopes: string[];
    personal_access_client: boolean;
    password_access_client: boolean;
    created_at: string;
    updated_at: string;
    ip?: any;
    domain?: any;
    to_date: string;
    is_disabled: boolean;
    balance: number;
    plan_id: number;
    preferred_plan_id: number;
    redirect_uri: string;
    total_count: number;
    rate: number;
    logo?: any;
    is_disabled_admin?: any;
    company?: any;
    access_token: AccessToken;
    old_access_token: OldAccessToken | null;
    current_plan: CurrentPlan;
    reserved_plan?: any;
    history: CurrentPlan[];
    invoice: Invoice[];
    user: User;
    remain: number;
    use: number;
    ttl: number;
  }
  
  interface OldAccessToken {
    token: string;
    user_id?: any;
    client_id: number;
    scopes?: any;
    expired_at: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    ttl: number;
    ttl_in_hour: number;
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
  
  interface CurrentPlan {
    id: number;
    plan_id: number;
    from_date: string;
    to_date: string;
    expense: string;
    is_paid: boolean;
    client_id: number;
    updated_at: string;
    created_at: string;
    plan: Plan;
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
  
  interface AccessToken {
    token: string;
    user_id?: any;
    client_id: number;
    scopes?: any;
    expired_at: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
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
