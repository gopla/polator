import { Stack, TextField, Typography } from '@mui/material'
import Whitespace from '../components/common/Whitespace'
import { useState } from 'react'
import { AddRounded, RemoveCircle } from '@mui/icons-material'
import StyledButton from '../components/button/StyledButton'
import { v4 as uuid } from 'uuid'
import Swal from 'sweetalert2'
import { update } from 'firebase/database'
import { useNavigate, useOutletContext } from 'react-router-dom'

const SetPlayer = () => {
  const [team, team_ref] = useOutletContext()
  const navigate = useNavigate()
  const [playerCount, setPlayerCount] = useState(1)
  const [formData, setFormData] = useState({
    players: [
      {
        id: uuid(),
        playerName: '',
        score: 0,
      },
    ],
  })

  const handleAddPlayer = () => {
    setPlayerCount(playerCount + 1)
    setFormData({
      ...formData,
      players: [
        ...formData.players,
        {
          id: uuid(),
          playerName: '',
          score: 0,
        },
      ],
    })
  }

  const handleRemovePlayer = (id) => {
    setPlayerCount(playerCount - 1)
    setFormData({
      ...formData,
      players: formData.players.filter((player) => player.id !== id),
    })
  }

  const handleChange = (e, id) => {
    setFormData({
      ...formData,
      players: formData.players.map((player) => {
        if (player.id === id) {
          return {
            ...player,
            playerName: e.target.value,
          }
        }
        return player
      }),
    })
  }

  const handleNext = () => {
    if (playerCount < 2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add at least 2 players',
      })
      return
    }

    formData?.players?.map(player => {
      if (player.playerName === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill all player name',
        })
        return
      }
    })

    update(team_ref, {
      ...team,
      players: formData.players,
    })

    navigate(`/${team.teamId}/play`)
  }

  return (
    <Stack
      px={3}
      gap={7}
      sx={{
        height: '80vh',
      }}
    >
      <Whitespace height={30} />
      <Typography variant="p" className="text-header">
        Set Player
      </Typography>

      <Stack
        sx={{
          height: '80vh',
        }}
      >
        {formData?.players?.map((player, index) => (
          <Stack
            key={index}
            direction={'row'}
            sx={{
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontWeight: 700,
                marginRight: index === 0 ? 1.5 : 1,
              }}
            >
              {index + 1}
            </Typography>

            <TextField
              label="Player Name"
              margin="dense"
              variant="outlined"
              fullWidth
              value={player.playerName}
              onChange={(e) => handleChange(e, player.id)}
            />

            <RemoveCircle
              sx={{
                color: 'var(--black-color)',
                cursor: 'pointer',
              }}
              onClick={() => handleRemovePlayer(player.id)}
            />
          </Stack>
        ))}

        <Stack
          mt={3}
          sx={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <AddRounded
            sx={{
              backgroundColor: 'var(--red-color)',
              color: 'var(--white-color)',
              cursor: 'pointer',
              borderRadius: '20%',
            }}
            onClick={handleAddPlayer}
          />
        </Stack>

        <Whitespace height={30} />
      </Stack>
      <Stack
        sx={{
          width: '100%',
          gap: 2,
        }}
      >
        <StyledButton handleEvent={handleNext}>Next</StyledButton>
      </Stack>
    </Stack>
  )
}

export default SetPlayer
