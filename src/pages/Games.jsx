import { Leaderboard, Score, Scoreboard, Casino } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import LeaderboardScreen from '../components/games/LeaderboardScreen'
import ScoreScreen from '../components/games/ScoreScreen'
import JokerSelector from '../components/games/JokerSelector'

const Games = () => {
  const [pageType, setPageType] = useState('leaderboard') // leaderboard, score, joker

  const handleChangePageType = (page) => {
    setPageType(page)
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
        {pageType === 'joker' && <JokerSelector />}
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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          <Stack
            sx={{
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleChangePageType('leaderboard')}
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
            onClick={() => handleChangePageType('score')}
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

          <Stack
            sx={{
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleChangePageType('joker')}
          >
            <Casino
              sx={{
                color:
                  pageType === 'joker'
                    ? 'var(--red-color)'
                    : 'var(--black-color)'
              }}
            />


            <Typography
              variant="p"
              sx={{
                fontSize: 12,
                color:
                  pageType === 'joker'
                    ? 'var(--red-color)'
                    : 'var(--black-color)'
              }}
            >
              Joker
            </Typography>

          </Stack>

        </Stack>
      </Stack>
    </Stack>
  )
}

export default Games
