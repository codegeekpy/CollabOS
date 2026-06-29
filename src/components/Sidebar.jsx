import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="logos">CollabOS</h2>

            <nav>
                <NavLink to="/Dashboard"> Dashboard</NavLink>
                <NavLink to="/ProjectList"> ProjectList</NavLink>
                <NavLink to="/projects">Project</NavLink>
                <NavLink to="/VerifyWork"> Verification Module</NavLink>
                <NavLink to="/escrows"> Payment Escrows</NavLink>
                <NavLink to="/BlockChainExplorer"> Blockchain Explorer</NavLink>
                <NavLink to="/settings"> Settings</NavLink>
            </nav>

            <div className="profile">
                <div className="avatar">K</div>
                <div>
                    <h4>Kashi</h4>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;