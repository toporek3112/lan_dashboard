import React, { useState } from 'react';
import Header from './Header';
import FileExplorerPage from './file_sharing/FileExplorerPage';
import '../css/App.css';

function App() {
  return (
    <div className="App rgb-1">
      <Header />
      <FileExplorerPage />
    </div>
  );
}

export default App;
