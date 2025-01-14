import { useState } from 'react'
import './App.css'
import Branch from './components/branches/branch'
import Subject from './components/subjects/subject';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Account from './components/account/myAccount';
import About from './components/about/about'

import Notes from "./components/account/notes"
import Myuploads  from "./components/account/myUploads"
import Settings from './components/account/settings';
import Favourites from './components/account/favourites';
import Sub from './components/sub/sub'
function App() {
 
return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Branch/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/:title" element={<Subject />}/>
         
        <Route path="/:title/sub/:subject" element={<Sub/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/account" element={<Account />}>
        <Route path="notes" element={<Notes/>} />
        <Route path="mynotes" element={<Myuploads />} />
        <Route path="favorites" element={<Favourites />} />
        <Route path="settings" element={<Settings />} />
        </Route>
        
        
      </Routes>
    </Router>

    </>
  )
}

export default App
