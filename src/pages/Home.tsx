import Header from '../components/Home/Header/Header'
import Menu from '../components/Home/Menu'
import { fetchUserById } from '../features/session/session.thunks'
import { useSelector } from 'react-redux/es/exports'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../features/app.store'
import { useEffect } from 'react'

function Home() {
  const dispatch = useAppDispatch()
  const userDatas = useAppSelector((state: RootState) => state.session)

  useEffect(() => {
    console.log(userDatas)
  }, [userDatas])

  useEffect(() => {
    dispatch(fetchUserById(12))
  }, [])

  return (
    <div className="home">
      <Header />
      <Menu />
    </div>
  )
}

export default Home
