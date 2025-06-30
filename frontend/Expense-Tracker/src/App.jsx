import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/userContext'
import {Toaster} from 'react-hot-toast'

export default function App() {

  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>
      </Router>
    </div>

    <Toaster
      toastOptions = {{
        className: "",
        style : {
          fontSize : '13px'
        }
      }}
    />
    </UserProvider>
  );
};

const Root = () => {
  //check if the token exists in the local storage
  // (!!) converts any value to boolean
  const isAuthenticated = !!localStorage.getItem('token');



  //Redirect to dashboard if authenticated otherwise lo login
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  )
}