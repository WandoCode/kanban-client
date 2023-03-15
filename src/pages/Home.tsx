import Header from '../components/Home/Header/Header'
import { fetchUserDetails } from '../features/session/session.thunks'
import { useAppDispatch } from '../features/app.store'
import { useEffect } from 'react'
import Board from '../features/board/Board/Board'
import Sidebar from '../features/sidebar/Sidebar/Sidebar'
import { fetchUserBoards } from '../features/board/boards.thunk'
import useGetAppState from '../features/useGetAppState'

function Home() {
  const dispatch = useAppDispatch()
  const { userID } = useGetAppState()
  const mockUserId = 'userA'

  useEffect(() => {
    dispatch(fetchUserDetails(mockUserId))
  }, [])

  useEffect(() => {
    dispatch(fetchUserBoards())
  }, [userID])

  return (
    <div className="home">
      <Sidebar />
      <Header />
      <Board />
    </div>
  )
}

export default Home
