import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import CardCreate from './components/CardCreate';
import About from './components/About';
import Login from './components/Login';
import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/create" element={<CardCreate />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App