import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [edicao, setEdicao] = useState("");
  const [ano, setAno] = useState("");
  const [preco, setPreco] = useState("");
  const [formato, setFormato] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");

  const navigation = useNavigate();

  const registrar = async (event) => {
    event.preventDefault();

    
    if (!titulo || !artista || !edicao || !ano || !preco || !formato || !disponibilidade) {
      return alert("Por favor, preencha todos os campos.");
    }

    const produto = {
      produto: titulo,
      produtos: artista,
      produtos: edicao,
      produtos: ano,
      produtos: preco,
      produtos: formato,
      produtos: disponibilidade,
    };

    console.log("Dados do Produto:", produto);

    try {
      const res = await fetch("http://localhost:3000/discos/", {
        method: "POST", // Enviando
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(produto),
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log("Produto registrado com sucesso:", responseData);
        navigation("/");  
        const errorData = await res.json();
        alert(`Erro ao registrar: ${errorData.erro || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro na aplicação");
    }
  };

  return (
    <main>
      <h2>Registrar Produto</h2>
      <form onSubmit={registrar}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            required
          />

          <label>Artista</label>
          <input
            type="text"
            value={artista}
            onChange={(event) => setArtista(event.target.value)}
            required
          />

          <label>Edição</label>
          <input
            type="text"
            value={edicao}
            onChange={(event) => setEdicao(event.target.value)}
            required
          />

          <label>Ano</label>
          <input
            type="number"
            value={ano}
            onChange={(event) => setAno(event.target.value)}
            required
          />

          <label>Preço</label>
          <input
            type="number" 
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            required
          />

          <label>Formato</label>
          <input
            type="text"
            value={formato}
            onChange={(event) => setFormato(event.target.value)}
            required
          />

          <label>Disponibilidade</label>
          <input
            type="text"
            value={disponibilidade}
            onChange={(event) => setDisponibilidade(event.target.value)}
            required
          />
        </div>

        <button type="submit">Registrar Produto</button>
      </form>
    </main>
  );
}
