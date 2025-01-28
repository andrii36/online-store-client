import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authmeThunk } from "./actions/user-actions";
import './App.css';
import LoadingModal from "./components/Common/LoadingModal";
import Header from './components/Header/Header';
import Routes from './components/router';

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
        <Routes/>
    </div>
  );
}

export default App;
