import Header from '../components/Home/Header/Header'
import { fetchUserById } from '../features/session/session.thunks'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../features/app.store'
import { useEffect } from 'react'
import { setCurrentBoard } from '../features/session/session.actions'
import Board from '../features/board/Board/Board'
import { fetchBoardDatasById } from '../features/board/board.thunk'
import Sidebar from '../features/sidebar/Sidebar/Sidebar'

function Home() {
  const dispatch = useAppDispatch()
  const userDatas = useAppSelector((state: RootState) => state.session)

  useEffect(() => {
    dispatch(fetchUserById(12))
    dispatch(setCurrentBoard(120))
    dispatch(fetchBoardDatasById(120))
  }, [])

  return (
    <div className="home">
      <Sidebar />
      <Header />
      <Board />
    </div>
  )
}

export default Home
