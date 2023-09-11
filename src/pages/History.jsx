import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import StyledButtonAlt from '../components/button/StyledButtonAlt'
import Whitespace from '../components/common/Whitespace'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { useState } from 'react'

const History = () => {
  const [, , games, games_ref] = useOutletContext()
  const navigate = useNavigate()
  const [gamesData, setGamesData] = useState(
    Object.values(games).filter((game) => game.isFinisihed === true),
  )
  const [historyData, setHistoryData] = useState([])

  const [pageType, setPageType] = useState('list')

  const handleToHistoryDetail = (game) => {
    setPageType('detail')
    setHistoryData(game)
  }

  const handleBack = () => {
    if (pageType === 'detail') {
      setPageType('list')
      setHistoryData([])
      return
    }

    navigate(-1)
  }

  return (
    <Stack
      p={3}
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <Typography variant="p" className="text-header">
        History
      </Typography>

      <Whitespace height={20} />
      {pageType === 'list' && (
        <Stack
          sx={{
            height: '70vh',
            overflowY: 'scroll',
          }}
          spacing={3}
        >
          {gamesData.length > 0 &&
            gamesData.map((game, index) => (
              <HistoryCard key={index} game={game} handleClick={handleToHistoryDetail} />
            ))}
        </Stack>
      )}

      {pageType === 'detail' && <HistoryDetail game={historyData} />}
      <Whitespace height={30} />
      <Stack
        sx={{
          width: '100%',
        }}
      >
        <StyledButtonAlt handleEvent={handleBack}>Back</StyledButtonAlt>
      </Stack>
    </Stack>
  )
}

const HistoryCard = ({ game, handleClick }) => {
  return (
    <Stack
      p={2}
      sx={{
        border: '1px solid var(--black-color)',
        cursor: 'pointer',
        borderRadius: 2,
      }}
      onClick={() => handleClick(game)}
    >
      <Typography
        variant="p"
        sx={{
          fontWeight: 700,
        }}
      >
        {game?.date}
      </Typography>

      <Typography variant="p">
        {game?.endPlayer?.playerName} / {game?.endPlayer?.score} pts
      </Typography>

      <Typography variant="p">{game?.round} rounds</Typography>
    </Stack>
  )
}

const HistoryDetail = ({ game }) => {
  return (
    <Stack
      p={2}
      sx={{
        border: '1px solid var(--black-color)',
        borderRadius: 2,
        height: '70vh',
      }}
    >
      <Typography
        variant="p"
        sx={{
          fontWeight: 700,
        }}
      >
        {game.date}
      </Typography>

      <Typography variant="p">
        {game.endPlayer.playerName} / {game.endPlayer.score} pts
      </Typography>

      <Typography variant="p">{game.round} rounds</Typography>

      <Whitespace height={20} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {game?.scores &&
                game?.scores[game?.scores?.length - 1]?.players?.map((player, index) => (
                  <TableCell key={index} align="center">
                    {player.playerName}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {game?.scores.length > 0 &&
              game?.scores?.map((score, index) => (
                <TableRow key={index}>
                  {score.players.map((player, _index) => {
                    const accumulatedScore = game?.scores
                      .slice(0, index + 1)
                      .reduce((acc, round) => acc + round.players[_index].score, 0)

                    return (
                      <TableCell key={_index} align="center">
                        <Stack
                          direction={'row'}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                          }}
                        >
                          <Typography variant="p">{accumulatedScore}</Typography>
                          <Typography
                            variant="p"
                            sx={{
                              color: player.score > 0 ? 'var(--green-color)' : 'var(--red-color)',
                            }}
                          >
                            ({player.score > 0 ? '+' : ''}
                            {player.score})
                          </Typography>
                        </Stack>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default History
