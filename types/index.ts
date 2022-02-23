export interface Board {
  name: string;
  notes: Note[];
  lists: List[];
  expenses: Expense[];
  events: Event[];
}

export interface Note {
  text: string;
  author: string;
  attachmentURLs: string[];
}

export interface List {
  name: string;
  items: ListItem[];
}

export interface ListItem {
  name: string;
  isDone: string;
}

export interface Expense {
  name: string;
  deadline: Timestamp;
  /** Number of cents to be paid */
  amount: Number;
}

export interface Event {
  name: string;
  start: Timestamp;
  end: Timestamp;
}

/** Number of milliseconds from UNIX Epoch */
export type Timestamp = Number;
