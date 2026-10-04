function StatCard({label,value}){
    return(<div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>);
}
export default StatCard;