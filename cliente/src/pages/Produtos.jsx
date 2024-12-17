import { useState } from "react";
import ListaProdutos from "../components/ListaProdutos";

export default function produtos(){
    const [ ListaProdutos, setprodutos] = useState([
        {
            id: 1,
            titulo: 'The Dark Side of the Moon',
            artista: 'Pink Floyd',
            genero: 'Rock Progressivo',
            ano: 1973,
            preco: 250.00,
            formato: 'LP',
            disponibilidade: 'Em Estoque',
            image:'', 
          },
          {
            id: 2,
            titulo: 'Abbey Road',
            artista: 'The Beatles',
            genero: 'Rock',
            ano: 1969,
            preco: 300.00,
            formato: 'LP',
            disponibilidade: 'Em Estoque',
            image:'',
          },
          {
            id: 3,
            titulo: 'Kind of Blue',
            artista: 'Miles Davis',
            genero: 'Jazz',
            ano: 1959,
            preco: 180.00,
            formato: 'LP',
            disponibilidade: 'Esgotado',
            image:'' ,
          },
        
    ]);
    return(
        <>

        <ListaProdutos produtos={produtos}/>

        </>
    );
}