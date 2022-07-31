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
  verified: boolean
  createdAt?: Date     
  updatedAt?: Date        
}

export interface IOtp {
  _id?: string        
  email: string        
  token: number
  expired: boolean
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