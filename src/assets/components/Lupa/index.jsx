import lupa from '../../images/Lupa.svg';
import styles from './lupa.module.css';

export default function Lupa() {

    return (
        <>
            <img src={lupa} alt='Botão de pesquisar, ícone de uma lupa' className={styles.lupa} />
        </>
    );
}