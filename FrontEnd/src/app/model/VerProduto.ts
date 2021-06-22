import { Categoria } from "./Categoria"
import { User } from "./User"


export class VerProduto{

    public id: number
    public nome: string
    public foto: string
    public cor: string
    public tema: string
    public tamanho: string
    public preco: number
    public modelo: string
    public estoque: number
    public categoria: Categoria
    public user: User

    public quantidade: number

    public subTotal: number
}