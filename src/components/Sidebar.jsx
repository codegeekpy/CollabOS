import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="logo">CollabOS</h2>

            <nav>
                <Link to="/"> Dashboard</Link>
                <Link to="/projects"> Projects</Link>
                <Link to="/verify"> Verify Work</Link>
                <Link to="/escrows"> Escrows</Link>
                <Link to="/payments"> Payments</Link>
                <Link to="/settings"> Settings</Link>
            </nav>

            <div className="profile">
                <div className="avatar">K</div>
                <div>
                    <h4>Kashi</h4>
                    <p>Founder</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;