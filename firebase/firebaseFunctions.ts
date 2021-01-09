import { db, auth } from './firebase'
import { FirebaseUser } from '../types'

const getUsername = async (user: FirebaseUser) => {
    return db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
            return doc.data().name
        }
        return `Guest`
      })
      .catch(err => console.log(err))
}


export { getUsername }