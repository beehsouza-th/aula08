import styles from './listaProdutos.module.css';

export default function ListaProdutos({ produtos }) {

    return (
      <>
        <ul className={styles.bloco}>
          {produtos.map(produto => (
            <li key={produto.id}>
              <h2>{produto.title}</h2>
              <p>Artista/Banda:{produto.artista}</p>
              <p>Edição{produto.edicao}</p>
              <p>Ano de Lançamento:{produto.ano}</p>
              <p>Preço: {produto.price}</p>
              <p>disponibilidade {produto.disponibilidade}</p>
              <img src={produto.image} alt={produto.title} width={100} />
            </li>
            
          ))}
        </ul>
      </>
    );
  }