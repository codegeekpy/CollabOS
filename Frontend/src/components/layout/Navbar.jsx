


function Navbar(){
    return(<header className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
        <div>
            <h2 className="text-sm font-medium text-slate-300">
                Collabos Workspace
            </h2>
        </div>
        <button className="rouded-lg border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800">
            Connect Wallet
        </button>

    </header>);
}
export default Navbar;