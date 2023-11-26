import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:3000"
  public logueado: boolean
  public user: User

  constructor(private http: HttpClient) {
    this.logueado = false
  }

  public register(user: User):Observable<object>{
    return this.http.post(this.url + "/register", user)
    
  }

  public login (user: User):Observable<object>{
    return this.http.post(this.url + "/login", user)
  }

}
