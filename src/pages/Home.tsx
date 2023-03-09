import Header from '../components/Home/Header/Header'
import { fetchUserById } from '../features/session/session.thunks'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../features/app.store'
import { useEffect } from 'react'
import { setCurrentBoard } from '../features/session/session.actions'
import Board from '../features/session/Board/Board'

import Sidebar from '../features/sidebar/Sidebar/Sidebar'

function Home() {
  const dispatch = useAppDispatch()
  const mockUserId = 12

  useEffect(() => {
    dispatch(fetchUserById(mockUserId))
    // dispatch(setCurrentBoard(120))
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
