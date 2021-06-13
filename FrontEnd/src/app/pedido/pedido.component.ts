import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { VerProduto } from '../model/VerProduto';
import Swal from 'sweetalert2'; //Alerta baixado de https://sweetalert2.github.io/#download

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  verProduto: VerProduto = new VerProduto
  pedido: VerProduto[]
  subTotal: number
  valorTotal: number
  vazio: string
  quantidade: number
  pedidoInic = { valor: 0 }

  constructor(
    private authService: AuthService,
    private router: Router){}

  ngOnInit() {
    window.scroll(0,0)
    this.mostrarPedido()
    this.calculaTotal()
  }

  mostrarPedido() {
    const localS = localStorage['pedido']
    if (localS.length > 0) {
      this.pedido = localS ? JSON.parse(localS) : []
    } else {
      this.vazio = "Não há pedidos ainda."
      this.valorTotal = 0
    }
  }

  calculaTotal() {
    this.valorTotal = 0
    let dadosProd = []
    dadosProd = JSON.parse(localStorage.getItem('pedido') || '{}')
    dadosProd.forEach((i: { subTotal: any; }) => {
      this.pedidoInic = {
        valor: i.subTotal
      }
      this.valorTotal = this.pedidoInic.valor + this.valorTotal
    })
    return this.valorTotal.toFixed(2)
  }

}
