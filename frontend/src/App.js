import Navbar from "./component/Navbar";
import AdminLogin from "./pages/AdminLogin";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyMapping from "./pages/FacultyMap";
import Home from "./pages/Home";
import MarksEntry from "./pages/MarksEntry";
import StudentLogin from "./pages/StudentLogin";
import StudentProfile from "./pages/StudentProfile";
import TeacherDashboard from "./pages/TeacherDashboard";
import { BrowserRouter, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <>      
    <Navbar/>

   <BrowserRouter>
   <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/studentlogin" element={<StudentLogin/> }/>
 <Route path="/facultylogin" element={<FacultyLogin/>} />
 <Route path="/adminlogin" element={  <AdminLogin/>} />
 <Route />

   </Routes>
   </BrowserRouter>

      
      
    
      {/* <StudentProfile/> */}
      {/* <FacultyMapping/> */}
      {/* <TeacherDashboard/> */}
      {/* <MarksEntry/> */}
     </>

 
  );
}

export default App;
