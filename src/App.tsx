import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Layout from './Layout/Layout';
import LayoutAlternative from './Layout/LayoutAlternative';
import { Provider } from 'react-redux';
import { persistor, store } from './hooks/store';
import EditBook from './pages/EditBook';
import { PersistGate } from 'redux-persist/integration/react';
import Register from './pages/Register';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Books />} />
              <Route path="/add" element={<AddBook />} />
              <Route path="/edit" element={<EditBook />} />
            </Route>
            <Route path="/login" element={<LayoutAlternative />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/register" element={<LayoutAlternative />}>
              <Route index element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
