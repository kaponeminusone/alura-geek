import styles from './erroImagem.module.css';

export default function ErroImagem({children}){
    return(
        <>
            <span className={styles.erro}>{children}</span>
        </>
    );
}