import { Dialog, DialogTitle, Stack, TextField } from '@mui/material'
import StyledButton from '../button/StyledButton'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useOutletContext } from 'react-router-dom'
import { update } from 'firebase/database'

const ScoreChangerModal = ({ open, handleClose, player, type }) => {
  const [team, team_ref] = useOutletContext()
  const [score, setScore] = useState('')

  const handleChangeScore = () => {
    if (score === '' || score === null) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Score cannot be empty!'
      })
    }

    update(team_ref, {
      ...team,
      players: team.players.map((_player) => {
        if (player.id === _player.id) {
          return {
            ..._player,
            score:
              type === 'add'
                ? _player.score + parseInt(score)
                : _player.score - parseInt(score)
          }
        }
        return _player
      })
    })

    setScore('')
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {type === 'add' ? 'Add' : 'Substract'} {player?.playerName}'s Score
      </DialogTitle>

      <Stack p={2} spacing={3}>
        <TextField
          type="number"
          label="Score"
          margin="dense"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <StyledButton handleEvent={handleChangeScore}>Save</StyledButton>
      </Stack>
    </Dialog>
  )
}

export default ScoreChangerModal
