import { useState, useEffect, useRef } from "react"; // Hooks do React
import { db, collection, addDoc, onSnapshot, query, orderBy } from "../../services/fireabse.js"; // Funções do firebase
import "./stylesOnline.css"; // Estilização do Chat

export default function ChatOnline({usuario, deslogar}) {

    const [mensagens, setMensagens] = useState([]); // Lista de Mensagens
    const [novaMensagem, setNovaMensagem] = useState(""); // Novas Mensagens
    const [mensagensAntigas, setMensagensAntigas] = useState(true); // Ocultação e Exibição de mensagens antigas

    const mensagemRef = useRef(null); // Scroll automático do chat

    // Função que é responsável para enviar a mensagem ao firebase e envia a mensagem do usuario atual para a colecao de mensagens no FireBase
    const enviandoMensagem = async () => {
        if(novaMensagem.trim()) { // verificação de mensagem vazia
            await addDoc(collection(db, "mensagens"), { // Adiciona a mensagem ao banco de dados
                // Nome do usuario, a mensagem e o timestamp da mensagem.
                usuario: usuario,
                mensagens: novaMensagem,
                createdAt: new Date()
            });
            // Limpa o campo de texto da mensagem após o envio.
            setNovaMensagem("");
        }
    }

    // Efeito que observa as mudanças da mensagem, a lista é atualizada e o estado da mensagem Antiga é verificado e é feito a filtragem das mensagens antigas
    useEffect(() => {
        const entrada = new Date(); // Data da entrada para filtrar as mensagens.

        // Consulta para obter as mensagens da colleção que é ordenada por data.
        const q = query(collection(db, "mensagens"), orderBy("createdAt"));
        const cancelarInscricao = onSnapshot(q, (snapshot) => {
            const todas = snapshot.docs.map(doc => doc.data()); // Feita a recuperação das mensagens.
            const filtradas = mensagensAntigas // filta as mensagens baseado no estado das Mensagens Antigas
                ? todas // Se as mensagens antigas for verdadeiro, exibe as mensagens antigas
                : todas.filter(msg => msg.createdAt?.toDate?.() > entrada); // Feito a filtragem após a entrada.
            setMensagens(filtradas); //atualiza o estado com as mensagens filtradas
        });
        return () => cancelarInscricao(); // Limpa a inscrição ao desmontar o componente
    }, [mensagensAntigas]); //A dependencia de Mensagens Antigas define se as mensagens são mostradas ou não
    
    // Efeito para fazer o Scroll ao final do contêiner
    useEffect(() => {
        if(mensagemRef.current) {
            mensagemRef.current.scrollTop = mensagemRef.current.scrollHeight; // Feito a rolagem para o fim do do contêiner
        }
    }, [mensagens]);

    // Função para alternar o estado das Mensagens antigas, caso seja verdadeira, exibe um botão para mostrar as mensagens antigas, se for falso, vai oculta-las.
    const alterarMensagens = () => {
        setMensagensAntigas(prev => !prev);
    }

    return (
        <div className="chatonline__principal">
            <div className="chatonline__cabecalho">
                <h1>Chat Online</h1>
                <button onClick={alterarMensagens}>
                    {mensagensAntigas ? "Ocultar mensagens anteriores" : "Exibir mensagens anteriores"}
                </button>
                <button onClick={deslogar}>
                    Sair
                </button>
            </div>

            <hr className="separacao__cabecalho" />

            <div>

            </div>

            <div className="chatonline__mensagens" ref={mensagemRef}>
                {mensagens.map((msg, index) => (
                    <div key={index} className="">
                        <span>{msg.usuario}:</span> {msg.mensagens}
                    </div>
                ))}
            </div>

            <div className="chatonline__input">
                <input
                    className=""
                    type="text"
                    placeholder="Digite sua mensagem"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && enviandoMensagem()}
                />
                <button className="btn__enviar" onClick={enviandoMensagem}>Enviar</button>
            </div>
        </div>
    )
}