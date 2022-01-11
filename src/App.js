import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import PageNotFound from "./components/Common/PageNotFound";
import Content from './components/Content/Content';
import ItemDetails from "./components/Content/ItemDetails";
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import { authmeThunk } from "./redux-store/auth-reducer";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authmeThunk())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
         <Route path='/' element={<Content/>}/>
         <Route path='item-details/:id' element={<ItemDetails/>}/>
         <Route path='/login' element={<LoginPage/>}/>
         <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
