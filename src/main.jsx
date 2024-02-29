
import ReactDOM from 'react-dom/client'
import './style/main.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './redux/slices/store'
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <RouterProvider router={router}/>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </Provider>

)
