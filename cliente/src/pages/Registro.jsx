import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigate ();

  const registrar = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST', // Enviando
        headers: {'Content-Type': 'application/json', // Corrigido o tipo de conteúdo
        },
        body: JSON.stringify({
          nome: nome, 
          email: email, 
        }),
      });

      if (res.ok){
        navigation("/");
      }
      

    } catch (error) {
      alert("Ocorreu um erro na aplicação");
    }
  };
//onchenge dispara um ação
  return (
    <main>
      <form onSubmit={registrar}>
        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}/>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}/>

        <button >Registrar</button>
      </form>
    </main>
  );
}

