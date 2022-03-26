import { admin } from "./firebase";

export async function isUserAuthorized(
  userAccessToken: string | undefined | null
): Promise<boolean> {
  console.log("input access token is: ", userAccessToken);

  if (!userAccessToken) {
    return new Promise((resolve) => {
      resolve(false);
    });
  }

  const decodedToken = await admin
    .auth()
    .verifyIdToken(userAccessToken.trim());
    
    return decodedToken.uid != undefined;
}
