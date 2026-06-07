
import Button from '@/components/Button'
import caveirao from '../../assets/caveiraomtfoda.jpg'
import { useState } from 'react' 

function Home() {
  const [prompt, setPrompt] = useState("")
  const [resposta, setResposta] = useState("")
  const [loading, setLoading] = useState(false)

  const enviarParaIA = async () => {
    if (!prompt) return;
    setLoading(true);
    setResposta("");
    
    try {
      const res = await fetch("http://127.0.0.1:8080/ia/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt })
      });
      
      const data = await res.json();
      setResposta(data.answer || "Sem resposta da IA.");
    } catch (error) {
      console.error(error);
      setResposta("Erro ao conectar com o back-end. Ele está rodando?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>    
    <section className="flex flex-row max-w-screen-2xl mx-auto justify-center items-center">
      <div className="flex flex-row justify-center items-center max-w-screen-2xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">ViboraInk</h1>
          <p className="text-lg">Cada pele conta uma história. Qual é a sua?</p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={caveirao} alt="caveirao" />
         </div>
         <div className="rounded-lg overflow-hidden">
          <img src={caveirao} alt="caveirao" />
         </div>
         <div className="rounded-lg overflow-hidden">
          <img src={caveirao} alt="caveirao" />
         </div>
      </div>
    </section>
    <section className="flex flex-col max-w-screen-2xl mx-auto items-center py-10">
      <div className="flex flex-col w-full max-w-xl gap-4 px-4">
        <textarea 
          className="p-3 border border-gray-400 rounded text-black shadow-sm"
          rows="4" 
          placeholder="Descreva a sua ideia de tatuagem (ex: Leão realista no antebraço)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />  
        <button 
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold transition-colors disabled:opacity-50"
          onClick={enviarParaIA}
          disabled={loading}
        >
          {loading ? "Calculando orçamento..." : "ENVIAR PARA A IA"}
        </button> 
        {resposta && (
          <div className="p-4 bg-neutral-800 text-white rounded mt-4 shadow-lg border border-neutral-700">
            <h3 className="text-red-400 font-bold mb-2">Resposta da IA:</h3>
            <p className="whitespace-pre-wrap">{resposta}</p>
          </div>
        )}
      </div>
    </section>
    </>
  )
}

export default Home



