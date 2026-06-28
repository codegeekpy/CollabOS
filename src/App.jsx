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
function Home(){
  return(<>
  <Navbar/>
  <Header/>
  <Footer/>
  </>);
}

function App(){
  return(
    <BrowserRouter>
    
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      <Route path="/projects" element={<Projects/>}/>
      {/* <Route path="/Dashboard" element={<Dashboard/>}/> */}
       <Route path="/VerifyWork" element={<VerifyWork/>}/>
       <Route path="/Escrows" element={<Escrows/>}/>
       <Route path="/ProjectList" element={<ProjectList/>}/>
       <Route path="/BlockChainExplorer" element={<BlockChainExplorer/>}/>
       <Route path="/Settings" element={<Settings/>}/>
       </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;