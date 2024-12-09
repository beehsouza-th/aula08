import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import  {Button} from "@mui/material";
import AdfScannerIcon from '@mui/icons-material/AdfScanner';

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
  const deletar = async (id) => {
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
    <div>
      <Button variant = "contained" onClick={() => exportarPDF()}><AdfScannerIcon/> Gerar PDF</Button>
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td> <button onClick={() => deletar(usuario.id)} > deletar </button></td>
        </tr>
        
      )}
    </table>
    </div>
  );
}
