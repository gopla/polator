import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import StyledButton from "../button/StyledButton";
import { update } from "firebase/database";
import Whitespace from "../common/Whitespace";

const JokerSelector = () => {
  const [team, team_ref] = useOutletContext()
  const [jokerType, setJokerType] = useState(team?.jokerType || 'fixed') // fixed, random, increment

  const handleJokerType = (e, type) => {
    setJokerType(type)
    update(team_ref, {
      ...team,
      jokerType: type
    })
  }

  return (
    <Stack p={3}>
      <Typography variant="p" className="text-header">
        Joker
      </Typography>
      <Typography variant="p">Current Round: {team?.round || 1}</Typography>

      <Whitespace height={20} />

      <Stack
        sx={{
          height: '69vh',
          overflowY: 'scroll'
        }}
        spacing={3}
      >
        <Stack direction="row" sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}>
          <Typography
            variant="p"
            onClick={(e) => handleJokerType(e, 'fixed')}
            sx={{ cursor: 'pointer', color: jokerType === 'fixed' ? 'var(--red-color)' : 'var(--black-color)', textAlign: 'center' }}
          >
            Fixed
          </Typography>
          <Typography
            variant="p"
            onClick={(e) => handleJokerType(e, 'random')}
            sx={{ cursor: 'pointer', color: jokerType === 'random' ? 'var(--red-color)' : 'var(--black-color)', textAlign: 'center' }}
          >
            Random
          </Typography>
          <Typography
            variant="p"
            onClick={(e) => handleJokerType(e, 'increment')}
            sx={{ cursor: 'pointer', color: jokerType === 'increment' ? 'var(--red-color)' : 'var(--black-color)', textAlign: 'center' }}
          >
            Increment
          </Typography>
        </Stack>

        {jokerType === 'fixed' && (
          <FixedJoker />
        )}

        {jokerType === 'random' && (
          <RandomJoker team={team} team_ref={team_ref} />
        )}

        {jokerType === 'increment' && (
          <IncrementJoker team={team} team_ref={team_ref} />
        )}
      </Stack>

  

      

    </Stack>
  )
}

const FixedJoker = () => {
  return (
    <Stack sx={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography variant="p" sx={{
        fontSize: 72,
        textAlign: 'center',
        fontWeight: 700,
        margin: '50% auto',
      }}>
        Joker
      </Typography>
    </Stack>
  )
}

const RandomJoker = ({team, team_ref}) => {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const [joker, setJoker] = useState(team?.joker || '')

  const getRandomCard = () => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)]
    setJoker(`${randomCard}`)
    update(team_ref, {
      ...team,
      joker: randomCard
    })
    return
  }

  useEffect(() => {
    joker === '' && getRandomCard()
  }, [])

  return (
    <Stack sx={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography variant="p" sx={{
        fontSize: 72,
        textAlign: 'center',
        fontWeight: 700,
        margin: '50% auto',
      }}>
        {joker}
      </Typography>
      <StyledButton handleEvent={getRandomCard}>Random Joker</StyledButton>
    </Stack>
  )
}

const IncrementJoker = ({ team, team_ref }) => {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const [joker, setJoker] = useState(cards[0])

  const incrementJoker = () => {
    const currentIndex = cards.indexOf(joker)
    const nextIndex = currentIndex + 1
    const nextJoker = nextIndex >= cards.length ? cards[0] : cards[nextIndex]
    setJoker(nextJoker)
    update(team_ref, {
      ...team,
      joker: nextJoker
    })
    return
  }

  return (
    <Stack sx={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography variant="p" sx={{
        fontSize: 72,
        textAlign: 'center',
        fontWeight: 700,
        margin: '50% auto',
      }}>
        {joker}
      </Typography>
      <StyledButton handleEvent={incrementJoker}>Increment Joker</StyledButton>
    </Stack>
  )
}

export default JokerSelector;