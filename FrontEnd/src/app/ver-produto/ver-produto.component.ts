import { ActivatedRoute, Router } from '@angular/router';
import { VerProduto } from '../model/VerProduto';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import Swal from 'sweetalert2'; //importado de https://sweetalert2.github.io/
import { VerProdutoService } from '../service/ver-produto.service';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-ver-produto',
  templateUrl: './ver-produto.component.html',
  styleUrls: ['./ver-produto.component.css'],
})
export class VerProdutoComponent implements OnInit {

  verProduto: VerProduto = new VerProduto()
  pedido: VerProduto[]
  quantidade: number
  subTotal: number
  user: User = new User()
  idUser = environment.id
  cor: string
  tema: string
  tamanho: string
  modelo: string
//ATÉ AQUI SOMA OK
  public id: number
  public nome: string
  public foto: string
  public estoque: number
  public preco: number
  //COM ESSES, MULTIPLICA OK
  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private verProdutoService: VerProdutoService) {}
  
  ngOnInit() {
      window.scroll(0, 0);
      let id = this.aRoute.snapshot.params['id'];
      this.findProdById(id);
      this.quantidade = 1;//SOMA OK
      this.subTotal = this.verProduto.preco;
      this.calculaSubTotal();//MULTIPLICA OK
      console.log('verproduto ', this.verProduto);//MULTIPLICA OK
    }

  findProdById(id: number) {
    this.verProdutoService.getByIdProduto(id).subscribe((resp: VerProduto) => {
      this.verProduto = resp
      console.log('verproduto ', this.verProduto);//MULTIPLICA OK
    });
  }

  processo(valor: number) {
    valor += this.quantidade;
    if (valor < 1) {
      this.quantidade = 1;
    } else if (valor >= this.verProduto.estoque - 1) {
      this.quantidade = this.verProduto.estoque - 1;
    } else {
      this.quantidade = valor;
    }
  }

  calculaSubTotal() {
    this.subTotal = this.verProduto.preco * this.quantidade;
    return this.subTotal;
  }

  addPedido() {
    if (environment.token == "") {
      Swal.fire({
        icon: 'error',
        title: 'Putz!',
        text: 'Faça login para comprar',
      });

      this.router.navigate(["/login"])
    } else {
      this.calculaSubTotal()
      this.pedido = JSON.parse(localStorage.getItem('pedido') || '[]')

      this.pedido.push(
        {
          id: this.verProduto.id,
          nome: this.verProduto.nome,
          foto: this.verProduto.foto,
          estoque: this.verProduto.estoque,
          preco: this.verProduto.preco,
          categoria: this.verProduto.categoria,
          user: this.verProduto.user,
          quantidade: this.quantidade,
          subTotal: this.subTotal,
          cor: this.cor,
          tema: this.tema,
          tamanho: this.tamanho,
          modelo: this.modelo
        })
      localStorage.setItem('pedido', JSON.stringify(this.pedido))
      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text: 'Produto adicionado com sucesso!'
      })

      this.router.navigate(['/pedido'])
    }
  }
}