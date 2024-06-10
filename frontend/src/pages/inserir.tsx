import { ChangeEvent } from "react";
import contratoDAO from "../DAOs/contratoDAO";

export default function Inserir() {

    async function submitArquivo(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0]
        const formData = new FormData()

        formData.append("file", file)

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

    return (
        <>
            <h2 className="font-bold text-3xl mt-3">Análise de contratos</h2>
            <p className="mt-2 text-xl">Visualize informações sobre seu contrato, de forma rápida e fácil</p>

            <input type="file" accept=".pdf" onChange={submitArquivo} className="bg-[#1262FF] py-5 px-24 mt-8 text-white text-xl rounded" />
        </>
    )
}
