import styles from './banner.module.css';
import BotaoPrimario from '../BotaoPrimario';
import { Link } from 'react-router-dom';

export default function Banner(){
    return(
        <section className={styles.secao__banner}>
            <div className={`${styles.banner} container`}>
                <h2>Dezembro promocional</h2>
                <p>Produtos selecionados com 33% de desconto</p>
                <BotaoPrimario classe='verConsoles' texto='Ver consoles' tipo='button' />
            </div>
        </section>
    );
}