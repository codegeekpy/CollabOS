import StatCard from "../components/ui/StatCard";

import ProjectCard from "../components/project/ProjectCard";
function Dashboard() {

    
    const stats = [
        {
            label: "Active Projects",
            value: "4",
        },
        {
            label: "In Escrow",
            value: "$2,400",
        },
        {
            label: "Completed",
            value: "12",
        },
        {
            label: "Total Earned",
            value: "$8,750",
        },
    ];
    const projects = [
        {
            id: 1,
            name: "Website Redesign",
            status: "Active",
            budget: "$500",
        },
        {
            id: 2,
            name: "DeFi Dashboard",
            status: "In Progress",
            budget: "$1,200",
        },
        {
            id: 3,
            name: "Mobile App",
            status: "Completed",
            budget: "$800",
        },
    ];
    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-slate-400">Manage your projects, milestones, and escrows</p>
            <div className="mt-6 grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} label={stat.label} value={stat.value} />
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <div className="mt-4 space-y-3">
                    {projects.map((project) => (
                       <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;