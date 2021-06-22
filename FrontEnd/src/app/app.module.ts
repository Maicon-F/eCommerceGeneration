import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FormsModule } from '@angular/forms';
import { ProdutoComponent } from './produto/produto.component';
import { HomeComponent } from './home/home.component';
import { VerProdutoComponent } from './ver-produto/ver-produto.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { PedidoComponent } from './pedido/pedido.component';
import { BuscarComponent } from './buscar/buscar.component';
import { MetodoPagamentoComponent } from './metodo-pagamento/metodo-pagamento.component';
import { DesignerComponent } from './designer/designer.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    HomeComponent,
    VerProdutoComponent,
    VitrineComponent,
    ProdutoComponent,
    ProdutoEditComponent,
    ProdutoDeleteComponent,
    PedidoComponent,
    BuscarComponent,
    MetodoPagamentoComponent,
    DesignerComponent,
    SobreNosComponent,
    CategoriaComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule{}