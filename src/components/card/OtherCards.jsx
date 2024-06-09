import { Add, EmojiEvents, Remove } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ScoreChangerModal from '../modal/ScoreChangerModal'

const OtherCard = ({ player, rank }) => {
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
          border: '2px solid var(--black-color)',
          color: 'var(--black-color)',
          padding: 3
        }}
        direction={'row'}
        spacing={1}
      >
        <Typography
          variant="p"
          className="text-header"
          sx={{
            color: 'var(--black-color)'
          }}
        >
          #{rank}
        </Typography>
        <Avatar>{player.playerName?.substring(0, 1).toUpperCase()}</Avatar>
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
      </Stack>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: 'space-around',
          borderBottom: '2px solid var(--black-color)',
          borderLeft: '2px solid var(--black-color)',
          borderRight: '2px solid var(--black-color)',
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

export default OtherCard
