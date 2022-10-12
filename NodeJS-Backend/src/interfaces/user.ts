export interface UserCreate{
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: string;
  address: string;
  type: string;
  profile?:string;
  created_user_id:any
}