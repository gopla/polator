import { Dialog, DialogTitle, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import StyledButtonAlt from '../button/StyledButtonAlt'
import Whitespace from '../common/Whitespace'
import { ref, update } from 'firebase/database'
import { database, useFirebase } from '../../utils/firebase'

const NextRoundModal = ({ open, handleClose }) => {
  const teamId = localStorage.getItem('teamId')
  const team_ref = ref(database, `games/${teamId}`)
  const team = useFirebase(team_ref)

  const initialPlayers = team?.players || []

  const [players, setPlayers] = useState(initialPlayers)

  const handleChange = (index, e) => {
    setPlayers(
      players.map((player, _index) => {
        if (index === _index) {
          return {
            ...player,
            score: parseInt(e.target.value),
          }
        }
        return player
      }),
    )
  }

  const handleSave = () => {
    update(team_ref, {
      ...team,
      players: team.players.map((teamPlayer) => {
        const correspondingPlayer = players.find(
          (player) => player.id === teamPlayer.id,
        )
        if (correspondingPlayer) {
          return {
            ...teamPlayer,
            score: teamPlayer.score + correspondingPlayer.score,
          }
        }
        return teamPlayer
      }),
      scores: team?.scores
        ? [
          ...team.scores,
          {
            round: team.round,
            players: players.map((player) => ({
              playerName: player.playerName,
              score: player.score,
              id: player.id,
            })),
          },
        ]
        : [
          {
            round: team.round,
            players: players.map((player) => ({
              playerName: player.playerName,
              score: player.score,
              id: player.id,
            })),
          },
        ],
      round: team.round + 1,
    })

    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Input Score</DialogTitle>

      <Stack p={3}>
        {players?.map((player, index) => {
          return (
            <TextField
              key={index}
              label={player.playerName}
              margin="dense"
              type="number"
              onChange={(e) => handleChange(index, e)}
            />
          )
        })}

        <Whitespace height={20} />

        <StyledButtonAlt handleEvent={handleSave}>Save</StyledButtonAlt>
      </Stack>
    </Dialog>
  )
}

export default NextRoundModal
