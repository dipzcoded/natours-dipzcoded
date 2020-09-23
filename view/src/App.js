import React from 'react';
import './App.css';
import Navbar from './component/layouts/Navbar';
import Footer from './component/layouts/Footer';
import Tours from './component/overview/Tours';
// Redux


const App = () => {
  return (
    <div>
      <Navbar />
      <Tours />
      <Footer />
    </div>
  );
}

export default App;
