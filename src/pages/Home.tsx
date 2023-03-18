import Header from '../components/Home/Header/Header'
import { fetchUserDetails } from '../features/session/session.thunks'
import { useAppDispatch, useAppSelector } from '../features/app.store'
import { useEffect } from 'react'
import Board from '../features/board/Board/Board'
import Sidebar from '../features/sidebar/Sidebar/Sidebar'
import { fetchUserBoards } from '../features/board/boards.thunk'
import FloatingShowSidebar from '../features/sidebar/FloatingShowSidebar'

function Home() {
  const dispatch = useAppDispatch()
  const { userID, boardsShort } = useAppSelector((s) => s.session)

  useEffect(() => {
    if (userID) {
      dispatch(fetchUserDetails(userID))
      dispatch(fetchUserBoards())
    }
  }, [userID])

  useEffect(() => {
    if (boardsShort) {
      dispatch(fetchUserBoards())
    }
  }, [boardsShort])

  return (
    <div className="home">
      <FloatingShowSidebar />

      <Sidebar />
      <Header />
      <Board />
    </div>
  )
}

export default Home
