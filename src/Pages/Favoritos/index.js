import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(()=> {
        const minhaLista = localStorage.getItem("@mcdflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id) {

        let filtroFilmes = filmes.filter( (item) => {
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@mcdflix", JSON.stringify(filtroFilmes))
        
        
        toast.error("Item removido da lista.");

    }

    return(
        <div className="meus-filmes">
            <h1>Meus Favoritos</h1>

            {filmes.length === 0 && <span className="span-empty">Você não possui nenhum filme salvo no momento. <img width="100" height="100" src="https://img.icons8.com/quill/100/f26c4f/sad.png" alt="sad"/></span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span className="span-title">{item.title}</span>
                            <div>
                                <Link className="item-li" to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;