import { BrowserRouter,Routes,Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Statecards from "./components/Statecards";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import VerifyWork from "./pages/VerifyWork";
import Escrows from "./pages/Escrows";
import ProjectList from "./pages/ProjectList";
import BlockChainExplorer from "./pages/BlockChainExplorer";
import Settings from "./pages/Settings";
import Layout from "./Layout";
import { useState } from "react";
function Home(){
  return(<>
  <Navbar/>
  <Header/>
  <Footer/>
  </>);
}

function App(){
  const [projects,setProjects] = useState([]);
  return(
    <BrowserRouter>
    
     <Routes>
          <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects projects={projects} setProjects={setProjects} />}/>
      {/* <Route path="/Dashboard" element={<Dashboard/>}/> */}
       <Route path="/VerifyWork" element={<VerifyWork/>}/>
       <Route path="/Escrows" element={<Escrows/>}/>
       <Route path="/ProjectList" element={<ProjectList projects={projects}/>}/>
       <Route path="/BlockChainExplorer" element={<BlockChainExplorer/>}/>
       <Route path="/Settings" element={<Settings/>}/>
       </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;