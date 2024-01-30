import React, { useState } from 'react';
import Header from './Header';
import FileExplorerPage from './file_sharing/FileExplorerPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../css/App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FileExplorerPage />} />
        <Route path="/folder/:folderPath" element={<FileExplorerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
