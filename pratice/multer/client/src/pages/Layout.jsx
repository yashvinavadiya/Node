import { BrowserRouter as Router  , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Navbar from '../components/Navbar'
import Register from './Register'
import Login from './Login'
import axios from 'axios'
import StudentData from './StudentData'

const Layout = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/student' element={<StudentData/>}/>
      </Routes>
    </Router>
  )
}

export default Layout