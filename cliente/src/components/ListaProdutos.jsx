import React from 'react';
import styles from '../styles/home.module.css';
export default function ListaProdutos({ produtos }) {

    return (
      
      <>
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
                <button onClick={() => deletar(produto.id)} className={styles.deletar}><DeleteForeverIcon />
                </button>
              </li>
          ))}
        </ul>
      </div>
      </div>
    
  </>
    )
  }
    