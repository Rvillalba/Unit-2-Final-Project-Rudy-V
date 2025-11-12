import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigate from './components/Navigate';
import Landing from './components/Landing';
import CardCreate from './components/CardCreate';
import About from './components/About';
import CardWallet from './components/CardWallet';
import './App.css';

function App() {
    return (
        <div>
            <Router>
                <Navigate />
                <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/create" element={<CardCreate />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/wallet" element={<CardWallet />} />

                </Routes>
            </Router>
        </div>
    )
}
export default App