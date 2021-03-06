interface UserDataResponse {
  id: string;
  name: string;
  email: string;
  birthDay: any;
  alternativeEmail: string;
  phoneNumber: string;
  overview: string;
  boards: Array<string>;
  idToken?: string;
  lastLogin?: Date;
}

export default UserDataResponse;
