import './botaoSecundario.css';

export default function BotaoSecundario({texto, classe}){
    return(
        <>
            <input type='button' className={`botaoSecundario ${classe}`} value={texto} />
        </>
    );
}