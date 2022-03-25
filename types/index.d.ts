export interface Board {
  name: string;
  description: String;
}

export interface Note {
  name: string;
  date: string;
  tags: string [];
  content: string;
}

export interface List {
  name: string;
}

export interface ListItem {
  name: string;
  isDone: boolean;
}

export interface Expense {
  name: string;
  deadline: string;
  /** Number of cents to be paid */
  amount: Number;
}
export interface Budget {
  name: string;
  date: string;
  assigned: String;
  /** Number of cents to be paid */
  balance: Number;
}

export interface Event {
  name: string;
  date: String;
}

export interface User {
  id: string;
  name: string;
  email: string;
  birthDay: any;
  alternativeEmail: string;
  phoneNumber: string;
  overview: string;
  boards: Array<string>;
  idToken: string;
}

/** Number of milliseconds from UNIX Epoch */
export type Timestamp = Number;
