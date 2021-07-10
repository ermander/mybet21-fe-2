import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Oddsmatcher from "./pages/Oddsmatcher"
import InitialOdds from "./components/InitialOdds"

function App() {
  return (
    <div id="app">
      <Oddsmatcher />
      {/* <InitialOdds /> */}
    </div>
  );
}
 
export default App;

