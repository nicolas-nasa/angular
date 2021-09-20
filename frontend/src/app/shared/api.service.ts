import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  registerUser(data : any){
    return this.http.post<any>("http://localhost:3333/registeruser",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  confirmCode(data : any){
    return this.http.patch<any>("http://localhost:3333/confirmcode",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  changeEmail(data : any){
    return this.http.delete<any>("http://localhost:3333/changeemail",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  changeCode(data : any){
    return this.http.patch<any>("http://localhost:3333/changecode",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
