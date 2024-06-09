import { Add, EmojiEvents, Remove } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ScoreChangerModal from '../modal/ScoreChangerModal'

const LeaderCard = ({ player }) => {
  const [isButtonShowed, setIsButtonShowed] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [scoreType, setScoretype] = useState('add')

  const handleShowButton = () => {
    setIsButtonShowed(!isButtonShowed)
  }

  const handleAddScore = () => {
    setOpenModal(true)
    setScoretype('add')
    setIsButtonShowed(false)
  }

  const handleSubstractScore = () => {
    setOpenModal(true)
    setScoretype('substract')
    setIsButtonShowed(false)
  }

  return (
    <Stack>
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--red-color)',
          color: 'var(--white-color)',
          padding: 3
        }}
        direction={'row'}
        spacing={2}
      >
        <Typography
          variant="p"
          className="text-header"
          sx={{
            color: 'var(--white-color)'
          }}
        >
          #1
        </Typography>
        <Avatar>
          <Avatar>{player.playerName?.substring(0, 1).toUpperCase()}</Avatar>
        </Avatar>
        <Stack
          sx={{
            width: '100%'
          }}
        >
          <Typography variant="p">{player.playerName}</Typography>
          <Typography
            variant="p"
            sx={{
              fontWeight: 700
            }}
          >
            {player.score}
          </Typography>
        </Stack>
        <EmojiEvents
          sx={{
            color: 'var(--button-color)',
            fontSize: 50
          }}
        />
      </Stack>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-around',
          border: '2px solid var(--red-color)',
          display: isButtonShowed ? 'flex' : 'none'
        }}
      >
        <Add
          sx={{
            color: 'var(--green-color)',
            cursor: 'pointer'
          }}
          onClick={handleAddScore}
        />

        <Remove
          sx={{
            color: 'var(--red-color)',
            cursor: 'pointer'
          }}
          onClick={handleSubstractScore}
        />
      </Stack>
    </Stack>
  )
}

export default LeaderCard
