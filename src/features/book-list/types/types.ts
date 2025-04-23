export interface CountResponse {
  quantity: number;
}

export interface BorrowedCountStatsResponse {
  label: "< 10" | "10 - 100" | "> 100";
  count: number;
  _id: any;
}