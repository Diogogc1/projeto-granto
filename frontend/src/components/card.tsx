interface PropsCard {
    titulo: string,
    texto: string,
    iconeURL: string,
    altIcone: string
}

export default function Card({ titulo, texto, iconeURL, altIcone }: PropsCard) {
    return (
        <div className="flex flex-col items-center bg-white py-4 px-3 mt-4 text-gray-800 text-md rounded-md shadow-md hover:bg-[#dcdbe1] transition-colors duration-300 cursor-pointer" style={{ outline: '1px solid grey' }}>
            <img src={iconeURL} alt={altIcone} width={80}/>
            <p className="text-2xl font-medium mt-4">{titulo}</p>
            <p className="mt-2 text-center opacity-80">{texto}</p>
        </div>
    )
}