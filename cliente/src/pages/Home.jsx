import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import styles from '../styles/home.module.css';
import Header from "../components/Header";


export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario =  async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios]);

 // id como parâmetr
  const deletar = async (id,) => {
    try{
       await fetch ('http://localhost:3000/usuarios/' + id , {
        method: 'DELETE',
       });

    }catch{
      alert("Ish lascou!!");
    }
  }
  const exportarPDF = () =>{
     const doc = new jsPDF ();

     const tabela = usuarios.map( usuario =>[
      usuario.nome,
      usuario.email
     ]);

     doc.text("Lista de Usuário", 10, 10);
     doc.autoTable({
      head:[["Nome", "E-mail"]],
      body: tabela
     });

     doc.save("alunosIFMS");
  }

  return (
    <>
    <Header/>

   <div className={styles.menu}>
     <Button variant="outlined" onClick={() => exportarPDF()}><PictureAsPdfIcon/>Gerar PDF</Button>

    </div>
      

    <div className={styles.bloco}>
      <div className={styles.blocao}>
      

    <table className= {styles.table}>
      <tr>
        <th>Nome</th>
        <th>E-mail</th> 
        <th>Ações</th>
      </tr>

      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td> <button onClick={() => deletar(usuario.id)} className= {styles.deletar}><DeleteForeverIcon/></button>
          </td>
        </tr>
        
      )}
    </table>
    </div>
    </div>
    </>
  );
}
