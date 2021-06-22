import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})

export class VitrineComponent implements OnInit {

  produto: Produto = new Produto();
  listaProdutos: Produto[];

  categoria: Categoria = new Categoria();
  listaCategorias: Categoria[];
  idCategoria: number;

  user: User = new User();
  idUser = environment.id;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0);
    this.findAllProdutos();
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp;
    });
  }
}