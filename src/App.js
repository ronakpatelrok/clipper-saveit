// import logo from './logo.svg';
// import React, { useState } from 'react'
import './App.css';
import Alert from './components/Alert';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import MainDesign from './components/MainDesign';
import SerarchClip from './components/SerarchClip';
import ClipState from './context/clips/ClipState';

function App() {
  const [alert, setAlert] = useState(null);
  const [clip, setClip] = useState({ clipName: "", clipContent: "", file: "" });
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      {/* <CreateSerarchClip /> */}
      <ClipState>
        <Router>
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/" element={<SerarchClip showAlert={showAlert} clip={clip} setClip={setClip} />} />
            <Route exact path="/createclip" element={<MainDesign showAlert={showAlert} clip={clip} setClip={setClip} />} />
            {/* <Route exact path="/clip" element={<SerarchClip showAlert={showAlert} clip={clip} setClip={setClip} />} />
            <Route exact path="/clip/createclip" element={<Createclip showAlert={showAlert} clip={clip} setClip={setClip} />} /> */}
          </Switch>
        </Router>
      </ClipState>
    </>
  );
}

export default App;
