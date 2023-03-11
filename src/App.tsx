//import logo from './logo.svg';
import './App.css';
import { Layout } from './Layout';
import { EventCalendarPage } from './pages/eventCalendarPage';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <MonthCalendarPage /> */}
        <EventCalendarPage />
      </Layout>
    </div>
  );
}

export default App;
