import React from 'react';
import Header from './Header';
import FileExplorerPage from './file_sharing/FileExplorerPage';
import HomePage from './Homepage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../css/App.css';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <Header />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Navigate replace to="/homepage" />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/file-explorer/folder/:folderPath" element={<FileExplorerPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
