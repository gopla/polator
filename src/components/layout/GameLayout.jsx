import { ref } from 'firebase/database'
import { Outlet, useParams } from 'react-router-dom'
import { database, useFirebase } from '../../utils/firebase'

const GameLayout = () => {
  const { teamId } = useParams()

  const game_ref = ref(database, `games`)
  const games = useFirebase(game_ref)

  const team_ref = ref(database, `games/${teamId}`)
  const team = useFirebase(team_ref)

  return <Outlet context={[team, team_ref, games, game_ref]} />
}

export default GameLayout
