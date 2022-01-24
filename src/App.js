import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { authmeThunk } from "./actions/auth-actions";
import './App.css';
import LoadingModal from "./components/Common/LoadingModal";
import PageNotFound from "./components/Common/PageNotFound";
import Content from './components/Content/Content';
import EditItem from "./components/Content/EditItem";
import ItemDetailsContainer from "./components/Content/ItemDetailsContainer";
import Header from './components/Header/Header';
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";

const App = () => {
  
  const dispatch = useDispatch()
  const isInitialized = useSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authmeThunk())
  }, [])

  if(!isInitialized){
    return <LoadingModal/>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
         <Route path='/' element={<Content/>}/>
         <Route path='/item-details/:id' element={<ItemDetailsContainer/>}/>
         <Route path='/item-details/:id/edit' element={<EditItem/>}/>
         <Route path='/add-new-product' element={<EditItem addProduct/>}/>
         <Route path='/login' element={<LoginPageContainer/>}/>
         <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
