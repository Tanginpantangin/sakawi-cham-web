import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Calendar } from './components/calendar';
import { Layout } from './Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Calendar/>
      </Layout>
    </div>
  );
}

export default App;
