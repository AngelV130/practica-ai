
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout.jsx'
import { JobDetailPage } from './pages/JobDetailPage.jsx'
import { JobsPage } from './pages/JobsPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<JobsPage />} />
        <Route path="jobs/:jobId" element={<JobDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
