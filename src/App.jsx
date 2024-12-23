import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import Auth from './Pages/Auth'
import Browse from'./Pages/Browse'
import Companies from './Admin/Companies'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Profile from './Pages/Profile'
import Jobdescription from './components/Jobdescription'
import CompanyCreate from './Admin/CompanyCreate'
import CompanySetUp from './Admin/CompanySetUp'
import AdminJobs from './Admin/AdminJobs'
import PostJob from './Admin/PostJob'
import Applicants from './Admin/Applicants'
import { tokenContext } from './context/TokenAuth'
import { useContext } from 'react'
import Pnf from './Pages/Pnf'

function App() {
  const{authorisedUser,setAuthorisedUser}=useContext(tokenContext)

  return (
    <>
<Routes>
 {authorisedUser &&
 <>

  <Route path='/jobs' element={<Jobs/>}></Route>
  <Route path='/browse' element={<Browse/>}></Route>
 </>
 }
         <Route path='/*' element={<Pnf/>}/>


<Route path='/' element={<Home/>}></Route>

  <Route path='/login' element={<Auth/>}></Route>
  <Route path='/register' element={<Auth insideRegister={true}/>}></Route>
  <Route path='/profile' element={<Profile/>}></Route>
  <Route path='/jobdescription/:id' element={<Jobdescription/>}></Route>
  <Route path='/admin/companies' element={<Companies/>}></Route>
  <Route path='/admin/companies/create' element={<CompanyCreate/>}></Route>
  <Route path='/admin/companies/:id' element={<CompanySetUp/>}></Route>
  <Route path='/admin/jobs' element={<AdminJobs/>}></Route>
  <Route path='/admin/postJob' element={<PostJob/>}></Route>
  <Route path='/admin/jobs/:id/applicants' element={<Applicants/>}></Route>


</Routes>

</>
   
  )
}

export default App
