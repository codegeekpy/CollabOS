import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import Projects from "./Projects";
function ProjectList({projects}){
    const navigate = useNavigate();
   return (
    <div className="ProjectList-container">
        <div className="ProjectList-navbar">
        <div className="ProjectList-title">
            <h1>Active Startup Projects</h1>
            <p>Browse decentralized smart contract platforms, verify budgets and lockups.</p>
        </div>
        <div className="ProjectList-button">
           <button onClick={()=>{navigate("/Projects")}}>Launch Project Card</button> 
        </div>
        </div>
       <div className="Project-container">
        {projects.map((project, index) => (
           <ProjectCard project={project} />
        ))}
</div> 
    </div>
);
}
export default ProjectList;
