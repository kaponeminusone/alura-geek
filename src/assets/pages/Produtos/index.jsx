import BotaoPrimario from '../../components/BotaoPrimario';
import CardProduto from '../../components/CardProduto';
import styles from './produtos.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BuscaContext } from '../../../contexts/BuscaContext';
import { ProdutosContext } from '../../../contexts/ProdutosContext';

export default function Produtos() {

    const { busca } = useContext(BuscaContext);
    const { categorias } = useContext(ProdutosContext);

    return (
        <section className={styles.secao__produtos}>
            <div className='container'>
                <div className={styles.topo__produtos}>
                    <h3>Todos os produtos</h3>
                    <Link to='/produtos/adicionar'>
                        <BotaoPrimario classe='adicionarProduto' texto='Adicionar Produto' tipo='button' />
                    </Link>
                </div>
                <div className={styles.produtos}>
                    {
                        (busca === '') ?
                            categorias.map(categoria => {
                                return categoria.produtos.map(produto => {
                                    return <CardProduto admin={true} produto={produto} key={produto.id} />
                                })
                            })
                            :
                            categorias.map(categoria => {
                                return categoria.produtos.map(produto => {
                                    if (produto.nome.toUpperCase().includes(busca.toUpperCase(busca))) {
                                        return <CardProduto admin={true} produto={produto} key={produto.id} />
                                    }
                                })
                            })
                    }
                </div>
            </div>
        </section>
    );
}