import { ChangeEvent, useState } from "react";
import contratoDAO from "../DAOs/contratoDAO";
import CustomSwitch from "../components/switch";
import Card from "../components/card";
import IconRaio from "../images/Lightning.svg"
import IconGrafico from "../images/ChartLineUp.svg"
import IconRelogio from "../images/Clock.svg"
import IconArquivoEnviado from "../images/FileArrowUp.svg"

export default function Inserir() {
    const [fileName, setFileName] = useState("");
    const [analysisMode, setAnalysisMode] = useState("default");

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
                await contratoDAO.adicionarDado({ nome: "João", idade: 25 });
                console.log("DEU CERTO AAAAAAA!!!!")
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
            <div className="lg:flex mt-10 gap-10">
                <Card titulo="Utilize IA" texto="Analise e obtenha os dados do contrato automaticamente" iconeURL={IconRaio} altIcone="Icone de um relógio"></Card>

                <Card titulo="Seja mais eficiente" texto="Melhore a eficiência de sua empresa na análise de contratos" iconeURL={IconGrafico} altIcone="Icone de um gráfico de linha subindo"></Card>
                
                <Card titulo="Tenha histórico" texto="Tenha facilmente um histórico dos contratos e de suas análises" iconeURL={IconRelogio} altIcone="Icone de um raio"></Card>
            </div>
            <div className="absolute bottom-0 mb-4 flex flex-col items-center">
                <button className="bg-[#4514a3] flex items-center justify-center gap-4 font-bold py-4 px-20 mt-10 text-white text-xl rounded-md shadow-md hover:bg-[#3b0f8c] transition-colors duration-300 cursor-pointer" onClick={() => document.getElementById('file-upload')!.click()}>
                    <img src={IconArquivoEnviado} alt="Icone de um arquivo sendo enviado" width={50}/>
                    <p className="text-2xl text-medium text-white">Enviar Arquivo</p>
                    <input id="file-upload" type="file" accept=".pdf" onChange={submitArquivo} className="hidden" />
                </button>
                
                <p className="mt-4">Só aceitamos PDF, por enquanto.</p>
                {fileName && <p className="mt-4">Arquivo enviado: {fileName}</p>}
            </div>
        </>
    )
}
