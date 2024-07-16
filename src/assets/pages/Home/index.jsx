import styles from './home.module.css';
import { useContext } from 'react';
import { ProdutosContext } from '../../../contexts/ProdutosContext';
import Banner from '../../components/Banner/index';
import Secao from '../../components/Secao';

export default function Home() {

    const { produtos } = useContext(ProdutosContext);

    return (
        <>
            <Banner />
            <div className={styles.secao__produtos}>
                {
                    produtos.map(categoria => {
                        return <Secao titulo={categoria.titulo} produtos={categoria.produtos} verTudo={true} key={categoria.id} />
                    })
                }
            </div>
        </>
    );
}