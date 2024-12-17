import { useState } from "react";

export default function ListaProdutos({ produtos }) {

    const [listaPedidos, setlistaPedidos] = useState ([]); 
    const adicionarItemPedidos = (produtos) =>{
       setlistaPedidos([...listaPedidos,produtos]);
       }

    return (
      <>
        <ul className={styles.bloco}>
          {produtos.map(produto => (
            <li key={produto.id}>
              <h2>{produto.title}</h2>
              <p>Edição{produto.edicao}</p>
              <p>{produto.gravadora}</p>
              <p>Artista/Banda:{produto.artista}</p>
              <p>Preço: {produto.price}</p>
              <p>Ano de Lançamento: {produto.ano}</p>
              <img src={produto.image} alt={produto.title} width={100} />
             <button onClick={()=>adicionarItemPedidos(produtos)}>Comprar</button>
            </li>
          ))}
        </ul>
      </>
    );
  }