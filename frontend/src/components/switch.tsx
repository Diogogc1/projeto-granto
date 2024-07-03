export default function CustomSwitch({ mode, onClick }: { mode: string | boolean, onClick: () => any; }) {
    return (
        <div onClick={onClick}
            className={`${mode != "default" ? "justify-start bg-gray-100" : "justify-end  bg-[#4514a3]"} w-16 rounded-xl flex border border-gray-300 cursor-pointer transition-all`}>
            <div className="w-min">{mode == "default" ? "⚪" : "⚫"}</div>
        </div>
    )
}