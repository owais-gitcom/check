import React from 'react';
import './Home.css'

import { Link } from "react-router-dom";

const Home = () => {
  return (
    
<>
  <main className="main-content">
    <div className="container">
      <h1>Welcome to MyWebsite</h1>
      <p>Your one-stop solution for modern web experiences.</p>
{/* <Link to="" className="btn">Go to User Panel</Link> */}
      <button className="btn">Get Start</button>
   </div>
  </main>
</>

 );
};

export default Home;
