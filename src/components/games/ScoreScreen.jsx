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
import { useOutletContext } from 'react-router-dom'
import Whitespace from '../common/Whitespace'
import { useState } from 'react'
import { ref } from 'firebase/database'
import { database, useFirebase } from '../../utils/firebase'

const ScoreScreen = () => {
  // const [team, team_ref] = useOutletContext()
  const teamId = localStorage.getItem('teamId')
  const team_ref = ref(database, `games/${teamId}`)
  const team = useFirebase(team_ref)

  const initialPlayers = team?.players || []
  const initialScores = team?.scores || []

  const [scoreData, setScoreData] = useState(initialScores)

  return (
    <Stack p={3}>
      <Typography variant="p" className="text-header">
        Score Detail
      </Typography>
      <Typography variant="p">Current Round: {team?.round || 1}</Typography>

      <Whitespace height={20} />

      <Stack
        sx={{
          height: '70vh',
          overflowY: 'scroll',
        }}
        spacing={3}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {team?.scores &&
                  team?.scores[team?.scores?.length - 1]?.players?.map((player, index) => (
                    <TableCell key={index} align="center">
                      {player.playerName}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreData.length > 0 &&
                scoreData?.map((score, index) => (
                  <TableRow key={index}>
                    {score.players.map((player, _index) => {
                      const accumulatedScore = scoreData
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
      <Whitespace height={36} />
    </Stack>
  )
}

export default ScoreScreen
