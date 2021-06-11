import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {



  
  produto: Produto = new Produto ()
  idProduto: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {

    if (environment.token =='') {
      alert('Sua sessão expirou! Faça login novamente')
      this.router.navigate(['/entrar'])
     }

     let id = this.route.snapshot.params['id']
     this.findByIdProduto(id)
  }


  findByIdProduto(id: number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }

  apagar() {
    this.produtoService.deleteProduto(this.idProduto).subscribe(()=>{
      alert('Produto apagada com sucesso!')
      this.router.navigate(['/produto'])
    })
  }

}
