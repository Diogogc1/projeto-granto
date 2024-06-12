import { ChangeEvent, useState } from "react";
import contratoDAO from "../DAOs/contratoDAO";
import CustomSwitch from "../components/switch";

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
            <div className="absolute right-4 my-4 w-max flex flex-col items-center justify-center">
                <CustomSwitch mode={analysisMode} onClick={switchAnalysisMode} />
                <p className="text-center my-2">Modo exato</p>
            </div>
            <h2 className="font-bold text-3xl mt-4">Análise de contratos</h2>
            <p className="mt-2 text-xl">Visualize informações sobre seu contrato, de forma rápida e fácil</p>
            <label htmlFor="file-upload" className="bg-[#1262FF] font-bold py-4 px-10 mt-8 text-white text-xl rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                Enviar Contrato
            </label>
            <input id="file-upload" type="file" accept=".pdf" onChange={submitArquivo} className="hidden" />
            {fileName && <p className="mt-4">Arquivo enviado: {fileName}</p>}
        </>
    )
}
