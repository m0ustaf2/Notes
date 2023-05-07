
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Componetes/Layout/Layout';
import Login from './Componetes/Login/Login';
import Register from './Componetes/Register/Register';
import Home from './Componetes/Home/Home';
import { ToastContainer } from 'react-toastify';
import InverseProtectedRoot from './Componetes/InverseProtectedRoute/InverseProutectedRoute';
import ProtectedRoot from './Componetes/ProtectedRoute/ProtectedRoute';
import Notfound from './Componetes/Notfound/Notfound';

function App() {


  const routers = createBrowserRouter([{
    path:"/", element:<Layout/> , children:[
      {path:"/login",element: <InverseProtectedRoot><Login/></InverseProtectedRoot>},
      {index:true,element: <InverseProtectedRoot><Register/> </InverseProtectedRoot>},
      {path:"/home",element: <ProtectedRoot><Home/></ProtectedRoot>},
    {path:'Notes',element:<ProtectedRoot> <Home/> </ProtectedRoot>},
    {path:'*' , element:<Notfound/>}


    ]
  }]) 
  return (
   <>
    <ToastContainer theme='colored'
    autoClose={1000}/>
    <RouterProvider router={routers}/>
   
   </>
  );
}

export default App;
