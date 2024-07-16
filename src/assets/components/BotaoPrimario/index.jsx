import './botaoPrimario.css';

export default function BotaoPrimario({classe, texto, tipo}){
    
    return(
        <>
            <input type={tipo} className={`botaoPrimario ${classe}`} value={texto} />
        </>
    );
}