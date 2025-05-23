import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/home/home.tsx'
import Report from './components/report/report.tsx'
import Login from './components/login/login.tsx'
import Profile from './components/profile/profile.tsx'

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
