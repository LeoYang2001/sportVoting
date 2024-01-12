import './App.css';
import Header from './components/Header';
import EventContainer from './containers/EventContainer';

function App() {
  return (
    <div className="p-4">
        <Header/>
        <EventContainer/>
    </div>
  );
}

export default App;
