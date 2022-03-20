export interface Board {
  name: string;
}

export interface Note {
  text: string;
  author: string;
  attachmentURLs: string[];
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
  date: Date;
}

/** Number of milliseconds from UNIX Epoch */
export type Timestamp = Number;
