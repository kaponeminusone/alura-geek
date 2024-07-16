import styles from './adicionarProduto.module.css';
import { TextField } from '@mui/material';
import BotaoPrimario from '../../components/BotaoPrimario/index';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CampoErro from '../../components/CampoErro';
import { useContext } from 'react';
import { ProdutosContext } from '../../../contexts/ProdutosContext';
// import http from '../../../http/index.js';

export default function AdicionarProduto() {

    let validacao = yup.object().shape({
        id: yup.number(),
        imagem: yup.string().required(),
        categoria: yup.string().required().max(20),
        nome: yup.string().required().max(20),
        preco: yup.number().transform(value => (isNaN(value) ? undefined : value)).required().typeError().max(9999999999).positive(),
        descricao: yup.string().required().max(150),
    });

    const { totalProdutos, setTotalProdutos } = useContext(ProdutosContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validacao)
    }, []);

    function cadastrarProduto(produto) {

        //para enviar para uma API usar o código abaixo

        // http.post('/categorias', {
        //     "titulo": produto.categoria,
        //     "produtos": [{
        //         "id": produto.id,
        //         "imagem": produto.imagem,
        //         "nome": produto.nome,
        //         "preco": produto.preco,
        //         "descricao": produto.descricao
        //     }]
        // }).then(() => {
        //     alert("Produto inserido com sucesso!");
        //     reset();
        // }).catch(err => alert(err.message));

        //o código abaixo é um mock para utilização sem API, caso exista uma API comentar código abaixo e utilizar o código acima

        let produtosArmazenados = JSON.parse(sessionStorage.getItem('produtos') || '[]');
        produtosArmazenados.push(produto);
        sessionStorage.setItem('produtos', JSON.stringify(produtosArmazenados));
        reset();
        alert("Poduto adicionado com sucesso!");
        setTotalProdutos(totalProdutos + 1);

        //fim do mock
    }

    return (
        <section>
            <div className={`${styles.adicionarProduto} container`}>
                <h3>Adicionar novo produto</h3>
                <form id="formulario" className={styles.formulario__produto} onSubmit={handleSubmit(cadastrarProduto)}>
                    <fieldset>
                        <input hidden name='id' {...register('id')} value={totalProdutos + 1} /> {/* input inserido para realização do mock, remover se existir API */}
                        <TextField
                            name='imagem'
                            {...register('imagem')}
                            fullWidth
                            size="small"
                            label='URL da imagem'
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
                        {errors?.imagem?.message && <CampoErro type={errors.imagem.type} field="imagem" />}
                        <TextField
                            name='categoria'
                            {...register('categoria')}
                            fullWidth
                            size="small"
                            label='Categoria'
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
                        {errors?.categoria?.message && <CampoErro type={errors.categoria.type} field="categoria" />}
                        <TextField
                            name='nome'
                            {...register('nome')}
                            fullWidth
                            size="small"
                            label='Nome do produto'
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
                        {errors?.nome?.message && <CampoErro type={errors.nome.type} field="nome" />}
                        <TextField
                            name='preco'
                            {...register('preco')}
                            fullWidth
                            size="small"
                            label='Preço do produto'
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
                        {errors?.preco?.message && <CampoErro type={errors.preco.type} field="preco" />}
                        <TextField
                            name='descricao'
                            {...register('descricao')}
                            fullWidth
                            size="small"
                            label='Descrição do produto'
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
                                    label: { fontFamily: 'Raleway', fontSize: 16, opacity: 0.6 }
                                }
                            }
                        />
                        {errors?.descricao?.message && <CampoErro type={errors.descricao.type} field="descricao" />}
                        <BotaoPrimario classe='adicionar' texto='Adicionar produto' tipo='submit' />
                    </fieldset>
                </form>
            </div>
        </section>
    );
}