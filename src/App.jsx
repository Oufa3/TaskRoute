import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import CustomerGraph from './components/CustomerGraph/CustomerGraph'
import AllCustomersGraph from './components/AllCustomersGraph/AllCustomersGraph'
let x = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'customergraph',element:<CustomerGraph/>},
    {path:'allcustomergraph',element:<AllCustomersGraph/>},
  ]}
])

const App = () => {
  return (
    <div className="bg-white m-auto container">
      <Home/>
      <div className="flex items-center flex-wrap p-5">
        <div className="lg:w-1/2 w-full m-auto">
          <CustomerGraph />
        </div>
        <div className="lg:w-1/2 w-full m-auto">
          <AllCustomersGraph />
        </div>
      </div>
    </div>
  );
};

export default App