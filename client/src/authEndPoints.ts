const apiKey = "AIzaSyCvJNxQELUCOUTN-s-DYutLidT9UHhvdmo";

const signInEndPoint =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  apiKey;
const signUpEndPoint =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;
const getAccessTokenFromRefreshToken =
  "https://securetoken.googleapis.com/v1/token?key=" + apiKey;
const changePasswordEndPoint =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" + apiKey;

export {
  signInEndPoint,
  signUpEndPoint,
  getAccessTokenFromRefreshToken,
  changePasswordEndPoint,
};
