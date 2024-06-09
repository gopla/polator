import { Box, Stack, Typography } from '@mui/material'
import assets from '../assets'
import StyledButton from '../components/button/StyledButton'
import Whitespace from '../components/common/Whitespace'
import StyledButtonAlt from '../components/button/StyledButtonAlt'
import { v4 as uuid } from 'uuid'
import { ref, set } from 'firebase/database'
import { database } from '../utils/firebase'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const teamId = uuid()

  const team_ref = ref(database, `games/${teamId}`)

  const handleSubmit = () => {
    localStorage.setItem('teamId', teamId)
    set(team_ref, {
      teamId,
      date: format(new Date(), 'dd-MM-yyyy'),
      time: format(new Date(), 'HH:mm:ss'),
      round: 1,
      isFinisihed: false
    })

    navigate(`/${teamId}/setPlayer`)
  }

  const handleToHistory = () => {
    navigate('/history')
  }

  return (
    <Stack
      px={3}
      gap={7}
      sx={{
        alignItems: 'center',
        height: '80vh'
      }}
    >
      <Whitespace height={30} />
      <Typography variant="p" className="text-header">
        Card Score
      </Typography>

      <Box
        component={'img'}
        src={assets.images.homeImage}
        sx={{
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          objectFit: 'contain'
        }}
      />
      <Whitespace height={30} />

      <Stack
        sx={{
          width: '100%',
          gap: 2
        }}
      >
        <StyledButton handleEvent={handleSubmit}>Start</StyledButton>
        <StyledButtonAlt handleEvent={handleToHistory}>History</StyledButtonAlt>
      </Stack>
    </Stack>
  )
}

export default Home
