import { Layout } from '../../components'
import { useAuth } from '../../hooks/useAuth'

const ProfilePage = () => {
  const auth = useAuth()

  return (
    <Layout title={auth.username || 'Username Not Found'}>
      {auth.loggedIn ? 'Profile Page' : 'Nope'}
      <form>
        <input type="file" name="Profile Photo" />
        <input type="submit" name="submit" />
      </form>
    </Layout>
  )
}

export default ProfilePage
