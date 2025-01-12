import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import styles from '../styles/home.module.css';
import Header from "../components/Header";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/discos");
        const dados = await resposta.json();
        setProdutos(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    };
    buscarProduto();
  }, []);

  const deletar = async (id) => {
    try {
      await fetch(`http://localhost:3000/discos/${id}`, {
        method: 'DELETE',
      });

      setProdutos(produtos.filter(produto => produto.id !== id)); //filtrando p/ que possa ser excluido conforme o id
    } catch {
      alert("Ish lascou!!");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();

    const tabela = produtos.map(produto => [
      produto.titulo,
      produto.artista,
      produto.edicao,
      produto.ano,
      produto.preco,
      produto.formato,
      produto.disponibilidade,
    ]);

    doc.text("Lista de Produtos", 10, 10);
    doc.autoTable({
      head: [["Título", "Artista", "Edição", "Ano", "Formato", "Disponibilidade"]],
      body: tabela,
    });

    doc.save("ProdutosVinil.pdf");
  };



return(
  <>

<Header/>
  <div>
 
    <Button variant="outlined" onClick={() => exportarPDF()}><PictureAsPdfIcon /> Gerar PDF
    </Button>
  </div>

  <div className={styles.container}>
    
      <div className={styles.card}>
        {produtos.map((produto) => (
          <div key={produto.id}>
            <img src={produto.image} alt={produto.title} className={styles.prudutosimg} width={100}/>
              <h3>{produto.titulo}</h3>
              <p>Artista: {produto.artista}</p>
              <p>Edição: {produto.edicao}</p>
              <p>Ano: {produto.ano}</p>
              <p>Preço: R${produto.preco}</p>
              <p>Disponibilidade: {produto.disponibilidade}</p>
              <button onClick={() => deletar(produto.id)} className={styles.deletar}><DeleteForeverIcon />
                Remover
              </button>
            </div>
        ))}
      </div>
    </div>
  
</>
);
}