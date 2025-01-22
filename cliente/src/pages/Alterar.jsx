import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../styles/alterar.module.css';

export default function Alterar() {

    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [artista, setArtista] = useState("");
    const [edicao, setEdicao] = useState("");
    const [ano, setAno] = useState("");
    const [preco, setPreco] = useState("");
    const [formato, setFormato] = useState("");
    const [disponibilidade, setDisponibilidade] = useState("");
    const[image, setImage] = useState("");
    const navigation = useNavigate();

    useEffect(() => {
        const buscarproduto = async()=>{
            const resposta = await fetch('http://localhost:3000/discos/'+ id );
            const dados = await resposta.json();
            setTitulo(dados.titulo);
            setArtista(dados.artista);
            setEdicao(dados.edicao);
            setAno(dados.ano);
            setPreco(dados.preco);
            setFormato(dados.formato);
            setDisponibilidade(dados.disponibilidade);
            setImage(dados.image);
        }
        buscarproduto();
    } ,[]);

    const alterar = async( event) => {
        event.preventDefault();
        try{
            await fetch(`http://localhost:3000/discos/${id}`, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        titulo:titulo,
                        artista:artista,
                        edicao:edicao,
                        ano:ano,
                        preco:preco,
                        formato:formato,
                        disponibilidade:disponibilidade,
                        image: image
                    })
                }
            );
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
return (
    <main>
             
    <h2 className= {styles.headeralterar}>Alterar Produto</h2>
    <h1>{id}</h1>
     <div className={styles.form}> 
        
        <form onSubmit={alterar}>
            <div className={styles.container}>
            <label className={styles.dadosprodutos}>Título</label>
            <input type="text" value={titulo}  placeholder= "Digite o nome do produto"  onChange={(evento)=> setTitulo(evento.target.value)}/>

            <label className={styles.dadosprodutos}>Artista</label>
            <input type="text" value={artista} placeholder= "Digite o nome do artista"onChange={(evento)=> setArtista(evento.target.value)}/>

            <label className={styles.dadosprodutos}>Edição</label>
            <input type="text" value={edicao} placeholder= "Digite o nome da edição" onChange={(evento)=> setEdicao(evento.target.value)}/>

             <label className={styles.dadosprodutos}>Ano</label>
            <input type="text" value={ano} placeholder= "Digite o ano" onChange={(evento)=> setAno(evento.target.value)}/>

            <label className={styles.dadosprodutos}>Preço</label>
            <input type="number" value={preco} placeholder= "Digite o preço"onChange={(evento)=> setPreco(evento.target.value)}/>

             <label className={styles.dadosprodutos} >Formato</label>
            <input type="text" value={formato} placeholder= "Digite o formato"onChange={(evento)=> setFormato(evento.target.value)}/>

            <label className={styles.dadosprodutos}>Disponibilidade</label>
            <input type="text" value={disponibilidade} placeholder= "Digite a disponibilidade" onChange={(evento)=> setDisponibilidade(evento.target.value)}/>

            <label className={styles.dadosprodutos}>Imagem</label>
            <input type="url" value={image}placeholder= "Link da imagem" onChange={(evento)=> setImage(evento.target.value)}/> 

            <button className={styles.botao}>Alterar</button>
            </div>
           
        </form>
        </div>
    </main>
        
       
    
);
}