import { useEffect, useState, useMemo } from "react";
import contratoDAO from "../DAOs/contratoDAO";
import { FilePdf } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Busca() {
    const [contratos, setContratos] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        contratoDAO
            .lerTodosDados()
            .then((result) => {
                setContratos(result);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);


    function verResultado(result: any) {
        navigate("/resultado", { state: { result } });
    }

    return (
        <>
            <h1 className="font-bold text-3xl mt-4 mb-6">Contratos Enviados</h1>
            {contratos.map((contrato, index) => {
                const possiveisResultados: number[] = []
                possiveisResultados.push(contrato.contrato.cats.aluguel)
                possiveisResultados.push(contrato.contrato.cats.confidencialidade)
                possiveisResultados.push(contrato.contrato.cats.parceria)
                possiveisResultados.push(contrato.contrato.cats.prestacao_servico)
                possiveisResultados.push(contrato.contrato.cats.venda_compra)

                var maiorValor: number = 0;

                for (let i = 0; i < possiveisResultados.length; i++) {
                    if (possiveisResultados[i] > maiorValor) {
                        maiorValor = possiveisResultados[i]
                    }
                }

                let classificacao: string = ""
                switch (maiorValor) {
                    case contrato.contrato.cats.aluguel: {
                        classificacao = "Aluguel"
                        break
                    }
                    case contrato.contrato.cats.confidencialidade: {
                        classificacao = "Confidencialidade"
                        break
                    }
                    case contrato.contrato.cats.parceria: {
                        classificacao = "Parceria"
                        break
                    }
                    case contrato.contrato.cats.prestacao_servico: {
                        classificacao = "Prestação de serviço"
                        break
                    }
                    case contrato.contrato.cats.venda_compra: {
                        classificacao = "Venda ou Compra"
                        break
                    }
                }

                return (
                    <div
                        onClick={() => verResultado(contrato)}
                        className="flex flex-row gap-6 items-center border border-gray-300 bg-white py-3 px-3 pr-64 mt-4 text-gray-800 text-md rounded-md shadow-sm hover:bg-[#efeef4] transition-colors duration-300 cursor-pointer"
                        key={index}
                    >
                        <FilePdf size={80} className="text-red-600"></FilePdf>
                        <div>
                            <p className="text-lg font-semibold mb-1">{`${contrato.nomeArquivo}`}</p>
                            <div className="flex gap-1">
                                <p className="text-base">{`Classificação: `}</p>
                                <p className="text-[#4510a3] font-semibold">{classificacao}</p>
                            </div>

                        </div>
                    </div>
                )
            })}
        </>
    );
}
