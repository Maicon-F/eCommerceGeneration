import { VerProdutoService } from 'src/app/service/ver-produto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VerProduto } from '../model/VerProduto';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  pesquisa: string
  verProduto: VerProduto = new VerProduto()
  listaProdutos : VerProduto[]

  constructor(private route: ActivatedRoute, private verProdutoService: VerProdutoService) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.pesquisa = this.route.snapshot.params["pesquisa"]
    this.busca()
  }

  busca() {
    this.verProdutoService.getByNameProduto(this.pesquisa).subscribe((resp: VerProduto[]) => {
      this.listaProdutos = resp
    })
  }
}
