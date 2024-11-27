export interface UserModel {
    id:number|null,
    name: string|null,
    login: string|null,
    password: string|null,
    deletedAt: Date|null
    //profileImage: string|null;
  };


export const USER:UserModel = {
    id: null,
    name: null,
    login: null,
    password: null,
    deletedAt: null
};