import { Link } from 'react-router-dom';
import styles from './cardProduto.module.css';

export default function CardProduto({ admin, produto }) {
    return (
        <Link to={`/produtos/${produto.id}`}>
            <div className={styles.card}>
                <img className={styles.imagem__produto} src={produto.imagem} alt='Foto do produto' />
                <h4 className={styles.nome__produto}>{produto.nome}</h4>

                {/* Descomentar linha abaixo se rodando através de API */}
                {/* <p className={styles.preco__produto}>R$ {produto.preco}</p>  */}

                {/* Descomentar linha abaixo se rodando através de Mock */}
                <p className={styles.preco__produto}>R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                {
                    admin ?
                        <p className={styles.id__produto}>#{produto.id}</p>
                        :
                        <p className={styles.verProduto}>Ver produto</p>
                }
            </div>
        </Link>
    );
}