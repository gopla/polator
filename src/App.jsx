import { Stack } from '@mui/material'
import SuspenseFallback from './components/common/SuspenseFallback'
import { Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import GameLayout from './components/layout/GameLayout'
import SetPlayer from './pages/SetPlayer'
import Games from './pages/Games'
import EndGame from './pages/EndGame'
import History from './pages/History'
import { Fullscreen, FullscreenExit } from '@mui/icons-material'

const App = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const handleFullscreen = () => {
    document.body.requestFullscreen()
    setIsFullscreen(true)
  }
  const handleExitFullscreen = () => {
    document.exitFullscreen()
    setIsFullscreen(false)
  }

  return (
    <Stack id="game-root">
      <Suspense fallback={<SuspenseFallback />}>
        <Stack
          sx={{
            height: '100vh',
            marginTop: 0,
            position: 'relative'
          }}
        >
          {!isFullscreen ? (
            <Fullscreen
              sx={{
                position: 'absolute',
                right: 0,
                zIndex: 1000,
                cursor: 'pointer',
                fontSize: '5vh',
                margin: 1,
                color: 'var(--red-color)'
              }}
              onClick={handleFullscreen}
            />
          ) : (
            <FullscreenExit
              sx={{
                position: 'absolute',
                right: 0,
                zIndex: 1000,
                cursor: 'pointer',
                fontSize: '5vh',
                color: 'var(--red-color)'
              }}
              onClick={handleExitFullscreen}
            />
          )}
          <Routes>
            <Route path="/" element={<GameLayout />}>
              <Route index element={<Home />} />
              <Route path=":teamId">
                <Route path="setPlayer" element={<SetPlayer />} />
                <Route path="play" element={<Games />} />
                <Route path="end" element={<EndGame />} />
              </Route>
              <Route path="history" element={<History />} />
            </Route>
          </Routes>
        </Stack>
      </Suspense>
    </Stack>
  )
}

export default App
