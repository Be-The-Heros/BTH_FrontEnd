import { Header } from 'components/Header';
import React from 'react';
import './App.css';
import { AppViews } from './pages';
import './styles/index.css';
function App() {
  return (
    <div className='app'>
      <Header />
      <AppViews />
    </div>
  );
}

export default App;
