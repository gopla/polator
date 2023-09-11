import { Stack } from '@mui/material'
import SuspenseFallback from './components/common/SuspenseFallback'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import GameLayout from './components/layout/GameLayout'
import SetPlayer from './pages/SetPlayer'
import Games from './pages/Games'
import EndGame from './pages/EndGame'
import History from './pages/History'

const App = () => {
  return (
    <Stack id="game-root">
      <Suspense fallback={<SuspenseFallback />}>
        <Stack
          sx={{
            height: '100vh',
            marginTop: 0,
          }}
        >
          <Routes>
            <Route path="/" element={<GameLayout />}>
              <Route index element={<Home />} />
              <Route path=":teamId">
                <Route path="setPlayer" element={<SetPlayer />} />
                <Route path="play" element={<Games />} />
                <Route path="end" element={<EndGame />} />
              </Route>
              <Route path='history' element={<History />} />
            </Route>
          </Routes>
        </Stack>
      </Suspense>
    </Stack>
  )
}

export default App
