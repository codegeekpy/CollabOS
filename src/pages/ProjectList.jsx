function ProjectList({projects}){
   return (
    <div>

        {projects.map((project, index) => (

            <div key={index}>

                <h2>{project.name}</h2>

                <p>{project.contract}</p>

                <p>
                    {project.budget} {project.currency}
                </p>

                <p>{project.description}</p>

                <a href={project.url}>
                    GitHub
                </a>

            </div>

        ))}

    </div>
);
}
export default ProjectList;
