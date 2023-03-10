import Header from '../components/Home/Header/Header'
import { fetchUserDetails } from '../features/session/session.thunks'
import { useAppDispatch, useAppSelector } from '../features/app.store'
import { useEffect } from 'react'
import Board from '../features/board/Board/Board'
import Sidebar from '../features/sidebar/Sidebar/Sidebar'
import { fetchUserBoards } from '../features/board/boards.thunk'

function Home() {
  const dispatch = useAppDispatch()
  const { boardsShort, userID } = useAppSelector((state) => state.session)
  const mockUserId = 'userA'

  useEffect(() => {
    dispatch(fetchUserDetails(mockUserId))
  }, [])

  useEffect(() => {
    dispatch(fetchUserBoards())
  }, [boardsShort, userID])

  return (
    <div className="home">
      <Sidebar />
      <Header />
      <Board />
    </div>
  )
}

export default Home
