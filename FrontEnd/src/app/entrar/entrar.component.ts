import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.id = this.userLogin.id
      environment.email = this.userLogin.email
      environment.tipo = this.userLogin.tipo

      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.id)
      console.log(environment.foto)
      console.log(environment.tipo)
      
      this.router.navigate(['/pedido'])
    },
      erro => {
        if (erro.status == 500) {
          Swal.fire({
            icon: 'error',
            title: 'Atenção',
            text: 'Dados do cartão estão incorretos.'
          })
        }
      })
  }
}