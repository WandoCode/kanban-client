import Header from '../components/Home/Header/Header'
import Menu from '../components/Home/Menu'
import { fetchUserById } from '../features/session/session.thunks'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../features/app.store'
import { useEffect } from 'react'
import { setCurrentBoard } from '../features/session/session.actions'
import Board from '../components/Home/Board/Board'

function Home() {
  const dispatch = useAppDispatch()
  const userDatas = useAppSelector((state: RootState) => state.session)

  useEffect(() => {
    dispatch(fetchUserById(12))
    dispatch(setCurrentBoard(120))
  }, [])

  return (
    <div className="home">
      <Menu />
      <Header />
      <Board />
    </div>
  )
}

export default Home
