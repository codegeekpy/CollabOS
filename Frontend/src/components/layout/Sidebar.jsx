import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  WalletCards,
  Settings
} from "lucide-react";

function Sidebar() {
    const navigation=[
        {name:"Dashboard",icon:LayoutDashboard,
             path:"/",
        },
        {
            name:"Projects",
            icon:FolderKanban,
            path:"/projects",
        },
        {
            name:"WorkSpace",
            icon:BriefcaseBusiness,
             path:"/workspace",
        },{
            name:"Escrows",
            icon:WalletCards,
             path:"/escrows",
        },
        {
            name:"Settings",
            icon:Settings,
            path:"/settings"
        }
    ];
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-4">
      {/* Brand */}
      <div className="px-2 py-4 text-2xl font-bold text-white">
        CollabOS
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-2">
        {navigation.map((item)=>(
            <a
            key={item.name}
            href={item.path}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
                <item.icon size={18}/>
                {item.name}
            </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;