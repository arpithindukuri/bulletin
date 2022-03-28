/**
 * col = collection
 * doc = document
 * NO forward slashes (/) at start and end of any path
 */

export const getBoardColPath = () => `boards`;

export const getBoardDocPath = (boardID: string) => `boards/${boardID}`;

export const getBudgetColPath = (boardID: string) =>
  `boards/${boardID}/budgets`;

export const getBudgetDocPath = (boardID: string, budgetID: string) =>
  `boards/${boardID}/budgets/${budgetID}`;

export const getEventColPath = (boardID: string) => `boards/${boardID}/events`;

export const getEventDocPath = (boardID: string, eventID: string) =>
  `boards/${boardID}/events/${eventID}`;

export const getExpenseColPath = (boardID: string) =>
  `boards/${boardID}/expenses`;

export const getExpenseDocPath = (boardID: string, expenseID: string) =>
  `boards/${boardID}/expenses/${expenseID}`;

export const getListColPath = (boardID: string) => `boards/${boardID}/lists`;

export const getListDocPath = (boardID: string, listID: string) =>
  `boards/${boardID}/lists/${listID}`;

export const getListItemColPath = (boardID: string, listID: string) =>
  `boards/${boardID}/lists/${listID}/items`;

export const getListItemDocPath = (
  boardID: string,
  listID: string,
  listItemID: string
) => `boards/${boardID}/lists/${listID}/items/${listItemID}`;

export const getMemberColPath = (boardID: string) =>
  `boards/${boardID}/members`;

export const getMemberDocPath = (boardID: string, memberID: string) =>
  `boards/${boardID}/members/${memberID}`;

export const getNoteColPath = (boardID: string) => `boards/${boardID}/notes`;

export const getNoteDocPath = (boardID: string, noteID: string) =>
  `boards/${boardID}/notes/${noteID}`;

export const getPersonalNoteColPath = (userID: string) =>
  `users/${userID}/personalNotes`;

export const getPersonalNoteDocPath = (
  userID: string,
  personalNoteID: string
) => `user/${userID}/personalNotes/${personalNoteID}`;

export const getPersonalReminderColPath = (userID: string) =>
  `users/${userID}/personalReminders`;

export const getPersonalReminderDocPath = (
  userID: string,
  personalReminderID: string
) => `user/${userID}/personalReminders/${personalReminderID}`;

export const getTagColPath = (boardID: string) => `boards/${boardID}/tags`;

export const getTagDocPath = (boardID: string, tagID: string) =>
  `boards/${boardID}/tags/${tagID}`;

export const getUserColPath = () => `users`;

export const getUserDocPath = (userID: string) => `users/${userID}`;
