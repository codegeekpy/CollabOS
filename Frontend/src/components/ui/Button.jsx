function Button({children,variant="primary"}){
    const variants={
        primary:"bg-white text-slate-950 hover:bg-slate-200",
        secondary:"border border-slate-700 text-white hover:bg-slate-800"
    };

    return(<button className={`rounded-lg px-4 py-2 text-sm font-medium transition ${variants[variant]}`}>
        {children}
    </button>
    );
}
export default Button;
