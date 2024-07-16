import styles from './login.module.css';
import { TextField } from '@mui/material';
import BotaoPrimario from '../../components/BotaoPrimario';
import { regExPassword } from '../../utils/regexValidation';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CampoErro from '../../components/CampoErro';
import { useContext } from 'react';
import { AutenticacaoContext } from '../../../contexts/AutenticacaoContext';

export default function Login() {

    let validacao = yup.object().shape({
        email: yup.string().email().required().max(50),
        senha: yup.string().matches(regExPassword).required().max(15)
    });
    
    const { logar } = useContext(AutenticacaoContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacao)
    }, []);

    return (
        <section>
            <div className='container'>
                <form className={styles.formulario__login} onSubmit={handleSubmit(logar)}>
                    <fieldset>
                        <legend>Iniciar Sessão</legend>
                        <TextField
                            {...register('email')}
                            name='email'
                            type='email'
                            fullWidth
                            size="small"
                            label='Escreva seu e-mail'
                            variant='filled'
                            sx={
                                {
                                    "& .MuiInputLabel-root": { color: 'gray' },
                                    "& .MuiInputBase-root": { backgroundColor: 'white', ":hover": { backgroundColor: 'white' }, height: 45 },
                                    borderRadius: 4,
                                    marginTop: 2,
                                    marginBottom: 2,
                                    label: { fontFamily: 'Raleway', fontSize: 16, opacity: 0.6 }
                                }
                            }
                        />
                        {errors?.email?.message && <CampoErro type={errors.email.type} field="email" />}
                        <TextField
                            {...register('senha')}
                            name='senha'
                            type='password'
                            fullWidth
                            size="small"
                            label='Escreva sua senha'
                            variant='filled'
                            sx={
                                {
                                    "& .MuiInputLabel-root": { color: 'gray' },
                                    "& .MuiInputBase-root": { backgroundColor: 'white', ":hover": { backgroundColor: 'white' }, height: 45 },
                                    borderRadius: 4,
                                    marginTop: 2,
                                    marginBottom: 2,
                                    label: { fontFamily: 'Raleway', fontSize: 16, opacity: 0.6 }
                                }
                            }
                        />
                        {errors?.senha?.message && <CampoErro type={errors.senha.type} field="senha" />}
                        <BotaoPrimario classe='entrar' texto='Entrar' tipo='submit' />
                    </fieldset>
                </form>
            </div>
        </section>
    );
}