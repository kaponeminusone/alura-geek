import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const BuscaContext = createContext();

export default function BuscaContextProvider({children}){

    const navigate = useNavigate();
    const [busca, setBusca] = useState('');

    function enviar(evento) {
        evento.preventDefault();
        navigate('/produtos');
     }

    return(
        <BuscaContext.Provider value={{busca, enviar, setBusca}}>
            {children}
        </BuscaContext.Provider>
    );
}