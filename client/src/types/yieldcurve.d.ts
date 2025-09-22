export interface Order {
  id: string;
  term: string;
  amount: number;
  created_at: string;
  user_id: string;
}

export interface OrderInput {
  term: string;
  amount: number;
  userId: string;
}
