import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const balanceReducer = (state =0,action)=>{
  switch(action.type)
  {
    case "DEPOSIT":
      return state+action.payload.amount
    case "WITHDRAW":
      return state-100
    default:
      return state
  }
}
var store = createStore(balanceReducer,composeWithDevTools())

store.subscribe(()=>
{
  console.log(store.getState())
})
// store.dispatch({type:"abc"})
// store.dispatch({type:"DEPOSIT"})
// store.dispatch({type:"abc"})
// store.dispatch({type:"DEPOSIT"})
// store.dispatch({type:"WITHDRAW"})
function deposite(amt)
{
  return {
    type:"DEPOSIT",
    payload:{
      amount:amt
    }
  }
}

store.dispatch(deposite(500))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
