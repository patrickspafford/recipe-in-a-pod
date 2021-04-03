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

  async setProfilePhotoInStorage(file: File, uid: string) {
    const storageRef = this.storage.ref()
    const profilePhotoRef = storageRef.child(`profile-photos/${uid}`)
    await profilePhotoRef.put(file)
    return 'Successfully uploaded profile photo!'
  }

  async setRecipePhotoInStorage(file: File, uid: string, recipeId: string) {
    try {
      const storageRef = this.storage.ref()
      const profilePhotoRef = storageRef.child(
        `recipe-photos/${uid}/${recipeId}/${file.name}`,
      )
      await profilePhotoRef.put(file)
      return 'Successfully uploaded recipe photo'
    } catch (err) {
      console.error(err)
      return err
    }
  }

  async updateRecipePhotoInStorage(file: File, uid: string, recipeId: string) {
    try {
      const storageRef = this.storage.ref()
      const res: firebase.storage.ListResult = await storageRef
        .child(`recipe-photos/${uid}/${recipeId}/`)
        .listAll()
      for await (const photo of res.items) {
        await storageRef
          .child(`recipe-photos/${uid}/${recipeId}/${photo.name}`)
          .delete()
      }
      await storageRef
        .child(`recipe-photos/${uid}/${recipeId}/${file.name}`)
        .put(file)
      return 'Successfully uploaded recipe photo'
    } catch (err) {
      console.error(err)
      return err
    }
  }

  async getProfilePhoto(uid: string) {
    const storageRef = this.storage.ref()
    return storageRef
      .child(`profile-photos/${uid}`)
      .getDownloadURL()
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
    const response = await this.auth.signInWithEmailAndPassword(
      email,
      currentPassword,
    )
    const { user } = response
    const username = await this.getUsername(user)
    const profilePhotoLink = await this.getProfilePhoto(user.uid)
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
  }

  async getPublicPods() {
    try {
      interface IPodsDict {
        [k: string]: PodType
      }
      const podsDict: IPodsDict = {}
      const snapshots = await this.firestore.collection('recipes').get()
      snapshots.docs.forEach((doc) => {
        const recipe = doc.data()
        if (recipe.isPublic) {
          recipe.docId = doc.id
          podsDict[doc.id] = recipe as PodType
        }
      })
      const storageRef = this.storage.ref()
      const allRecipeFolders = await storageRef
        .child('recipe-photos/')
        .list({ maxResults: 10 })
      for await (const folder of allRecipeFolders.prefixes) {
        // recipe folders by user id (above)
        const recipePhotoFolders = await folder.list({ maxResults: 10 })
        for await (const subfolder of recipePhotoFolders.prefixes) {
          // recipe photo folders with 1 item (above)
          if (subfolder.name in podsDict) {
            // basically drilling down until we hit the photos
            const recipePhoto = await subfolder.listAll()
            podsDict[subfolder.name].photoLink = await recipePhoto.items[0]
              .getDownloadURL()
              .then((url: string) => url)
              .catch((err) => {
                console.error(err)
                return ''
              })
            const ratings = await this.firestore
              .collection('ratings')
              .where('recipeId', '==', podsDict[subfolder.name].docId)
              .get()
            if (ratings.empty) {
              podsDict[subfolder.name].rating = 3
            } else {
              let ratingSum = 0
              for (const doc of ratings.docs) {
                ratingSum += doc.data().rating
              }
              let ratingAverage = ratingSum / ratings.docs.length
              ratingAverage = Math.round(ratingAverage)
              podsDict[subfolder.name].rating = ratingAverage
            }
          }
        }
      }
      return Object.values(podsDict).filter((pod: PodType) => pod.photoLink)
    } catch (err) {
      console.error(err)
      return []
    }
  }

  async getPods(uid: string) {
    const pods: PodType[] = []
    await this.firestore
      .collection('recipes')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const recipe = doc.data()
          if (recipe.uid === uid) {
            recipe.docId = doc.id
            pods.push(recipe as PodType)
          }
        })
      })
      .catch((err) => console.error(err))
    const storageRef = this.storage.ref()
    for await (const pod of pods) {
      pod.photoLink = await storageRef
        .child(`recipe-photos/${uid}/${pod.docId}/`)
        .listAll()
        .then((res) =>
          res.items[0]
            .getDownloadURL()
            .then((url: string) => url)
            .catch((err) => {
              console.error(err)
              return ''
            }),
        )
        .catch((err) => {
          console.error(err)
          return ''
        })
      const ratings = await this.firestore
        .collection('ratings')
        .where('recipeId', '==', pod.docId)
        .get()
      if (ratings.empty) {
        pod.rating = 3
      } else {
        let ratingSum = 0
        for (const doc of ratings.docs) {
          ratingSum += doc.data().rating
        }
        let ratingAverage = ratingSum / ratings.docs.length
        ratingAverage = Math.round(ratingAverage)
        pod.rating = ratingAverage
      }
    }
    return pods
  }

  async getPod(docId: string) {
    const pod: PodType | string = await this.firestore
      .collection('recipes')
      .doc(docId)
      .get()
      .then((doc: firebase.firestore.DocumentSnapshot) => doc.data() as PodType)
      .catch((err) => {
        console.error(err)
        return 'No pod found'
      })
    if (typeof pod === 'string') {
      console.log('No pod found')
      return 'No pod found'
    }
    const storageRef = this.storage.ref()
    pod.photoLink = await storageRef
      .child(`recipe-photos/${pod.uid}/${docId}/`)
      .listAll()
      .then((res) =>
        res.items[0]
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
          }),
      )
      .catch((err) => {
        console.error(err)
        return ''
      })
    const ratings = await this.firestore
      .collection('ratings')
      .where('recipeId', '==', docId)
      .get()
    if (ratings.empty) {
      pod.rating = 3
    } else {
      let ratingSum = 0
      for (const doc of ratings.docs) {
        ratingSum += doc.data().rating
      }
      let ratingAverage = ratingSum / ratings.docs.length
      ratingAverage = Math.round(ratingAverage)
      pod.rating = ratingAverage
    }
    return pod
  }

  async createPod(pod: PodType) {
    const newPodDoc = this.firestore.collection('recipes').doc()
    return newPodDoc
      .set(pod)
      .then(() => {
        console.log(`Created pod successfully! ${newPodDoc.id}`)
        return newPodDoc.id
      })
      .catch((e) => console.error(e))
  }

  async updatePod(pod: PodType, docId: string) {
    try {
      const updatedPodDoc = this.firestore.collection('recipes').doc(docId)
      updatedPodDoc.update(pod)
      return updatedPodDoc.id
    } catch (e) {
      console.error(e)
      return e
    }
  }

  async deletePod(uid: string, docId: string) {
    try {
      await this.firestore.collection('recipes').doc(docId).delete()
      const ratingsSnapshots = await this.firestore
        .collection('ratings')
        .where('recipeId', '==', docId)
        .get()
      if (!ratingsSnapshots.empty) {
        for await (const ratingDoc of ratingsSnapshots.docs) {
          await ratingDoc.ref.delete()
        }
      }
      const storageRef = this.storage.ref()
      await storageRef
        .child(`recipe-photos/${uid}/${docId}/`)
        .listAll()
        .then(async (res) => {
          for await (const fileRef of res.items) {
            await fileRef.delete()
          }
        })
        .catch((err) => {
          console.error(err)
          throw err
        })
      console.log('Deleted pod successfully')
      return 'Deleted pod successfully'
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async ratePod(uid: string, docId: string, newRating: number) {
    try {
      if (!uid || !docId || !newRating) {
        throw new Error('Not enough info supplied!')
      }
      const existingRatings = await this.firestore
        .collection('ratings')
        .where('submittedBy', '==', uid)
        .where('recipeId', '==', docId)
        .get()
      if (!existingRatings.empty) {
        for await (const doc of existingRatings.docs) {
          await doc.ref.update({ rating: newRating })
        }
      } else {
        await this.firestore.collection('ratings').add({
          submittedBy: uid,
          recipeId: docId,
          rating: newRating,
        })
      }
      return 'Rated recipe successfully!'
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
