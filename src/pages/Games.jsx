import { Leaderboard, Score, Scoreboard } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import LeaderboardScreen from '../components/games/LeaderboardScreen'
import ScoreScreen from '../components/games/ScoreScreen'

const Games = () => {
  const [pageType, setPageType] = useState('leaderboard')

  const handleChangePageType = () => {
    if (pageType === 'leaderboard') {
      setPageType('score')
    } else {
      setPageType('leaderboard')
    }
  }

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
      spacing={2}
    >
      <Stack
        sx={{
          height: '100%'
        }}
      >
        {pageType === 'leaderboard' && <LeaderboardScreen />}
        {pageType === 'score' && <ScoreScreen />}
      </Stack>

      <Stack
        sx={{
          bottom: 0,
          width: '100%',
          height: '20vh',
          borderRadius: 5,
          border: '2px solid var(--red-color)',
          justifyContent: 'center'
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            width: '100%',
            justifyContent: 'space-around'
          }}
        >
          <Stack
            sx={{
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={handleChangePageType}
          >
            <Leaderboard
              sx={{
                color:
                  pageType === 'leaderboard'
                    ? 'var(--red-color)'
                    : 'var(--black-color)'
              }}
            />

            <Typography
              variant="p"
              sx={{
                fontSize: 12,
                color:
                  pageType === 'leaderboard'
                    ? 'var(--red-color)'
                    : 'var(--black-color)'
              }}
            >
              Leaderboard
            </Typography>
          </Stack>

          <Stack
            sx={{
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={handleChangePageType}
          >
            <Scoreboard
              sx={{
                color:
                  pageType === 'score'
                    ? 'var(--red-color)'
                    : 'var(--black-color)'
              }}
            />

            <Typography
              variant="p"
              sx={{
                fontSize: 12,
                color:
                  pageType === 'score'
                    ? 'var(--red-color)'
                    : 'var(--black-color)'
              }}
            >
              Score
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Games
