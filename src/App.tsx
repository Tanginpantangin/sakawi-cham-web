//import logo from './logo.svg';
import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import { LanguageProvider } from "./i18n";
import { FullCalendarType } from "./model/FullCalendarType";
import { MatrixCalendarType } from "./model/MatrixCalendarType";
import { DocumentPage } from "./pages/documentPage";
import { EventCalendarPage } from './pages/eventCalendarPage';
import { MonthCalendarPage } from './pages/monthCalendarPage';
import {
  DocumentDetailPage,
  DocumentsPage,
  AboutPage,
  NotFoundPage,
  PrivacyPage,
  ReleaseNotesPage,
  SupportPage
} from "./pages/publicPages";
import Helper from "./utility/helper";

function App() {
  const [matrixSakawiNT, setMatrixSakawiNT] = useState<MatrixCalendarType[]>([]);
  const [matrixSakawiBT, setMatrixSakawiBT] = useState<MatrixCalendarType[]>([]);
  const [fullSakawiNT, setFullSakawiNT] = useState<FullCalendarType[]>([]);
  const [fullSakawiBT, setFullSakawiBT] = useState<FullCalendarType[]>([]);

  useEffect(() => {
    function init() {
      const toYear = 2429;//2046

      // Build matrix Calendar
      let matrixNT = Helper.buildMatrixCalendar(toYear, 'NinhThuan');
      setMatrixSakawiNT(matrixNT.matrixCalendar);
      setFullSakawiNT(matrixNT.fullCalendar);


      let matrixBT = Helper.buildMatrixCalendar(toYear, 'BinhThuan');
      setMatrixSakawiBT(matrixBT.matrixCalendar);
      setFullSakawiBT(matrixBT.fullCalendar);

      // set localStorage
      // localStorage.setItem('matrixSakawiNT', JSON.stringify(matrixSakawiNT));
      // localStorage.setItem('matrixSakawiBT', JSON.stringify(matrixSakawiBT));
      // localStorage.setItem('fullSakawiNT', JSON.stringify(fullSakawiNT));
      // localStorage.setItem('fullSakawiBT', JSON.stringify(fullSakawiBT));

      //console.log('matrixBT', matrixBT.matrixCalendar);
    }

    init();
  }, []);

  return (
    <HashRouter>
      <LanguageProvider>
        <div className="App">
          <Routes>
            <Route path="/"
              element={<Navigate to="/calendar" replace />} />
            <Route path="/calendar"
              element={
                <MonthCalendarPage
                  matrixSakawiNT={matrixSakawiNT}
                  matrixSakawiBT={matrixSakawiBT}
                  fullSakawiNT={fullSakawiNT}
                  fullSakawiBT={fullSakawiBT}
                />
              } />
            <Route path="/months"
              element={
                <MonthCalendarPage
                  matrixSakawiNT={matrixSakawiNT}
                  matrixSakawiBT={matrixSakawiBT}
                  fullSakawiNT={fullSakawiNT}
                  fullSakawiBT={fullSakawiBT}
                />
              } />
            <Route path="/events"
              element={
                <EventCalendarPage
                  matrixSakawiNT={matrixSakawiNT}
                  matrixSakawiBT={matrixSakawiBT}
                  fullSakawiNT={fullSakawiNT}
                  fullSakawiBT={fullSakawiBT}
                />
              }
            />
            <Route path="/about"
              element={<AboutPage matrixSakawi={matrixSakawiNT} fullSakawi={fullSakawiNT} />} />
            <Route path="/docs" element={<DocumentPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/documents/:documentId" element={<DocumentDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/releases" element={<ReleaseNotesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </LanguageProvider>
    </HashRouter>
  );
}

export default App;
