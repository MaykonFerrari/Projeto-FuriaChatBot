import "./styles.css"; // Estilização do Chat Bot
import { useState, useRef, useEffect } from "react"; // Hooks do React

export default function ChatBox() {

    const [chatAberto, setChatAberto] = useState(false); // Vai fazer o Controle se o Chat bot está aberto ou fechado.
    const [chat, setChat] = useState([]); // Vai armazenar as mensagens
    const chatFimRef = useRef(null); //Scroll Automático para baixo

    // Efeito para fazer a rolagem automaticamente para o fim do contêiner
    useEffect(() => {
        if(chatFimRef.current) {
            chatFimRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [chat]);

    // Perguntas e respostas do chatbot.
    const perguntasRapida = [
        {
            pergunta: "Qual a atual line da furia?",
            resposta: (
                <>
                    yuurih<br />
                    YEKINDAR<br />
                    KSCERATO<br />
                    molodoy<br />
                    FalleN - IGL<br />
                    siddecs - COACH<br />
                </>
            )
        },
        {
            pergunta: "Quais os proximos compromissos da FuriaCS?",
            resposta: (
                <>
                    <img className="icone__evento__campeonato" src="PGL.png" />
                    - PGL Astana 2025 10/05 - 18/05<br />
                    <img className="icone__evento__campeonato" src="IEMDallas.png" />
                    - IEM Dallas 2025 19/05 - 25/05<br />
                    <img className="icone__evento__campeonato" src="AustinMAJOR.png" />
                    - BLAST.tv Austin Major 2025 Stage 2 07/06 - 10/06<br />
                </>
            )
        },
        {
            pergunta: "Quais as rede sociais da furia?",
            resposta: (
              <div>
                <a className="referencia__links" href="https://x.com/FURIA" target="_blank" rel="noopener noreferrer">
                  <img src="twitter.png" alt="X/Twitter" className="icone__evento" />
                  X/Twitter
                </a>
                <br />
                <a className="referencia__links" href="https://www.instagram.com/furiagg" target="_blank" rel="noopener noreferrer">
                  <img src="instagram.png" alt="Instagram" className="icone__evento" />
                  Instagram
                </a>
              </div>
            )
          },
          {
            pergunta: "Desejo entrar em contato com a Furia.",
            resposta: (
                <div>
                    Entre em contato com a nossa equipe clicando {''}
                    <a className="referencia__links" href="https://wa.me/5511993404466" target="_blank" rel="noopener noreferrer">
                    <img src="whatsapp.png" className="icone__evento"/>
                        CLICANDO AQUI
                    </a>
                </div>
            )
          }
    ];

    // Função para lidar com as perguntas e adicionar ao chat
    const lidandoComPerguntasRapidas = (resposta, pergunta) => {
        const userMsg = {
            text: pergunta, // A mensagem do usuario
            sender: "user" // indicação de quem está enviando a mensagem é o USUÁRIO.
        };

        const botMsg = {
            text: resposta || "Não entendi a pergunta.", //Resposta do bot caso haja algum problema com as perguntas/repostas.
            sender: "bot" // indicação de quem está enviando a mensagem é o BOT.
        };

        setChat(prev => [...prev, userMsg, botMsg,]); // Adiciona as mensagens ao estado do chat.


    };

    return(
        <>
        {!chatAberto && (
            <div className="chat__iniciador">
                <div className="chat__nuuvem">Está com alguma dúvida sobre a Furia?</div>
                <img src="/LogoChat.png" alt="Furia chat" className="chat__avatar" onClick={() => setChatAberto(true)} />
            </div>
        )}

        {chatAberto && (
            <div className="chat__box">
                <div className="chat__cabecalho">
                    Bot Furia
                    <button className="chat__fechar" onClick={() => setChatAberto(false)}>✖</button>
                </div>
                
                <div className="chat__corpo">
                    {chat.map((msg, i) => (
                        <div key={i} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}

                    <div className="perguntas__rapidas">
                        {perguntasRapida.map((q, i) => (
                            <div
                                key={i}
                                className="mensagem bot rapida"
                            >
                                <div ref={chatFimRef} />
                                <div className="avatar">
                                    <h1 className="torcedor">Torcedor Furioso</h1>
                                </div>
                                <div className="text" onClick={() => lidandoComPerguntasRapidas(q.resposta, q.pergunta)}>{q.pergunta}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )}
        </>
    )
}