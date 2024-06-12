import { useState } from "react"
import { Link } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mudouPagina, setMudouPagina] = useState(false)

    function trocarBotao() {
        setMudouPagina(!mudouPagina)
    }

    return (
        <>
            <header className="w-full h-14 bg-blue-500 flex items-center shadow-lg">
                <h1 className="text-white text-xl font-bold ml-3">Prótotipo</h1>
                {mudouPagina
                    ? <button className="ml-auto mr-4" onClick={trocarBotao}>
                        <Link to={'/'} className="bg-white text-black-500 p-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-300">Enviar Contrato</Link>
                    </button>

                    : <button className="ml-auto mr-4" onClick={trocarBotao}>
                        <Link to={'/busca'} className="bg-white text-black-500 p-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-300">Ver Contratos</Link>
                    </button>
                }
            </header>

            <main className="flex items-center flex-col">
                {children}
            </main>
        </>
    )
}