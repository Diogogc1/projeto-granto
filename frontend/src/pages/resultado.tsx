import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Resultado() {
    const { state } = useLocation();
    const [maiorValor, setMaiorValor] = useState<number>(0)
    const [classificacao, setClassificacao] = useState<string>("")
    const result = state?.result; // Obtém o resultado do estado

    useEffect(() => {
        const possiveisResultados: number[] = []
        possiveisResultados.push(result.cats.aluguel)
        possiveisResultados.push(result.cats.confidencialidade)
        possiveisResultados.push(result.cats.parceria)
        possiveisResultados.push(result.cats.prestacao_servico)
        possiveisResultados.push(result.cats.venda_compra)

        for (let i = 0; i < possiveisResultados.length; i++) {
            if (possiveisResultados[i] > maiorValor) {
                setMaiorValor(possiveisResultados[i])
            }
        }

        switch (true) {
            case maiorValor === result.cats.aluguel: {
                setClassificacao("Aluguel")
                break
            }
            case maiorValor === result.cats.confidencialidade: {
                setClassificacao("Confidencialidade")
                break
            }
            case maiorValor === result.cats.parceria: {
                setClassificacao("Parceria")
                break
            }
            case maiorValor === result.cats.prestacao_servico: {
                setClassificacao("Prestação de serviço")
                break
            }
            case maiorValor === result.cats.venda_compra: {
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
                <p className="text-xl text-[#4514a3] font-semibold">{classificacao}</p>
            </div>
            
        </>
    )
}