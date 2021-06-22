import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metodo-pagamento',
  templateUrl: './metodo-pagamento.component.html',
  styleUrls: ['./metodo-pagamento.component.css']
})
export class MetodoPagamentoComponent implements OnInit {

  endereco: string
  cidade: string
  cep: string
  nomeCartao: string
  numeroCartao: string
  cpf: string
  codigoSegurancaCartao: string
  valorTotal: number

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.valorTotal = this.route.snapshot.params['valorTotal']}

  validadorBoleto() {
    if (this.endereco != null && this.cidade != null && this.cep != null) {
      this.router.navigate(['/home'])
      Swal.fire({
        icon: 'success',
        title: 'Pronto!',
        text: 'O boleto foi enviado no seu e-mail. Efetue o pagamento em até 3 dias úteis.'
      })
      localStorage.clear()

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Formulário preenchido incorretamente.'
      })
    }
  }

  validadorCartao() {
    if (this.endereco == null || this.cidade == null || this.cep == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Endereço incorreto.'
      })
    } else if (this.nomeCartao == null || this.cpf == null || this.numeroCartao == null || this.codigoSegurancaCartao == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Dados do cartão estão incorretos.'
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Pronto!',
        text: 'Muito obrigado! Aguarde o email com número do pedido e rastreio.'
      })
      this.router.navigate(['/home'])
      localStorage.clear()
    }
  }

  filtroCEP() {//Insere hífen e remove caracteres diferentes de digitos
    this.cep = this.cep.replace(/\D/g, "")                 
    this.cep = this.cep.replace(/(\d{5})(\d)/, "$1-$2")    
    return this.cep
  }

  filtroCPF() {//Tira caracteres que não são dígitos
    this.cpf = this.cpf.replace(/\D/g, "")                 
    this.cpf = this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4")
    return this.cpf
  }
  filtroNumeroCartao() {//Formata o número do cartão
    this.numeroCartao = this.numeroCartao.replace(/\D/g, "")
    this.numeroCartao = this.numeroCartao.replace(/(\d{4})(\d{4})(\d{4})(\d)/, "$1 $2 $3 $4")
    return this.numeroCartao
  }

  filtroCodigoSegurancaCartao() {//Tira caracteres que não são dígitos
    this.codigoSegurancaCartao = this.codigoSegurancaCartao.replace(/\D/g, "")  
    return this.codigoSegurancaCartao
  }
}
