function Badge({children,variant="success"}){
    const variants={
        success:"bg-green-500 text-white",
        warning:"bg-yellow-500 text-black",
        error:"bg-red-500 text-white",
        neutral:"bg-gray-500 text-white",
        info:"bg-blue-500 text-white"
    }
    return(
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${variants[variant]}`}>
            {children}
        </span>
    );
}
export default Badge;