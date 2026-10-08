import {
  LayoutDashboard,
  FolderKanban,
  WalletCards,
  ShieldCheck,
  Blocks,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const navigation = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Escrows",
      path: "/escrows",
      icon: WalletCards,
    },
    {
      label: "Verify Work",
      path: "/verify-work",
      icon: ShieldCheck,
    },
    {
      label: "Blockchain",
      path: "/blockchain",
      icon: Blocks,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-4">
      {/* Brand */}
      <div className="px-2 py-4 text-2xl font-bold text-white">
        CollabOS
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;