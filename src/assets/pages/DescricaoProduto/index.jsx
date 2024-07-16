import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProdutosContext } from '../../../contexts/ProdutosContext';
import Secao from '../../components/Secao';
import styles from './descricaoProduto.module.css';

export default function DescricaoProduto() {

    const { categorias } = useContext(ProdutosContext);
    const parametros = useParams();
    const [produto, setProduto] = useState([]);
    const [produtoPorCategoria, setProdutoPorCategoria] = useState();

    useEffect(() => {
        const categoria = categorias.find(categoria => categoria.produtos.find(produto => (produto.id === parseInt(parametros.id))));
        setProdutoPorCategoria(categoria);
        setProduto(categoria.produtos.find(produto => produto.id === parseInt(parametros.id)))
    }, [categorias, parametros]);

    return (
        <>
            <section>
                <div className={styles.imagem__mobile}
                    style={
                        {
                            backgroundImage: `url(${produto.imagem})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: "192px"
                        }
                    }
                >
                    <img src='' alt='Imagem do produto' />
                </div>
                <div className={`${styles.informacoes} container`}>
                    <div>
                        <img className={styles.imagem} src={produto.imagem} alt='Imagem do produto' />
                    </div>
                    <div>
                        <h2 className={styles.titulo__produto}>{produto.nome}</h2>
                        <p className={styles.preco__produto}>R$ {produto.preco}</p>
                        <p className={styles.descricao__produto}>{produto.descricao}</p>
                    </div>
                </div>
            </section>
            {produtoPorCategoria &&
                <>
                    <Secao titulo='Produtos similares' produtos={produtoPorCategoria.produtos} verTudo={false} />
                </>
            }
        </>
    );
}