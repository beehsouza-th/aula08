import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/registro.module.css';

export default function Registrar() {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [edicao, setEdicao] = useState("");
  const [ano, setAno] = useState("");
  const [preco, setPreco] = useState("");
  const [formato, setFormato] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const[imagem, setImagem] = useState("");


  const navigation = useNavigate();


  const registrar = async (event) => {
    event.preventDefault();
    try {
      
      const res = await fetch("http://localhost:3000/discos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          titulo: titulo,
          artista: artista,
          edicao: edicao,
          ano: ano,
          preco:preco,
          formato:formato,
          disponibilidade : disponibilidade,
          imagem : imagem
        }),
      });


      if (res.ok) {
        navigation("/");  
      } else {
        alert("Erro ao registrar produto.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro na aplicação.");
    }
  };

  return (
   < main>

      <h2 className= {styles.headerregistro}>Registrar Produto</h2>

      <div className={styles.form}> 
     
      <form onSubmit={registrar}>
      

        <div className={styles.container}>
        
          <label className={styles.dadosprodutos}>Título</label>
          <input type="text" value={titulo}  placeholder= "Digite o nome do produto" onChange={(event) => setTitulo(event.target.value)} required
          />

          <label className={styles.dadosprodutos}>Artista</label>
          <input type="text" value={artista} placeholder=" Digite o nome do artista" onChange={(event) => setArtista(event.target.value)} required
          />

          <label className={styles.dadosprodutos}>Edição</label>
          <input type="text" value={edicao} placeholder="Digite a edição" onChange={(event) => setEdicao(event.target.value)} required
          />

          <label className={styles.dadosprodutos}>Ano</label>
          <input type="text" value={ano} placeholder="Digite o ano" onChange={(event) => setAno(event.target.value)} required
          />

          <label className={styles.dadosprodutos}>Preço</label>
          <input type="text" value={preco} placeholder="Digite o preço" onChange={(event) => setPreco(event.target.value)} required
          />

          <label className={styles.dadosprodutos} >Formato</label>
          <input type="text" value={formato} placeholder="Digite o formato" onChange={(event) => setFormato(event.target.value)} required
          />

          <label className={styles.dadosprodutos}>Disponibilidade</label>
          <input type="text" value={disponibilidade} placeholder="Diponibilidade" onChange={(event) => setDisponibilidade(event.target.value)} required
          />
        

        <label className={styles.dadosprodutos}>Imagem</label>
          <input type="imagem" value={imagem} placeholder ="imagem" onChange={(event) => setImagem(event.target.value)} required
          />

         <button className={styles.botao}>Registrar</button>

        </div>
      
      </form>
      </div>
    </main>       
            

    
  );
}
