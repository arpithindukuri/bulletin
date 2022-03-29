/**
 * **IMPORTANT**
 * **IMPORTANT**
 * **IMPORTANT**
 *
 * This document defines the data models being used by entire system.
 * Please follow ALL the following steps when using these types in any way.
 *
 * 1) Whenever you add, modify, or remove a type in this file, remember to:
 *     A) Update type "Types".
 *     B) Update, add, or remove the necessary typegaurds in functions and client.
 *
 * 2) Whenever you use a type from this file, remember to import it as a type, as follows:
 *     "import type {...} from .../types"
 *
 * **IMPORTANT**
 * **IMPORTANT**
 * **IMPORTANT**
 */

/**
 * Every single shared type in the system.
 */
export type Types =
  | "Board"
  | "Budget"
  | "Event"
  | "Expense"
  | "List"
  | "ListItem"
  | "Member"
  | "Money"
  | "Note"
  | "Permissions"
  | "PersonalNote"
  | "PersonalReminder"
  | "Role"
  | "Tag"
  | "Timestamp"
  | "User";

export type Role = "admin" | "member";

/** Number of CAD cents */
export type Money = number;

/** Number of **milliseconds** from UNIX Epoch */
export type Timestamp = number;

export type StatusType = "success" | "failure";

export interface ResponseBody {
  status: StatusType;
  content: any;
}

export interface Board {
  description: string;
  budgets: Budget[];
  events: Event[];
  expenses: Expense[];
  id: string | null;
  lists: List[];
  members: Member[];
  name: string;
  notes: Note[];
  permissions: Permissions;
  tags: Tag[];
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
  tag: Tag;
}

export interface Expense {
  amount: Money;
  assignedUserID: string;
  balance: Money;
  dueDate: Timestamp;
  id: string | null;
  name: string;
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

export interface Member {
  id: string | null;
  role: Role;
  userID: string;
}

export interface Note {
  attachmentURL?: string;
  author: string;
  content: string;
  id: string | null;
  timestamp: Timestamp;
}

export interface Permissions {
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

export interface PersonalNote {
  content: string;
  id: string | null;
  name: string;
  timestamp: Timestamp;
}

export interface PersonalReminder {
  id: string | null;
  name: string;
  time: Timestamp;
}

export interface Tag {
  /** Hex value of the tag's color */
  color: string;
  id: string | null;
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
  idToken?: string;
}
