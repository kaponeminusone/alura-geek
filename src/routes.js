import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PaginaPadrao from './assets/components/PaginaPadrao';
import AdicionarProduto from './assets/pages/AdicionarProduto';
import DescricaoProduto from './assets/pages/DescricaoProduto';
import Home from './assets/pages/Home';
import Login from './assets/pages/Login';
import Produtos from './assets/pages/Produtos';
import AutenticacaoContextProvider, { AutenticacaoContext } from './contexts/AutenticacaoContext';
import BuscaContextProvider from './contexts/BuscaContext';
import ProdutosContextProvider from './contexts/ProdutosContext';
import ScreenContextProvider from './contexts/ScreenContext';

export default function AppRouter() {

    function Private({children}){
        const { autenticado } = useContext(AutenticacaoContext);

        if(!autenticado){
            return <Navigate to='/login' />
        }

        return children;
    }

    return (
        <Router>
            <ScreenContextProvider>
                <BuscaContextProvider>
                    <ProdutosContextProvider>
                        <AutenticacaoContextProvider>
                            <Routes>
                                <Route path='/' element={<PaginaPadrao />}>
                                    <Route index element={<Home />} />
                                    <Route path='login' element={<Login />} />
                                    <Route path='produtos' element={<Private><Produtos /></Private>} />
                                    <Route path='/produtos/adicionar' element={<Private><AdicionarProduto /></Private>} />
                                    <Route path='/produtos/:id' element={<DescricaoProduto />} />
                                </Route>
                            </Routes>
                            </AutenticacaoContextProvider>
                    </ProdutosContextProvider>
                </BuscaContextProvider>
            </ScreenContextProvider>
        </Router>
    );
}