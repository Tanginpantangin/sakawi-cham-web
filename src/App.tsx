//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { EventCalendarPage } from './pages/eventCalendarPage';
import { MonthCalendarPage } from './pages/monthCalendarPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MonthCalendarPage />} />
          <Route path="/months" element={<MonthCalendarPage />} />
          <Route path="/events" element={<EventCalendarPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
