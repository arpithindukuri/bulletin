export interface Board {
  name: string;
  description: String;
}

export interface Note {
  name: string;
  date: string;
  content: string;
}

export interface List {
  name: string;
  listItem: Array<ListItem>;
}

export interface ListItem {
  name: string;
  isDone: boolean;
}

export interface Expense {
  name: string;
  deadline: string;
  amount: number;
  assignee: string;
}
export interface Budget {
  name: string;
  date: string;
  assigned: string;
  balance: number;
}

export interface Event {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
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
export interface BoardUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

/** Number of milliseconds from UNIX Epoch */
export type Timestamp = Number;
