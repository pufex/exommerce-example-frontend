export default function Button ({children, onClick, disabled, className, type = "button"}) {
    return <button
        disabled={disabled}
        onClick={onClick}
        className={`${className} px-10 h-10 flex items-center justify-center gap-4 rounded-lg text-whtie font-semibold border-2 ${!disabled ? "bg-red-600 border-red-800 cursor-pointer hover:bg-red-500 active:bg-red-400" : "bg-red-300 border-red-500 cursor-not-allowed"}`}
        type={type}
    >
        {children}
    </button>
}