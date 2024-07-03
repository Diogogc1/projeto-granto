import { ChangeEvent, useState } from "react";
import contratoDAO from "../DAOs/contratoDAO";
import CustomSwitch from "../components/switch";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import { ChartLineUp, ClockCounterClockwise, FileArrowUp, Lightning } from "@phosphor-icons/react";

export default function Inserir() {
    const [fileName, setFileName] = useState("");
    const [analysisMode, setAnalysisMode] = useState("default");

    const navigate = useNavigate();

    async function submitArquivo(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0];
        const formData = new FormData();

        formData.append("file", file);
        formData.append("mode", analysisMode);

        setFileName(file.name);

        try {
            const response = await fetch('http://localhost:5000/post/upload-file', {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            console.log(result);

            try {
                // Ler o arquivo como ArrayBuffer
                const fileReader = new FileReader();
                fileReader.readAsArrayBuffer(file);

                fileReader.onload = async (event) => {
                    const arrayBuffer = event.target!.result;

                    // Adicionar o arquivo ao objeto a ser armazenado
                    const dadoParaArmazenar = {
                        nomeArquivo: file.name,
                        contrato: result,
                        arquivo: arrayBuffer,
                    };

                    await contratoDAO.adicionarDado(dadoParaArmazenar);
                    console.log("Dado armazenado com sucesso!");

                    navigate('/resultado', { state: { dadoParaArmazenar } });
                };

                fileReader.onerror = (error) => {
                    console.log("Erro ao ler o arquivo:", error);
                };
            } catch (e: any) {
                console.log(e.message);
            }

        } catch (e: any) {
            console.log(e.message);
        }
    }


    function switchAnalysisMode() {
        setAnalysisMode(prev => prev == "default" ? "exact" : "default")
    }

    return (
        <>
            <div className="fixed right-4 my-4 w-max flex md:flex-col-reverse gap-2 md:gap-0 items-center justify-center" title="Quando o modo exato está ativado, a IA validará todas as informações. Exemplo: Apenas retornará CNPJs válidos. Quando desligado, a IA usará apenas o contexto do texto para retornar as informações. O melhor modo para se usar depende do quão bem os seus estão formatados.">
                <p className="text-center my-2">Modo exato</p>
                <CustomSwitch mode={analysisMode} onClick={switchAnalysisMode} />
            </div>

            <h1 className="font-bold text-3xl 2xl:text-4xl md:mt-4 mt-16">Análise de contratos</h1>
            <p className="mt-2 2xl:text-2xl sm:text-xl text-center text-lg">Visualize informações sobre seu contrato, de forma rápida e fácil</p>
            <div className="xl:flex flex-row xl:mt-6 mt-4 gap-10 justify-center">
                <Card titulo="Automação" texto="Obtenha dados contratuais utilizando Inteligência Artificial, reduzindo o tempo necessário para a análise inicial dos documentos." icone={Lightning} altIcone="Icone de um relógio"></Card>
                <Card titulo="Eficiência operacional" texto="Aumente a eficiência da sua empresa na análise de contratos, minimizando erros humanos e otimizando o processo de revisão." icone={ChartLineUp} altIcone="Icone de um gráfico de linha subindo"></Card>
                <Card titulo="Histórico Completo" texto="Acesse facilmente um histórico detalhado de contratos e suas análises para melhor acompanhamento e referência." icone={ClockCounterClockwise} altIcone="Icone de um raio"></Card>
            </div>
            <div className="fixed bottom-4 flex flex-col items-center">
                <button className="bg-[#4514a3] flex items-center justify-center gap-4 font-bold py-4 px-20 text-white text-xl rounded-md shadow-md hover:bg-[#3b0f8c] transition-colors duration-300 cursor-pointer" onClick={() => document.getElementById('file-upload')!.click()}>
                    <FileArrowUp alt="Icone de um arquivo sendo enviado" size={50}></FileArrowUp>
                    <p className="sm:text-2xl text-xl text-medium text-white">Enviar Arquivo</p>
                    <input id="file-upload" type="file" accept=".pdf" onChange={submitArquivo} className="hidden" />
                </button>


                {!fileName
                    ? <p className="mt-2">Só aceitamos PDF, por enquanto.</p>
                    : <p className="mt-2">Arquivo enviado: {fileName}</p>
                }
            </div>
        </>
    )
}
