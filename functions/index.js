/* eslint-disable @typescript-eslint/no-var-requires */
const { https } = require('firebase-functions')
const admin = require('firebase-admin')
const server = require('./server')
const serviceAccount = require('../recipeinapod-cf37c-firebase-adminsdk-yfhqi-2f3331f210.json')

// Admin initialization for testing with emulator
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'recipeinapod-cf37c.appspot.com',
  })
}

exports.getPodPreview = https.onCall(async (data) => {
  const { podDocId } = data
  const pod = await admin.firestore().collection('recipes').doc(podDocId).get()
  if (!pod.exists) {
    throw new https.HttpsError('not-found', 'Could not find that pod preview.')
  }
  const podData = pod.data()
  let description = 'Ingredients: '
  podData.ingredients.forEach((ingred, i) => {
    if (i < 5) {
      description = description.concat(`${ingred.amount} of ${ingred.name}, `)
    }
  })
  description = description.concat('...')
  const podPhotoFiles = await admin
    .storage()
    .bucket('recipeinapod-cf37c.appspot.com')
    .getFiles({
      prefix: 'recipe-photos',
    })
  let photoLink = ''
  podPhotoFiles[0].forEach((file) => {
    if (file && file.name.includes(podDocId)) {
      photoLink = file.publicUrl()
    }
  })
  return {
    image: photoLink,
    overrideTitle: podData.name,
    description,
  }
  // console.log(podPhotoFiles[0].forEach((file) => console.log(file.name)))
  /*
  const publicPodLink = podPhotoFiles[0].publicUrl()
  return {
    image: publicPodLink,
    overrideTitle: podData.name,
    description,
  }
  */
})

exports.usernamePageExists = https.onCall(async (data) => {
  const { username, userId } = data
  if (!userId || !username) {
    throw new https.HttpsError(
      'invalid-argument',
      'Please provide both a user id and a username.',
    )
  }
  const usernameExistsForUserDocs = await admin
    .firestore()
    .collection('users')
    .where('uid', '==', userId)
    .where('name', '==', username)
    .get()
  return !usernameExistsForUserDocs.empty
})

exports.userMatchesRecipe = https.onCall(async (data) => {
  const { userId, recipeId } = data
  if (!userId || !recipeId) {
    throw new https.HttpsError(
      'invalid-argument',
      'Please provide both a user id and a recipe id.',
    )
  }
  const matchingRecipe = await admin
    .firestore()
    .collection('recipes')
    .doc(recipeId)
    .get()
  if (matchingRecipe.empty) return false
  const recipeData = matchingRecipe.data()
  return recipeData.uid === userId
})

exports.server = server.serverFunc
