import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})

export class CadastrarComponent implements OnInit {

  user: User = new User()
  confirmarSenha: string
  nomeValido: boolean = false;
  emailValido: boolean = false;
  senhaValida: boolean = false;
  senhasIguais: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar() {
    if (this.user.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Senhas diferentes!'
      })
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        Swal.fire({
          icon: 'success',
          title: 'Protinho!',
          text: 'Usuário cadastrado com sucesso!'
        })

      }, error => {
        if (error.status == 400) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Email já cadastrado!'
          })
        }
      })
    }
  }

  /* Validação de entrada  */

  validacao(condicao: boolean, event: any) {
    let valid = false;
    if (condicao) {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
      valid = true;
    }
    return valid;
  }

  validaNome(event: any) {
    this.nomeValido = this.validacao(event.target.value.length < 3, event);
  }

  validaEmail(event: any) {
    this.emailValido = this.validacao(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.') == -1, event)
  }

  validaSenha(event: any) {
    this.senhaValida = this.validacao(event.target.value.length < 6 || event.target.value.length > 20, event)
  }

  confirmaSenhas(event: any) {
    this.senhasIguais = this.validacao(this.user.senha != this.confirmarSenha, event)
  }
}
