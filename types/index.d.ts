export interface Board {
  description: string;
  events: Event[];
  expenses: Expense[];
  id: string | null;
  lists: List[];
  memberPermissions: MemberPermissions;
  members: BoardMember[];
  name: string;
  notes: Note[];
}

export interface BoardMember {
  role: BoardMemberRole;
  userID: string;
}

export type BoardMemberRole = "admin" | "member";

export interface MemberPermissions {
  editCalendar: boolean;
  editExpenses: boolean;
  editLists: boolean;
  editNotes: boolean;
  editPersonalReminders: boolean;
  viewCalendar: boolean;
  viewExpenses: boolean;
  viewLists: boolean;
  viewNotes: boolean;
  viewPersonalReminders: boolean;
}

export interface Note {
  attachmentURL?: string;
  author: string;
  content: string;
  id: string | null;
  timestamp: Timestamp;
}

export interface List {
  id: string | null;
  items: ListItem[];
  name: string;
}

export interface ListItem {
  id: string | null;
  isDone: boolean;
  name: string;
}

export interface Expense {
  amount: Money;
  assignedUserID: string;
  balance: Money;
  dueDate: Timestamp;
  id: string | null;
  name: string;
}

export interface Budget {
  amount: Money;
  assignedUserID: string;
  balance: Money;
  endDate: Timestamp;
  id: string | null;
  name: string;
}

export interface Event {
  description: string;
  endTime: Timestamp;
  id: string | null;
  name: string;
  startTime: Timestamp;
  tags: Tag[];
}

export interface Tag {
  /** Hex value of the tag's color */
  color: string;
  id: string | null;
  name: string;
}

export interface PersonalReminder {
  id: string;
  name: string;
  time: Timestamp;
}

export interface PersonalNote {
  content: string;
  id: string;
  name: string;
}

export interface User {
  alternativeEmail?: string;
  dateOfBirth: string;
  email: string;
  id: string | null;
  name: string;
  notes: PersonalNote[];
  overview: string;
  phoneNumber: string;
  reminders: PersonalReminder[];
}

/** Number of **milliseconds** from UNIX Epoch */
export type Timestamp = number;

/** Number of CAD cents */
export type Money = number;
