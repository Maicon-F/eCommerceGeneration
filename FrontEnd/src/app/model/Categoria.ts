import { Produto } from "./Produto"
import { VerProduto } from "./VerProduto"

export class Categoria {

    public id: number
    public tema: string
    public produto: Produto[]
    public verproduto: VerProduto[]

}
