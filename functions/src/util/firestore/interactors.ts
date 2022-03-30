import { Response } from "firebase-functions/v1";
import { sendServerFailure } from "../response";
import { getColRef, getDocRef } from "./refs";

export async function createCol(
  docPath: string,
  colName: string,
  data: any[],
  errorResponse: Response
) {
  const colRef = await getColRef(`${docPath}/${colName}`, errorResponse);

  data.forEach(async (item) => {
    const newDocRef = await createDoc(colRef.path, item, errorResponse);

    if (!newDocRef)
      sendServerFailure(
        errorResponse,
        `${data} could not be added to ${`${docPath}/${colName}`}`
      );
  });

  return colRef;
}

/**
 * This function will add a document at the collection specified by `colPath`, and
 * return a reference to the newly added document.
 * If the document cannot be added, the firebase function will be terminated
 * by sending an error message to the user using `errorResponse`.
 * @param colPath
 * @param data
 * @param errorResponse
 * @returns
 */
export async function createDoc(
  colPath: string,
  data: any,
  errorResponse: Response
) {
  const colRef = await getColRef(colPath, errorResponse);

  const docRef = colRef.doc();

  if (!docRef)
    sendServerFailure(
      errorResponse,
      `${data} could not be added to ${colPath}`
    );

  var fields: FirebaseFirestore.DocumentData = {};

  for (const prop in data) {
    if (prop === "id") continue;
    else if (Array.isArray(data[prop])) {
      createCol(docRef.path, prop, data[prop], errorResponse);
    } else {
      fields[prop] = data[prop];
    }
  }

  const newDocRef = await docRef.set(fields);

  if (!newDocRef)
    sendServerFailure(
      errorResponse,
      `${data} could not be added to ${colPath}`
    );

  return docRef;
}

export async function readCol(colPath: string, errorResponse: Response) {
  const colRef = await getColRef(colPath, errorResponse);

  const documents = await colRef.listDocuments();

  const result = await Promise.all(
    documents.map(async (docRef) => await readDoc(docRef.path, errorResponse))
  );

  return result;
}

/**
 * This function will get a document at the collection specified by `docPath`, and
 * return a reference to the retreived document.
 * If the document cannot be retreived, the firebase function will be terminated
 * by sending an error message to the user using `errorResponse`.
 * @param docPath
 * @param errorResponse
 * @returns
 */
export async function readDoc(docPath: string, errorResponse: Response) {
  const docRef = await getDocRef(docPath, errorResponse);

  const fields = (await docRef.get()).data();

  const subCollectionRefs = await docRef.listCollections();

  var subCollectionsData = {};

  await Promise.all(
    subCollectionRefs.map(async (colRef) => {
      const colData = await readCol(colRef.path, errorResponse);
      subCollectionsData[colRef.id] = colData;
    })
  );

  const result = {
    id: docRef.id,
    ...fields,
    ...subCollectionsData,
  };

  return result;
}

/**
 * This function will edit the document specified by `docPath`, setting it to `data`,
 * and return a reference to the new, edited document.
 * If the document cannot be edited, the firebase function will be terminated
 * by sending an error message to the user using `errorResponse`.
 * @param colPath
 * @param data
 * @param errorResponse
 * @returns
 */
export async function updateCol(
  colPath: string,
  data: any[],
  errorResponse: Response
) {
  const colRef = await getColRef(colPath, errorResponse);

  // if (!colRef)
  //   sendServerFailure(
  //     errorResponse,
  //     `$the collection at ${colPath} could not be edited to ${data}`
  //   );

  const docList = await colRef.listDocuments();

  if (!docList)
    sendServerFailure(
      errorResponse,
      `$the collection at ${colPath} could not be edited to ${data}`
    );

  Promise.all(
    docList.map(async (doc) => {
      if (data.every((item) => doc.id !== item.id)) await doc.delete();
    })
  );

  Promise.all(
    data.map(async (item) => {
      const doc = docList.find((doc) => doc.id === item.id);
      if (doc) {
        const ref = await updateDoc(doc.path, item, errorResponse);
        if (!ref)
          sendServerFailure(
            errorResponse,
            `$the collection at ${colPath} could not be edited to ${data}`
          );
      } else if (!doc) {
        const ref = await createDoc(doc.parent.path, item, errorResponse);
        if (!ref)
          sendServerFailure(
            errorResponse,
            `$the collection at ${colPath} could not be edited to ${data}`
          );
      }
    })
  );

  return colRef;
}

/**
 * This function will edit the document specified by `docPath`, setting it to `data`,
 * and return a reference to the new, edited document.
 * If the document cannot be edited, the firebase function will be terminated
 * by sending an error message to the user using `errorResponse`.
 * @param docPath
 * @param data
 * @param errorResponse
 * @returns
 */
export async function updateDoc(
  docPath: string,
  data: FirebaseFirestore.DocumentData,
  errorResponse: Response
) {
  const docRef = await getDocRef(docPath, errorResponse);

  // if (!docRef)
  //   sendServerFailure(
  //     errorResponse,
  //     `$the document at ${docRef.path} could not be edited to ${data}`
  //   );

  var fields: FirebaseFirestore.DocumentData = {};

  for (const prop in data) {
    if (prop === "id") continue;
    else if (Array.isArray(data[prop])) {
      // editCol(docRef.path, prop, data[prop], errorResponse);
    } else {
      fields[prop] = data[prop];
    }
  }

  const editedDocRef = await docRef.set(fields);

  if (!editedDocRef)
    sendServerFailure(
      errorResponse,
      `$the document at ${docRef.path} could not be edited to ${data}`
    );

  return editedDocRef;
}

/**
 * This function will edit the document specified by `docPath`, setting it to `data`,
 * and return a reference to the new, edited document.
 * If the document cannot be edited, the firebase function will be terminated
 * by sending an error message to the user using `errorResponse`.
 * @param colPath
 * @param errorResponse
 * @returns
 */
export async function deleteCol(colPath: string, errorResponse: Response) {
  const colRef = await getColRef(colPath, errorResponse);

  // if (!colRef)
  //   sendServerFailure(
  //     errorResponse,
  //     `$the collection at ${colPath} could not be deleted`
  //   );

  const docList = await colRef.listDocuments();

  Promise.all(docList.map(async (doc) => await doc.delete()));
}

/**
 * This function will edit the document specified by `docPath`, setting it to `data`,
 * and return a reference to the new, edited document.
 * If the document cannot be edited, the firebase function will be terminated
 * by sending an error message to the user using `errorResponse`.
 * @param docPath
 * @param errorResponse
 * @returns
 */
export async function deleteDoc(docPath: string, errorResponse: Response) {
  const docRef = await getDocRef(docPath, errorResponse);

  // if (!docRef)
  //   sendServerFailure(
  //     errorResponse,
  //     `$the document at ${docRef.path} could not be deleted`
  //   );

  const subColRefs = await docRef.listCollections();

  subColRefs.forEach((ref) => deleteCol(ref.path, errorResponse));

  const deletedDocTime = await docRef.delete();

  if (!deletedDocTime)
    sendServerFailure(
      errorResponse,
      `$the document at ${docRef.path} could not be deleted`
    );

  return deletedDocTime;
}
