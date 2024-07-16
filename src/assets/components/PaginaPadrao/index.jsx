import styles from './paginaPadrao.module.css';
import logo from '../../images/Logo.png';
import BotaoSecundario from '../BotaoSecundario';
import Lupa from '../Lupa';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import BotaoPrimario from '../BotaoPrimario';
import { useContext, useEffect, useState } from 'react';
import { BuscaContext } from '../../../contexts/BuscaContext';
import { regExName } from '../../utils/regexValidation';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CampoErro from '../../components/CampoErro';

export default function PaginaPadrao() {

   let validacao = yup.object().shape({
      nome: yup.string().required().matches(regExName).max(40),
      mensagem: yup.string().required().max(120)
   });

   const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(validacao)
   }, []);

   const [ativo, setAtivo] = useState(false);
   const [logado, setLogado] = useState(false);
   const [loginOuProdutos, setLoginOuProdutos] = useState(false);
   const location = useLocation();
   const { enviar, setBusca } = useContext(BuscaContext);

   function ativarBusca() {
      if (ativo) {
         setAtivo(false);
      } else {
         setAtivo(true);
      }
   }

   function enviarMensagem() {
      alert("Mensagem enviada com sucesso!");
      reset();
   }

   useEffect(() => {
      if (sessionStorage.getItem('user')) {
         setLogado(true);
      }

      if (window.location.pathname === '/login' || window.location.pathname === '/produtos') {
         setLoginOuProdutos(true);
      } else {
         setLoginOuProdutos(false);
      }

   }, [[location]]);

   return (
      <>
         <header>
            <div className={ativo ? `${styles.topo} ${styles.ativo} container` : `${styles.topo} container`} >
               <h1>
                  <Link to='/'>
                     <img src={logo} alt='Logo da Alura Geek' className={styles.logo__topo} />
                  </Link>
               </h1>
               <div className={styles.login}>
                  {
                     (logado && !loginOuProdutos) &&
                     <Link to='produtos'>
                        <BotaoSecundario texto='Menu administrador' classe='menuAdministrador' />
                     </Link>
                  }
                  {
                     (!logado && !loginOuProdutos) &&
                     <Link to='login'>
                        <BotaoSecundario texto='Login' classe='login' />
                     </Link>
                  }
               </div>
               <div className={styles.lupa} onClick={ativarBusca}>
                  <Lupa />
               </div>
               <form className={styles.buscar} onSubmit={enviar}>
                  <input type='text' placeholder='O que deseja encontrar?' className={styles.campo__busca} onChange={(e) => setBusca(e.target.value)} />
                  <i className={styles.icone__lupa} onClick={enviar} ><Lupa /></i>
                  <i className={styles.icone__fechar} onClick={ativarBusca} >X</i>
               </form>
            </div>
         </header>
         <main>
            <Outlet />
         </main>
         <footer>
            <div className={styles.rodape__secaoUm}>
               <div className={`${styles.rodape} container`}>
                  <nav className={styles.nav__rodape}>
                     <h2 className={styles.logo__rodape}><img src={logo} alt='Logo da Alura Geek' /></h2>
                     <ul className={styles.lista__rodape}>
                        <li>Quem somos nós</li>
                        <li>Política de privacidade</li>
                        <li>Programa fidelidade</li>
                        <li>Nossas lojas</li>
                        <li>Quero ser franqueado</li>
                        <li>Anuncie aqui</li>
                     </ul>
                  </nav>
                  <form className={styles.formulario__rodape} onSubmit={handleSubmit(enviarMensagem)}>
                     <fieldset>
                        <legend>Fale conosco</legend>
                        <div>
                           <TextField
                              {...register('nome')}
                              name='nome'
                              fullWidth
                              size="small"
                              label='Nome'
                              variant='filled'
                              sx={
                                 {
                                    "& .MuiInputLabel-root": { color: 'gray' },
                                    "& .MuiInputBase-root": { backgroundColor: 'white', ":hover": { backgroundColor: 'white' } },
                                    borderRadius: 4,
                                    marginTop: 2,
                                    marginBottom: 2,
                                    label: { fontFamily: 'Raleway', fontSize: 16 }
                                 }
                              }
                           />
                           {errors?.nome?.message && <CampoErro type={errors.nome.type} field="nome" />}
                        </div>
                        <div>
                           <TextField
                              {...register('mensagem')}
                              name='mensagem'
                              fullWidth
                              size="small"
                              label='Escreva sua mensagem'
                              variant='filled'
                              multiline
                              rows={3}
                              sx={
                                 {
                                    "& .MuiInputLabel-root": { color: 'gray' },
                                    "& .MuiInputBase-root": { backgroundColor: 'white', ":hover": { backgroundColor: 'white' } },
                                    borderRadius: 4,
                                    marginTop: 2,
                                    marginBottom: 2,
                                    label: { fontFamily: 'Raleway', fontSize: 16 }
                                 }
                              }
                           />
                           {errors?.mensagem?.message && <CampoErro type={errors.mensagem.type} field="mensagem" />}
                        </div>
                        <BotaoPrimario classe='enviarMensagem' texto='Enviar mensagem' tipo='submit' />
                     </fieldset>
                  </form>
               </div>
            </div>
            <div className={styles.rodape__secaoDois}>
               <p>Desenvolvido por Davi Oliveira</p>
               <p>2022</p>
            </div>
         </footer>
      </>

   );
}