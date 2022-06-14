import { Router } from "express"

export type RequireField<T, K extends keyof T> = T & Required<Pick<T,K>>
export type RequireFieldPartial<T, K extends keyof T> = Partial<T> & Required<Pick<T,K>>
declare namespace MyModule {  
  export interface Controller {
    path: string,
    router: Router
  }
}

export = MyModule