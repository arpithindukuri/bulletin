const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const signInEndPoint = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + apiKey; 
const signUpEndPoint = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;

export {signInEndPoint, signUpEndPoint};