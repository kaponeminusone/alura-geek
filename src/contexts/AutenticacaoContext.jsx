import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AutenticacaoContext = createContext();

export default function AutenticacaoContextProvider({ children }) {

    const navigate = useNavigate();
    const [autenticado, setAutenticado] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('user')) {
            setAutenticado(false);
        }else{
            setAutenticado(true);
        }
    }, []);

    function logar(dados) {
        if (!sessionStorage.getItem('user')) {
            setAutenticado(false);
            navigate('/login');
        }
        sessionStorage.setItem('user', dados.email);
        setAutenticado(true);
        navigate('/produtos');
    }

    return (
        <AutenticacaoContext.Provider value={{ autenticado, setAutenticado, logar }}>
            {children}
        </AutenticacaoContext.Provider>
    );
}