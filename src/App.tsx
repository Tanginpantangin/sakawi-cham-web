//import logo from './logo.svg';
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { DocumentPage } from "./pages/documentPage";
import { EventCalendarPage } from './pages/eventCalendarPage';
import { MonthCalendarPage } from './pages/monthCalendarPage';
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MonthCalendarPage />} />
          <Route path="/months" element={<MonthCalendarPage />} />
          <Route path="/events" element={<EventCalendarPage />} />
          <Route path="/docs" element={<DocumentPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
