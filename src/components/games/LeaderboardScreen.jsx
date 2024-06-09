import { Stack, Typography } from '@mui/material'
import LeaderCard from '../card/LeaderCard'
import OtherCard from '../card/OtherCards'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StyledButtonAlt from '../button/StyledButtonAlt'
import Whitespace from '../common/Whitespace'
import NextRoundModal from '../modal/NextRoundModal'
import { ref, update } from 'firebase/database'
import { database, useFirebase } from '../../utils/firebase'

const LeaderboardScreen = () => {
  const teamId = localStorage.getItem('teamId')
  const team_ref = ref(database, `games/${teamId}`)
  const team = useFirebase(team_ref)

  const initialPlayers = team?.players || []

  const navigate = useNavigate()
  const [leaderboardData, setLeaderboardData] = useState([...initialPlayers])
  const [openNextRoundModal, setOpenNextRoundModal] = useState(false)
  const [isFinisihed, setIsFinished] = useState(false)
  const [endCondition, setEndCondition] = useState('')

  useEffect(() => {
    setLeaderboardData([...initialPlayers]?.sort((a, b) => b.score - a.score))
    // const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
    // setLeaderboardData(sortedData);

    initialPlayers?.map((player, index) => {
      if (player.score >= 500) {
        setIsFinished(true)
        setEndCondition('win')
        return
      }

      if (player.score <= -500) {
        setIsFinished(true)
        setEndCondition('lose')
        return
      }
    })
  }, [team])

  const handleNextRound = () => {
    if (isFinisihed) {
      update(team_ref, {
        isFinisihed: true,
        endCondition
      })

      navigate(`/${teamId}/end`)
      return
    }
    setOpenNextRoundModal(true)
  }

  return (
    <Stack p={3}>
      <Typography variant="p" className="text-header">
        Leaderboard
      </Typography>
      <Typography variant="p">Current Round: {team?.round || 1}</Typography>

      <Whitespace height={20} />

      <Stack
        sx={{
          height: '65vh',
          overflowY: 'scroll'
        }}
        spacing={3}
      >
        {leaderboardData?.map((player, index) => {
          return index === 0 ? (
            <LeaderCard key={index} player={player} />
          ) : (
            <OtherCard key={index} player={player} rank={index + 1} />
          )
        })}
      </Stack>

      <StyledButtonAlt handleEvent={handleNextRound}>
        {isFinisihed ? 'Finish' : 'Next Round'}
      </StyledButtonAlt>
      <NextRoundModal
        open={openNextRoundModal}
        handleClose={() => setOpenNextRoundModal(false)}
      />
    </Stack>
  )
}

export default LeaderboardScreen
