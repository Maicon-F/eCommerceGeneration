import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  nomeValido: boolean = false;
  emailValido: boolean = false;


  constructor() { }

  ngOnInit() {
  }


  mensagem() {
    Swal.fire({
      icon: 'success',
      title: 'Mensagem Enviada!',
      text: 'Obrigade pelo seu interesse. Retornaremos em breve!'
    })
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
}
