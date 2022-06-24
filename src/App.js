import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Summary from './components/Summary';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Summary />
    </div>
  );
}

export default App;
