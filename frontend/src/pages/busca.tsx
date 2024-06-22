import { useEffect, useState } from "react"
import contratoDAO from "../DAOs/contratoDAO"

export default function Busca() {
    const [contratos, setContratos] = useState<any[]>([])
    useEffect(() => {
        contratoDAO.lerTodosDados().then((result) => {
            console.log(result)
            setContratos(result)
        }).catch((e) => {
            console.log(e.message)
        })
    }, [])

    return (
        <>
            <h1 className="font-bold text-3xl mt-4">Contratos Enviados</h1>
            {contratos.map((contrato, index) => {
                return (
                    <div className="flex flex-col items-center border border-gray-300 bg-white py-4 px-3 mt-4 text-gray-800 text-md rounded-md shadow-md hover:bg-[#dcdbe1] transition-colors duration-300 cursor-pointer" key={index}>
                        <p className="text-lg">{contrato.contrato.cats.aluguel}</p>
                    </div>
                )
            })}
        </>
    )
}