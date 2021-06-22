import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number

  confirmarSenha: string
  tipoUsuario: string

 
  nomeValido: boolean = false;
  emailValido: boolean = false;
  senhaValida: boolean = false;
  senhasIguais: boolean = false;


  

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    
    

    
  ) { }

  ngOnInit() {
    if (environment.token =='') {
      alert('Sua sessão expirou! Faça login novamente')
      this.router.navigate(['/entrar'])
     }

    window.scroll(0,0)

    this.idUser= this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }


  confirmSenha(event:any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event:any){
    this.tipoUsuario = event.target.value
  }


atualizar(){

  this.user.tipo=this.tipoUsuario
  if(this.user.senha != this.confirmarSenha){
    alert('As senhas estão incorretas!')

  }else{
    this.authService.cadastrar(this.user).subscribe((resp: User) =>{
      this.user = resp
      this.router.navigate(['/inicio'])
      Swal.fire({
        icon: 'success',
        title: 'Tudo certo!',
        text: 'para aplicar as as atualizaçoes, faça log out.'
      })
      })

  }
  
  
}






findByIdUser(id: number){
  this.authService.getByIdUser(id).subscribe((resp: User)=>{
    this.user = resp
  })

}



/* Validação de entrada  */

validacao(condicao: boolean, event:any){
  let valid = false;
  if(condicao){
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
  }else{
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
    valid = true;
  }
  return valid;
}

validaNome(event: any){
  this.nomeValido = this.validacao(event.target.value.length < 3, event);
  
  
}

validaEmail(event: any){
  this.emailValido = this.validacao(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.') == -1, event)
  
}

validaSenha(event: any){
  this.senhaValida = this.validacao(event.target.value.length < 6 || event.target.value.length > 20, event)
 
}

confirmaSenhas(event: any){
  this.senhasIguais = this.validacao(this.user.senha != this.confirmarSenha, event)
 
}




}
