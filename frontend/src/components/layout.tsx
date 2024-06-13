import { useState } from "react"
import { Link } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mudouPagina, setMudouPagina] = useState(false)

    function trocarBotao() {
        setMudouPagina(!mudouPagina)
    }

    return (
        <>
        <header className="w-full h-20 bg-[#4514a3] flex items-center shadow-lg mx-auto">
             <img src="https://grantoseguros.com/wp-content/webp-express/webp-images/uploads/2022/08/logo2-1024x484.png.webp" alt="Granto Seguros Logo" className="h-12 w-auto ml-3"/>
                {mudouPagina
                    ? <button className="ml-auto mr-4" onClick={trocarBotao}>
                        <Link to={'/'} className="bg-[#77edd9] text-white font-bold p-3 px-4 rounded shadow-md hover:bg-[#44bda9] transition-colors duration-300">Enviar Contrato</Link>
                    </button>

                    : <button className="ml-auto mr-4" onClick={trocarBotao}>
                        <Link to={'/busca'} className="bg-[#77edd9] text-white font-bold p-3 px-4 rounded shadow-md hover:bg-[#44bda9] transition-colors duration-300">Ver Contratos</Link>
                    </button>
                }
            </header>

            <main className="flex items-center flex-col">
                {children}
            </main>
        </>
    )
}