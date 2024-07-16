import { useEffect, useState } from 'react';
import styles from './botaoEnviarArquivo.module.css'

export default function BotaoEnviarArquivo({name, register}) {

    const [imagem, setImagem] = useState();

    function pegarCaminhoImagem(event) {
        setImagem(event.target.files[0].name);
    }

    return (
        <div className={styles.botao}>
            <label htmlFor='imagem'>Escolha a imagem do produto: </label>
            <input type='file' {...register(`${name}`)} name={name} accept=".png, .jpg, .jpeg" id='imagem' hidden onInput={pegarCaminhoImagem} />
            <div className={styles.container__input}>
                <label htmlFor='imagem' className={styles.input}>Escolher imagem</label>
                <p>{imagem}</p>
            </div>
        </div>
    );
}