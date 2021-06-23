import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerProduto } from '../model/VerProduto';

@Injectable({
  providedIn: 'root'
})
export class VerProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByNameProduto(nome: string): Observable<VerProduto[]> {
    return this.http.get<VerProduto[]>(`https://hw-tshirts.herokuapp.com/produto/nome/${nome}`, this.token)
  }

  getAllProdutos(): Observable<VerProduto[]> {
    return this.http.get<VerProduto[]>('https://hw-tshirts.herokuapp.com/produto', this.token)
  }

  getByIdProduto(id: number): Observable<VerProduto> {
    return this.http.get<VerProduto>(`https://hw-tshirts.herokuapp.com/produto/${id}`, this.token)
  }

  /* getByIdProduto(id:number): Observable <VerProduto>{ //Busca produto por id
      return this.http.get<VerProduto>(`${environment.baseUrl}/ver-produto/${id}`)
    }
  
  
     getByNameProduto2(nome:string): Observable <VerProduto[]>{ //Busca produto por nome
      return this.http.get<VerProduto[]>(`${environment.baseUrl}/ver-produto/nome/${nome}`)
    }
  
  
    getAllProduto(): Observable <VerProduto[]>{  //Busca todos os produtos
      return this.http.get<VerProduto[]>(`${environment.baseUrl}/ver-produto`)
    }
  
  /*  postProduto(produto:VerProduto):Observable<VerProduto>{
      return this.http.post<VerProduto>(`${environment.baseUrl}/produto`,produto,this.token)
    }
  
    putProduto(produto:VerProduto):Observable<VerProduto>{
      return this.http.put<VerProduto>(`${environment.baseUrl}/produto`,produto,this.token)
    }
  
    deleteProduto(id:number):Observable<VerProduto>{
      return this.http.delete<VerProduto>(`${environment.baseUrl}/produto/${id}`, this.token)
    } */
}