import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { authmeThunk } from "./actions/auth-actions";
import './App.css';
import PageNotFound from "./components/Common/PageNotFound";
import Content from './components/Content/Content';
import ItemDetailsContainer from "./components/Content/ItemDetailsContainer";
import Header from './components/Header/Header';
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";

const App = () => {
  
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
         <Route path='item-details/:id' element={<ItemDetailsContainer/>}/>
         <Route path='/login' element={<LoginPageContainer/>}/>
         <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
