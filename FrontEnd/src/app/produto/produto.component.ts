import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos: Produto[]

  temaCategoria: String
  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      Swal.fire({
        icon: 'error',
        title: 'Putz!',
        text: 'Sessão expirada! Faça login novamente para continuar.',
      })
      this.router.navigate(['/entrar'])
    }
    this.findAllProdutos()
    this.getAllCategoria()
    console.log(this.idCategoria)
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  cadastrar() {
    this.categoria.id= this.idCategoria
    this.produto.categoria = this.categoria
    console.log(this.produto)
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text: 'Produto cadastrado com sucesso!',
      })
      this.findAllProdutos()
      this.produto = new Produto()
    })
  }

  findByTemaCategoria() {
    this.categoriaService.getByTemaCategoria(this.temaCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

}