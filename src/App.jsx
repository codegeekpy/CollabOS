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
      <Route path="/" element={<Home />}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
       <Route path="/VerifyWork" element={<VerifyWork/>}/>
       <Route path="/Escrows" element={<Escrows/>}/>
       <Route path="/ProjectList" element={<ProjectList/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;