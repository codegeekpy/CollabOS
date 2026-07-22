import lo from "../assets/react.svg"
import "./ProjectCard.css"
function ProjectCard({project}){
    return(<div className="ProjectCard-container">
        <div className="P-title">

    <div className="P-logo">Ae</div>

    <div>
        <h3>{project.contract}</h3>
        <p>{project.name}</p>
    </div>

    <div className="P-button">
        <button>Active</button>
    </div>

</div>


<hr/>


<div className="p-details">
    <p>{project.description}</p>
</div>


<hr/>


<div className="info-row">

    <div className="p-budegt">
        <h4>Funding Escrow</h4>
        <h2>{project.budget} {project.currency}</h2>
    </div>


    <div className="p-projectdetail">
        <h2>address</h2>
    </div>

</div>


<button className="view-btn">
    View Core
</button>

    </div>);

}
export default ProjectCard;