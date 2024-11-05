import { Routes, Route, useLocation } from 'react-router-dom'
import s from './App.module.scss'
import ProjectsListPage from './pages/ProjectsListPage'
import ProjectPage from './pages/ProjectPage'
import Header from './components/Header'
import { useEffect } from 'react'

const App = () => {

  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    body.classList.remove(s['projects-bg'], s['project-detail-bg']);

    if (location.pathname === '/') {
      body.classList.add(s['projects-bg']);
    } else if (location.pathname.startsWith('/project/')) {
      body.classList.add(s['project-detail-bg']);
    } else {
      body.classList.add(s['default-bg']);
    }

    return () => {
      body.classList.remove(s['projects-bg'], s['project-detail-bg'], s['default-bg']);
    };
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className={s.app}>
        <Routes>
          <Route path="/" element={<ProjectsListPage />} />
          <Route path="/project/:owner/:repo" element={<ProjectPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App