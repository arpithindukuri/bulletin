export interface Board {
  id: string | null;
  name: string;
  description: string;
  memberUserIDs: string;
  notes: Note[];
  lists: List[];
}

export interface Note {
  id: string | null;
  content: string;
  author: string;
  timestamp: Timestamp;
  attachmentURL?: string;
}

export interface List {
  id: string | null;
  name: string;
  items: ListItem[];
}

export interface ListItem {
  id: string | null;
  name: string;
  isDone: boolean;
}

export interface Expense {
  id: string | null;
  name: string;
  dueDate: Timestamp;
  amount: Money;
  assignedUserID: string;
  balance: Money;
}

export interface Budget {
  id: string | null;
  name: string;
  endDate: string;
  amount: Money;
  assignedUserID: string;
  balance: Money;
}

export interface Event {
  id: string | null;
  name: string;
  startTime: Timestamp;
  endTime: Timestamp;
  description: string;
  tags: Tag[];
}

export interface Tag {
  id: string | null;
  name: string;
  /** Hex value of the tag's color */
  color: string;
}

export interface PersonalReminder {
  id: string;
  name: string;
  time: Timestamp;
}

export interface PersonalNote {
  id: string;
  name: string;
  content: string;
}

export interface User {
  id: string | null;
  name: string;
  email: string;
  pictureURL?: string;
  dateOfBirth: any;
  alternativeEmail?: string;
  phoneNumber: string;
  overview: string;
  reminders: PersonalReminder[];
  notes: PersonalNote[];
}

/** Number of **milliseconds** from UNIX Epoch */
export type Timestamp = number;

/** Number of CAD cents */
export type Money = number;
