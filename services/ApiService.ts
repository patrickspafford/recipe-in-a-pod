/* eslint-disable no-restricted-syntax */
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import cookie from 'js-cookie'
import initFirebase from '../firebase/initFirebase'
import { FirebaseUser, UserCookie, PodType } from '../types'

export default class ApiService {
    private firestore: firebase.firestore.Firestore

    private storage: firebase.storage.Storage

    public auth: firebase.auth.Auth

    constructor() {
      initFirebase()
      this.firestore = firebase.firestore()
      this.auth = firebase.auth()
      this.storage = firebase.storage()
    }

    async createUser(firebaseUser: FirebaseUser) {
      return this.firestore
        .collection('users')
        .doc(firebaseUser.uid)
        .set(firebaseUser)
        .then(() => {
          console.log('Created user successfully')
          return firebaseUser
        })
        .catch((error) => error)
    }

    async getUsername(userToGet: any) {
      return this.firestore
        .collection('users')
        .doc(userToGet.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const foundUsername = doc.data().name
            return foundUsername
          }
          const usernameNotFound = ''
          return usernameNotFound
        })
        .catch((err) => console.error(err))
    }

    async usernameAlreadyExists(username: string) {
      let alreadyExists = false
      await this.firestore
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().name === username) {
              alreadyExists = true
            }
          })
        })
      return alreadyExists
    }

    async setProfilePhotoInStorage(file: File, username: string) {
      const storageRef = this.storage.ref()
      const profilePhotoRef = storageRef.child(
        `profile-photos/${username}`,
      )
      await profilePhotoRef.put(file)
      return 'Successfully uploaded profile photo!'
    }

    async getProfilePhoto(username: string) {
      const storageRef = this.storage.ref()
      return storageRef.child(`profile-photos/${username}`).getDownloadURL()
        .then((url) => {
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          // eslint-disable-next-line no-unused-vars
          xhr.onload = (_e) => {
            // eslint-disable-next-line no-unused-vars
            const blob = xhr.response
          }
          xhr.open('GET', url)
          xhr.send()
          return url
        })
        .then((profilePhoto) => profilePhoto)
        .catch((err) => console.error(err))
    }

    async signUp({ name, email, currentPassword }) {
      if (await this.usernameAlreadyExists(name)) {
        throw new Error(`Username ${name} already exists.`)
      } else {
        const response = await this.auth.createUserWithEmailAndPassword(
          email,
          currentPassword,
        )
        await this.auth.currentUser.sendEmailVerification()
        console.log('Created user successfully')
        await this.createUser({ uid: response.user.uid, email, name })
        console.log('Created username successfully')
        const newUsername: string = await this.getUsername(response.user)
        const { uid } = response.user
        const xa = await response.user.getIdToken()
        const userEmail = response.user.email
        const userData: UserCookie = {
          id: uid,
          email: userEmail,
          token: xa,
          username: newUsername,
          profilePhotoLink: '',
        }
        cookie.set('auth', userData, {
          expires: 1,
        })
      }
    }

    async sendForgotPasswordEmail({ email }) {
      const sentEmailSuccessfully = await this.auth
        .sendPasswordResetEmail(email)
        .then(() => true)
        .catch((err) => {
          console.error(err)
          return false
        })
      return sentEmailSuccessfully
    }

    async signIn({ email, currentPassword }) {
      try {
        const response = await this.auth.signInWithEmailAndPassword(email, currentPassword)
        const { user } = response
        const username = await this.getUsername(user)
        const profilePhotoLink = await this.getProfilePhoto(username)
        const xa = await user.getIdToken()
        const { uid } = user
        const userData: UserCookie = {
          id: uid,
          email: user.email,
          token: xa,
          username,
          profilePhotoLink,
        }
        cookie.set('auth', userData, {
          expires: 1,
        })
        return 'Signed in successfully'
      } catch (e) {
        console.error(e)
        return e
      }
    }

    async getPods(uid: string) {
      const pods: PodType[] = []
      await this.firestore.collection('recipes')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const recipe = doc.data()
            if (recipe.uid === uid) {
              recipe.docId = doc.id
              pods.push((recipe as PodType))
            }
          })
        })
        .catch((err) => console.error(err))
      const storageRef = this.storage.ref()
      for (const pod of pods) {
        // eslint-disable-next-line no-await-in-loop
        pod.photoLink = await storageRef.child(`recipe-photos/${uid}/${pod.docId}/`)
          .listAll()
          .then((res) => res.items[0]
            .getDownloadURL()
            .then((url: string) => {
              const xhr = new XMLHttpRequest()
              xhr.responseType = 'blob'
              // eslint-disable-next-line no-unused-vars
              xhr.onload = (_e) => {
              // eslint-disable-next-line no-unused-vars
                const blob = xhr.response
              }
              xhr.open('GET', url)
              xhr.send()
              return url
            })
            .catch((err) => {
              console.error(err)
              return ''
            }))
          .catch((err) => {
            console.error(err)
            return ''
          })
      }
      return pods
    }
}
