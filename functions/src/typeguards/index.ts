import { Types } from "../../../types";
import { isBoard } from "./isBoard";
import { isMember } from "./isMember";
import { isRole } from "./isRole";
import { isBudget } from "./isBudget";
import { isEvent } from "./isEvent";
import { isExpense } from "./isExpense";
import { isList } from "./isList";
import { isListItem } from "./isListItem";
import { isPermissions } from "./isPermissions";
import { isMoney } from "./isMoney";
import { isNote } from "./isNote";
import { isPersonalNote } from "./isPersonalNote";
import { isPersonalReminder } from "./isPersonalReminder";
import { isTag } from "./isTag";
import { isTimestamp } from "./isTimestamp";
import { isUser } from "./isUser";

export function getTypegaurd(typegaurd: Types) {
  switch (typegaurd) {
    case "Board":
      return isBoard;
    case "Member":
      return isMember;
    case "Role":
      return isRole;
    case "Budget":
      return isBudget;
    case "Event":
      return isEvent;
    case "Expense":
      return isExpense;
    case "List":
      return isList;
    case "ListItem":
      return isListItem;
    case "Money":
      return isMoney;
    case "Note":
      return isNote;
    case "Permissions":
      return isPermissions;
    case "PersonalNote":
      return isPersonalNote;
    case "PersonalReminder":
      return isPersonalReminder;
    case "Tag":
      return isTag;
    case "Timestamp":
      return isTimestamp;
    case "User":
      return isUser;
    default:
      return null;
  }
}

export {
  isBoard,
  isBudget,
  isEvent,
  isExpense,
  isList,
  isListItem,
  isMember,
  isMoney,
  isNote,
  isPermissions,
  isPersonalNote,
  isPersonalReminder,
  isRole,
  isTag,
  isTimestamp,
  isUser,
};
