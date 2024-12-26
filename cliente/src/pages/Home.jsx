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

      setProdutos(produtos.filter(produto => produto.id !== id));
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

  return (
    <>
      <Header />
      <div className={styles.menu}>
        <Button variant="outlined" onClick={() => exportarPDF()}><PictureAsPdfIcon /> Gerar PDF
        </Button>
      </div>

      <div className={styles.bloco}>
        <div className={styles.blocao}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Artista/Banda</th>
                <th>Edição</th>
                <th>Ano</th>
                <th>Preço</th>
                <th>Disponibilidade</th>
                <th>Imagem</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.titulo}</td>
                  <td>{produto.artista}</td>
                  <td>{produto.edicao}</td>
                  <td>{produto.ano}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.disponibilidade}</td>
                  <td><img src={produto.image} alt={produto.titulo} width={100} /></td>
                  <td>
                    <button onClick={() => deletar(produto.id)} className={styles.deletar}><DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
