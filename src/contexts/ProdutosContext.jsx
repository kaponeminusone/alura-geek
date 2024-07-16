import { createContext, useEffect, useState } from "react";
import { produtos } from '../assets/utils/produtos';
// import http from '../http/index.js';

export const ProdutosContext = createContext();

export default function ProdutosContextProvider({ children }) {
    
    //para consumir de uma API usar o código abaixo, comentar o import de produtos e descomentar o import de http, verificar CardProduto e AdicionarProduto

    // const [categorias, setCategorias] = useState([]);
    // const [produtos, setProdutos] = useState([]);

    // useEffect(() => {
    //     http.get('/categorias')
    //         .then(categoria => {
    //             setCategorias(categoria.data);
    //             setProdutos(categoria.data);
    //         })
    //         .catch(err => console.log(err.message));
    // }, []);

    //fim do consumo da API, incluir no valor do provider os itens: categorias e produtos


    // O código abaixo é um mock para rodar sem API, caso venha de uma API, comentar o código abaixo e utilizar o código acima 

    const [categorias, setCategorias] = useState();
    const [produtosArmazenados, setProdutosArmazenados] = useState();
    const [quantidadeProdutos, setQuantidadeProdutos] = useState([]);
    const [totalProdutos, setTotalProdutos] = useState();

    useEffect(() => {
        setProdutosArmazenados(JSON.parse(sessionStorage.getItem('produtos')));
    }, []);

    useEffect(() => {
        if (produtosArmazenados) {
            produtosArmazenados.map(produto => {
                const indice = produtos.findIndex(categoria => categoria.titulo === produto.categoria);
                if (indice >= 0) {
                    produtos[indice].produtos.push(produto);
                } else {
                    const novaCategoria = {
                        'id': produtos.length + 1,
                        'titulo': produto.categoria,
                        'produtos': [produto]
                    };
                    produtos.push(novaCategoria);
                }
            });
        }
    }, [produtosArmazenados]);

    useEffect(() => {
        setCategorias(produtos.map(categoria => categoria));
        setQuantidadeProdutos(produtos.map(produtos => produtos.produtos.length));
    }, [produtosArmazenados]);

    useEffect(() => {
        setTotalProdutos(quantidadeProdutos.reduce((totalProdutos, produto) => totalProdutos + produto, 0));
    }, [quantidadeProdutos]);

    //fim do mock, incluir no valor do provider os itens: categorias, produtos, totalProdutos, setTotalProdutos

    return (
        <ProdutosContext.Provider value={{ categorias, produtos, totalProdutos, setTotalProdutos }}>
            {children}
        </ProdutosContext.Provider>
    );
}