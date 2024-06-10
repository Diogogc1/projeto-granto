import { ChangeEvent } from "react";
import { getDocument } from 'pdfjs-dist';


export default function Inserir() {

    function submitArquivo(e: ChangeEvent<HTMLInputElement>) {

        const file = e.target.files![0]; // Obter o arquivo selecionado

        const reader = new FileReader();

        reader.onload = async (event) => {
            const arrayBuffer = event.target!.result as ArrayBuffer;
            const pdf = await getDocument(arrayBuffer).promise;
            let texto = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                content.items.forEach(item => {
                    texto += item.toString() + ' '; // Concatenar o texto de cada item na página
                    
                    console.log(`Passou ${i}`)
                });
            }

            reader.readAsArrayBuffer(file);
            console.log(texto);

            /*//FETCH API
            fetch('http://localhost:5000/post/process-text', {
                method: "POST",
                body: JSON.stringify(textPDF),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })*/

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
