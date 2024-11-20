import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Login from './Pages/Auth/Login';
import Regestir from './Pages/Auth/Regestir';
import Users from './Pages/Dashboard/Users/Users';
import Dashboard from './Pages/Dashboard/Dashboard';
import ReqouerAuth from './Pages/Auth/ReqouerAuth';
import UserEdit from './Pages/Dashboard/Users/UserEdit';
import AddUser from './Pages/Dashboard/Users/AddUser';
import Writer from './Pages/Dashboard/Writer';
import Page404 from './Pages/Dashboard/page404';
import ReqouerBack from './Pages/Auth/ReqouerBack';
import Categories from './Pages/Dashboard/Categories/Categories';
import AddCategories from './Pages/Dashboard/Categories/AddCategories';
import EditCategory from './Pages/Dashboard/Categories/EditCategory';
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import EditProduct from './Pages/Dashboard/Products/EditProduct';
import MainPage from './Pages/Website/MainPage/MainPage';
import WebCategories from './Pages/Website/MainPage/WebCategories';
import AllCategories from './Pages/Website/Categories/AllCategories';
import ProductInfo from './Pages/Website/Product/ProductInfo';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* ******* Public Routs ******* */}
        {/* Main Pages */}
        <Route element={<WebCategories />} > 
        <Route path='/' element={<MainPage />} />
        <Route path='/all-categories' element={<AllCategories />} />
        <Route path='product/:id' element={<ProductInfo />} />

        
        </Route>


        {/* Auth Pages */}
        <Route element={<ReqouerBack />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Regestir />} />
        </Route>
        
        {/* page 404  */}
        <Route path='/*' element={<Page404 />} />

        {/* ******* Proticted Routs ******* */}
        <Route element={<ReqouerAuth allowedRole={['1992','1995','1999']}/>} >

        <Route path='/dashboard' element={<Dashboard />}  >

          <Route element={<ReqouerAuth allowedRole={['1995']}/>}>
          <Route path='users'  element={<Users />}/>
          <Route path='users/:id'  element={<UserEdit />}/>
          <Route path='add-user'  element={<AddUser />}/>
          </Route>

          <Route element={<ReqouerAuth allowedRole={['1999','1995']}/>}>

            <Route path='categories'  element={<Categories />}/>
            <Route path='add-category'  element={<AddCategories/>}/>
            <Route path='categories/:id'  element={<EditCategory />}/>
          </Route>

          <Route element={<ReqouerAuth allowedRole={['1999','1995']}/>}>
            <Route path='products'  element={<Products />}/>
            <Route path='add-product'  element={<AddProduct/>}/>
            <Route path='products/:id'  element={<EditProduct />}/>

          </Route>
            
          <Route element={<ReqouerAuth allowedRole={['1992','1995']}/>}>

            <Route path='writer'  element={<Writer />}/>
          </Route>

          </Route>

        </Route>



      </Routes>
    </div>
  );
}

export default App;
