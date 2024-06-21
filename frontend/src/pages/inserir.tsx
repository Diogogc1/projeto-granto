import { ChangeEvent, useState } from "react";
import contratoDAO from "../DAOs/contratoDAO";
import CustomSwitch from "../components/switch";
import Card from "../components/card";
import IconRaio from "../images/Lightning.svg"
import IconGrafico from "../images/ChartLineUp.svg"
import IconRelogio from "../images/Clock.svg"
import IconArquivoEnviado from "../images/FileArrowUp.svg"
import { useNavigate } from "react-router-dom";

export default function Inserir() {
    const [fileName, setFileName] = useState("");
    const [analysisMode, setAnalysisMode] = useState("default");

    const navigate = useNavigate();

    async function submitArquivo(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0]
        const formData = new FormData()

        formData.append("file", file);
        formData.append("mode", analysisMode);

        setFileName(file.name)

        //FETCH API
        try {
            const response = await fetch('http://localhost:5000/post/upload-file', {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            console.log(result)

            try {
                await contratoDAO.adicionarDado({ contrato: result });
                console.log("DEU CERTO AAAAAAA!!!!")
                navigate('/resultado', { state: { result } });
            } catch (e: any) {
                console.log(e.message)
            }


        } catch (e: any) {
            console.log(e.message)
        }
    }

    function switchAnalysisMode() {
        setAnalysisMode(prev => prev == "default" ? "exact" : "default")
    }

    return (
        <>
            <div className="absolute right-4 my-4 w-max flex flex-col items-center justify-center" title="Quando o modo exato está ativado, a IA validará todas as informações. Exemplo: Apenas retornará CNPJs válidos. Quando desligado, a IA usará apenas o contexto do texto para retornar as informações. O melhor modo para se usar depende do quão bem os seus estão formatados.">
                <CustomSwitch mode={analysisMode} onClick={switchAnalysisMode} />
                <p className="text-center my-2">Modo exato</p>
            </div>

            <h2 className="font-bold text-3xl mt-4">Análise de contratos</h2>
            <p className="mt-2 text-xl">Visualize informações sobre seu contrato, de forma rápida e fácil</p>
            <div className="lg:flex flex-row mt-10 gap-10 justify-center">
                <Card titulo="Automação" texto="Obtenha dados contratuais utilizando Inteligência Artificial, reduzindo o tempo necessário para a análise inicial dos documentos." iconeURL={IconRaio} altIcone="Icone de um relógio"></Card>
                <Card titulo="Eficiência operacional" texto="Aumente a eficiência da sua empresa na análise de contratos, minimizando erros humanos e otimizando o processo de revisão." iconeURL={IconGrafico} altIcone="Icone de um gráfico de linha subindo"></Card>
                <Card titulo="Histórico Completo" texto="Acesse facilmente um histórico detalhado de contratos e suas análises para melhor acompanhamento e referência." iconeURL={IconRelogio} altIcone="Icone de um raio"></Card>
            </div>
            <div className="absolute bottom-4 mb-4 flex flex-col items-center">
                <button className="bg-[#4514a3] flex items-center justify-center gap-4 font-bold py-4 px-20 text-white text-xl rounded-md shadow-md hover:bg-[#3b0f8c] transition-colors duration-300 cursor-pointer" onClick={() => document.getElementById('file-upload')!.click()}>
                    <img src={IconArquivoEnviado} alt="Icone de um arquivo sendo enviado" width={50} />
                    <p className="text-2xl text-medium text-white">Enviar Arquivo</p>
                    <input id="file-upload" type="file" accept=".pdf" onChange={submitArquivo} className="hidden" />
                </button>

                
                {!fileName 
                    ? <p className="mt-4">Só aceitamos PDF, por enquanto.</p>
                    : <p className="mt-4">Arquivo enviado: {fileName}</p>
                }
            </div>
        </>
    )
}
