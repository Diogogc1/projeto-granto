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
            <h1>Busca</h1>
            {contratos.map((contrato, index) => {
                return (
                    <div>
                        <p>{contrato.nome}</p>
                    </div>
                )
            })}
        </>
    )
}