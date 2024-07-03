import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Resultado() {
    const { state } = useLocation();
    const [maiorValor, setMaiorValor] = useState<number>(0)
    const [classificacao, setClassificacao] = useState<string>("")
    const result = state?.result; // Obtém o resultado do estado

    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        console.log(`NOME: ${result.nomeArquivo}`)

        /*if (result && result.arquivo) {
            const blob = new Blob([result.arquivo], { type: 'application/pdf' });
            setPdfUrl(URL.createObjectURL(blob));
        }*/

        const possiveisResultados: number[] = []
        possiveisResultados.push(result.contrato.cats.aluguel)
        possiveisResultados.push(result.contrato.cats.confidencialidade)
        possiveisResultados.push(result.contrato.cats.parceria)
        possiveisResultados.push(result.contrato.cats.prestacao_servico)
        possiveisResultados.push(result.contrato.cats.venda_compra)

        for (let i = 0; i < possiveisResultados.length; i++) {
            if (possiveisResultados[i] > maiorValor) {
                setMaiorValor(possiveisResultados[i])
            }
        }

        switch (true) {
            case maiorValor === result.contrato.cats.aluguel: {
                setClassificacao("Aluguel")
                break
            }
            case maiorValor === result.contrato.cats.confidencialidade: {
                setClassificacao("Confidencialidade")
                break
            }
            case maiorValor === result.contrato.cats.parceria: {
                setClassificacao("Parceria")
                break
            }
            case maiorValor === result.contrato.cats.prestacao_servico: {
                setClassificacao("Prestação de serviço")
                break
            }
            case maiorValor === result.contrato.cats.venda_compra: {
                setClassificacao("Venda ou Compra")
                break
            }
        }
    })

    return (
        <>
            <h1 className="text-2xl text-black font-bold mt-4">RESULTADO</h1>
            <div className="flex flex-row justify-center gap-2 items-center mt-3">
                <h2 className="text-xl text-black">O Documento se classifica como: </h2>
                <p className="text-xl text-[#4510a3] font-semibold">{classificacao}</p>
            </div>

            <div className="flex gap-6 w-full">
                <div className="bg-[#F9F9F9]  hover:bg-[#4510a3] hover:text-white flex flex-col border-2 border-gray-300 p-3 py-5 rounded-md flex-1 gap-4 mt-8">
                    <p className="text-xl">{`Nome do Arquivo: ${result.nomeArquivo}`}</p>
                    <p className="text-xl">{`CNPJs: ${result.contrato.cnpjs.join(', ')}`}</p>
                </div>
                <div className="bg-[#F9F9F9]  hover:bg-[#4510a3] hover:text-white flex flex-col border-2 border-gray-300 p-3 py-5 rounded-md flex-1 gap-4 mt-8">
                    <p className="text-xl">{`Contratante: ${result.contrato.contractant}`}</p>
                    <p className="text-xl">{`Contratado: ${result.contrato.contractor}`}</p>
                </div>
            </div>
            <p className="text-xl mt-8">{`Datas: ${result.contrato.dates}`}</p>

            
            {/*<iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                title="PDF Viewer"
            ></iframe>*/}
        </>
    )
}