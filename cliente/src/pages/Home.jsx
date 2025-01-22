import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styles from '../styles/home.module.css';
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import ListaProdutos from "../components/ListaProdutos";


export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [buscarproduto, setBuscarproduto] = useState("");

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/discos/");
        const dados = await resposta.json();
        setProdutos(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    };
    buscarProduto();
  }, []);

  //Ordem de A a Z, crescente. Usando o title para ordenar os titulos por ordem crescente, porém posso utitlizar outras propriedades como id, descripition...

  const orderedAz = () =>{
     const ordered =[...produtos].sort((a, b) => a.title.localeCompare(b.title));//sort(HoFs) ordena. Utilizamos title que é uma prorpiedade da lista.
  setProdutos(ordered); //localeCompare é uma função que acessa a minha lista e faz o "cálculo" compra com o parâmetro b. Comparando a propriedade title e ordenando.
  }
  //ordem de Z a A, descrescente.
  const orderZa = () =>{
    const ordered = [...produtos].sort((a, b) => b.title.localeCompare(a.title));
    setProdutos(ordered);
  }
 
  //Preço ordem descrecente
  const ordemPrecoDesc= () => {
    const ordered = [...produtos].sort((a, b) => b.price - a.price); // Ordena do maior para o menor preço. b = maior a = menor
    setProdutos(ordered);
  }

  //Preço ordem crescente
  const ordemPrecoCres =() =>{
    const ordered = [...produtos].sort((a, b) => a.price - b.price);// do maior para o menor
    setProdutos(ordered);
  }
  
  // retorna a lista de produtos firltradas com base no titulo
  const filtrarProdutos = () => {
    return produtos.filter(produto => // filter array que retorna um novo arry que desejamos //parametro //includes verifica se um elemtro do titulo tem coerência e retorna true ou false
      produto.titulo.toLowerCase().includes(buscarproduto.toLowerCase()) // filtro que permite letrar maiúsculas e minúsculas
    );
  };
  
  

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
      produto.image
    ]);

    doc.text("Lista de Produtos",10,10);
    doc.autoTable({
      head: [["Título", "Artista", "Edição", "Ano", "Preço", "Formato", "Disponibilidade", "Imagem "]],
      body: tabela,
      tableWidth: 'wrap',
    });

    doc.save("ProdutosVinil.pdf");
  };



return(
 <form>

  <Header/>
  <div className={styles.filter}>

  <ButtonGroup className={styles.Button}color="secondary" aria-label="Medium-sized button group">
  <Button onClick={orderedAz}>Ordem de Za</Button>
      <Button Click={ordemPrecoDesc}>Ordem preço do maior para o menor</Button>
      <Button onClick={ordemPrecoCres}>Ordem preço do menor para o maior</Button>
      <Button  onClick={() => exportarPDF()}><PictureAsPdfIcon /> Gerar PDF</Button>
      </ButtonGroup>
    </div>

   <div>
      <input className={styles.pesquisar} placeholder="Pesquisar por produto"onChange={(event) => setBuscarproduto(event.target.value)}  // Atualiza o estado da pesquisa. //filtrarProdutos()  e renderizar essa função
      
       />

   <Button className={styles.colorbutton} variant="outlined" color="secondary">Pesquisar</Button>


  </div>
      <div className={styles.bloco}>
         <div className= {styles.blocao}>
         
           <ul className={styles.produtos}>
             {produtos.map((produto) => (
               <li key={produto.id}>
                 <img src={produto.image} alt={produto.titulo} className={styles.prudutosimg} width={100}/>
                   <h3>{produto.titulo}</h3>
                   <p>Artista: {produto.artista}</p>
                   <p>Edição: {produto.edicao}</p>
                   <p>Ano: {produto.ano}</p>
                   <p>Preço: R${produto.preco}</p>
                   <p>Disponibilidade: {produto.disponibilidade}</p>
                   <Button onClick ={()=> deletar(produto.id)} className={styles.deletar} variant="outlined" color="error">Delete</Button>
                   <Link to={'/alterar/' + produto.id}>
                   <Button className={styles.button_alter} variant="outlined" color="secondary">Alterar</Button>
                   </Link>
                 </li>
             ))}
           </ul>
         </div>
     </div>
 </form>
);
}