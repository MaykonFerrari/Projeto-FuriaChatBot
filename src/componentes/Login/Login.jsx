import { useState } from "react"; // Hooks do React
import "./styles.css" //Estilização do sistema de Login

export default function Login ({ onLogin }) {
    const [usuario, setUsuario] = useState(""); //Armazenamento do nome do Usuário

    //Função para enviar o formulario
    const handleSubmit = (e) => {
        e.preventDefault(); //Prevenção de recarregamento da página
        if(usuario.trim()) {
            onLogin(usuario.trim()); // Chama a função do Login com o nome do usuario, removendo espaços em brancos.
        }
    }

    return (
        <div className="chatonline__principal">
            <form onSubmit={handleSubmit} className="formulario__login">
                <h1 className="entrar__chat" >Entrar no Chat Online</h1>
                <input
                    type="text"
                    placeholder="Digite seu nick para usar no chat"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="usuario"
                />
                <button
                    type="submit"
                    className="entrar__dentro"
                >Entrar no chat</button>
            </form>
        </div>
    )
}