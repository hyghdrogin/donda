import { Request } from "express";

export interface CustomRequest {
  user: IUser
  file: any
}
export interface IUserRequest extends Request {
    user: any
}

export interface IUser {
  _id?: string        
  email: string        
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  photo?: string
  role?: string
  createdAt?: Date     
  updatedAt?: Date        
}

export interface IProduct {
  _id?: string        
  name: string        
  price: number
  quantity?: number
  createdAt?: Date     
  updatedAt?: Date        
}

export interface ICart {
   _id?: string        
  user?: string        
  products?: string[]
  quantity?: number
  createdAt?: Date     
  updatedAt?: Date        
}

export interface ILogin {    
  email: string        
  password: string      
}

export interface IProductQuery {
  jobTitle: string;
  yearOfExperience: string;
  experienceLevel: string;
  employmentType: string;
  workStructure: string;
  location: string;
  $text: Search;
}

export interface Search {
  $search: string;
}