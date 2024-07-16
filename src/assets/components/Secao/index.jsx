import styles from './secao.module.css';
import seta from '../../images/Arrow.png';
import CardProduto from '../CardProduto';
import { useContext } from 'react';
import { ScreenContext } from '../../../contexts/ScreenContext';
import { Link } from 'react-router-dom';

export default function Secao({ produtos, titulo, verTudo }) {

   const { desktopScreen } = useContext(ScreenContext);
   let contador = 0;

   return (
      <section className={styles.secao__produtos}>
         <div className='container'>
            <div className={styles.titulo}>
               <h3>{titulo}</h3>
               {
                  verTudo
                  &&
                  <Link to='produtos'>
                     <div className={styles.verTudo}>
                        <p>Ver tudo</p>
                        <img src={seta} alt='Seta indicando para a direita' className={styles.seta} />
                     </div>
                  </Link>
               }
            </div>
            <div className={styles.produtos}>
               {desktopScreen
                  ?
                  produtos.map(produto => {
                     contador++;
                     if (contador < 7) {
                        return <CardProduto admin={false} produto={produto} key={produto.id} />
                     }
                  })
                  :
                  produtos.map(produto => {
                     contador++;
                     if (contador < 5) {
                        return <CardProduto admin={false} produto={produto} key={produto.id} />
                     }
                  })
               }
            </div>
         </div>
      </section>
   );
}