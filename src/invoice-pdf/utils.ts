
const p = "۰۱۲۳۴۵۶۷۸۹";
export const e2p = (s: string) => s.replace(/\d/g, (d) => p[Number(d)]);