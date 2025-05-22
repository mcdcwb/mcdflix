import { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams ();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "c5ae16ae7780f1ddb63816c54454ea1b",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE DESMONTADO");
        }
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@mcdflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id)

        if(hasFilme) {
            toast.warn(
                <div>
                    <strong style={{ fontSize: '16px', color: '#C17817' }}>{filme.title}</strong><br />
                    <span>já está nos seus favoritos!</span>
                </div>
            );
            
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@mcdflix", JSON.stringify(filmesSalvos));
        toast.success(
            <div>
                <span>Adicionado aos favoritos:</span><br />
                <strong style={{ fontSize: '16px', color: '#329F5B' }}>{filme.title}</strong>
            </div>
        );
    
    }

    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes</h1>
            </div>
        )
    }

    return(
    <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

        <h3>Sinopse:</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: <span className="vote-rate">{filme.vote_average}/10</span></strong>

        <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <a 
                className="trailer-button"
                target="blank" 
                rel="external" 
                href={`https://youtube.com/results?search_query=Filme ${filme.title} Trailer`}
            >
                Trailer
            </a>
        </div>
    </div>
)

}

export default Filme;