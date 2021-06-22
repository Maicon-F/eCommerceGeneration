import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  


  constructor(
    private http: HttpClient,
     public router : Router
  ) { }

  entrar(userLogin: UserLogin) : Observable<UserLogin>{
    return this.http.post<UserLogin>('https://hw-tshirts.herokuapp.com/usuario/logar',userLogin)
  }

  cadastrar(user: User) : Observable<User>{
    return this.http.post<User>('https://hw-tshirts.herokuapp.com/usuario/cadastrar',user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://hw-tshirts.herokuapp.com/usuario/${id}`)
  }

  logado(){
    let ok: boolean = false

    if (environment.token !='') {
      ok = true
    }
    return ok
  }

  admin(){
    let ok: boolean = false

    if (environment.tipo =='admin') {
      ok = true
    }
    return ok
  }

  DesligarMenuERodape(){
    let ok: boolean = true
    if(this.router.url == '/entrar' || this.router.url == '/produto' || this.router.url == '/cadastrar') {
      ok = false
    }
    return ok
  }

}
