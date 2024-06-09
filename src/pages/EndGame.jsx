import { Avatar, Stack, Typography } from '@mui/material'
import { useNavigate, useOutletContext } from 'react-router-dom'
import StyledButton from '../components/button/StyledButton'
import StyledButtonAlt from '../components/button/StyledButtonAlt'
import { ref, set, update } from 'firebase/database'
import { v4 as uuid } from 'uuid'
import { database } from '../utils/firebase'
import { format } from 'date-fns'

const EndGame = () => {
  const [team, team_ref] = useOutletContext()
  const navigate = useNavigate()
  const teamId = uuid()
  const endPlayer =
    team?.endCondition === 'win'
      ? team?.players?.filter((player) => player.score >= 500)[0]
      : team?.players?.filter((player) => player.score <= -500)[0]

  const newTeam_ref = ref(database, `games/${teamId}`)

  const handlePlayAgain = () => {
    update(team_ref, {
      ...team,
      endPlayer
    })

    set(newTeam_ref, {
      teamId,
      date: format(new Date(), 'dd-MM-yyyy'),
      time: format(new Date(), 'HH:mm:ss'),
      round: 1,
      isFinisihed: false,
      players: team?.players?.map((player) => ({
        ...player,
        score: 0
      }))
    })

    localStorage.setItem('teamId', teamId)
    navigate(`/${teamId}/play`)
    return
  }

  const handleNewGame = () => {
    update(team_ref, {
      ...team,
      endPlayer
    })

    set(newTeam_ref, {
      teamId,
      date: format(new Date(), 'dd-MM-yyyy'),
      time: format(new Date(), 'HH:mm:ss'),
      round: 1,
      isFinisihed: false
    })

    localStorage.setItem('teamId', teamId)
    navigate(`/${teamId}/setPlayer`)
    return
  }

  const handleHistory = () => {
    update(team_ref, {
      ...team,
      endPlayer
    })

    navigate(`/history`)
  }

  const handleExit = () => {
    update(team_ref, {
      ...team,
      endPlayer
    })

    navigate(`/`)
  }

  return (
    <Stack
      p={3}
      gap={5}
      sx={{
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Typography variant="p" className="text-header">
        {team?.endCondition === 'win' ? 'Winner!' : 'Loser!'}
      </Typography>

      <Stack
        sx={{
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            fontSize: 48,
            marginBottom: 2
          }}
        >
          {endPlayer.playerName?.substring(0, 1).toUpperCase()}
        </Avatar>

        <Typography
          variant="p"
          sx={{
            fontWeight: 700,
            fontSize: 24
          }}
        >
          {endPlayer.playerName}
        </Typography>

        <Typography
          variant="p"
          sx={{
            fontWeight: 700,
            fontSize: 48
          }}
        >
          {endPlayer.score}
        </Typography>
      </Stack>

      <Stack
        sx={{
          width: '100%',
          gap: 2
        }}
      >
        <StyledButton handleEvent={handlePlayAgain}>Play Again</StyledButton>
        <StyledButtonAlt handleEvent={handleNewGame}>New Game</StyledButtonAlt>
      </Stack>

      <Stack
        direction={'row'}
        sx={{
          width: '100%',
          gap: 3
        }}
      >
        <StyledButtonAlt handleEvent={handleHistory}>History</StyledButtonAlt>
        <StyledButton handleEvent={handleExit}>Exit</StyledButton>
      </Stack>
    </Stack>
  )
}

export default EndGame
