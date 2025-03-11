import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SurveyDataPage from "./pages/SurveyDataPage.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SurveyDataPage />
  </StrictMode>,
)
