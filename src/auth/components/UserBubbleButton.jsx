export default function UserBubbleButton ({disabled, className = "", onClick, children, type = "button"}){
    return <button 
        className={`${className} w-full h-10 px-2 flex items-center gap-2 text-xl font-semibold ${disabled ? "text-black/50 bg-gray-200 cursor-not-allowed": "text-black bg-gray-200 hover:bg-gray-100 active:bg-gray-100 cursor-pointer"}`}
        disabled={disabled}
        type={type}
        onClick={onClick}
    >
        {children}
    </button>
}