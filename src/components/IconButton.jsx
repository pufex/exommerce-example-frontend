export default function IconButton ({children, onClick, className = "", type}) {
    return <button
        onClick={onClick}
        className={`${className} h-10 w-10 flex items-center justify-center rounded-lg text-white font-semibold border-2 bg-red-600 border-red-800 cursor-pointer hover:bg-red-500 active:bg-red-400`}
        type={"button"}
    >
        {children}
    </button>
}