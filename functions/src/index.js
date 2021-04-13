/* eslint-disable @typescript-eslint/no-var-requires */
const { https } = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('../recipeinapod-cf37c-firebase-adminsdk-yfhqi-2f3331f210.json')

// Admin initialization for testing with emulator
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

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

/*

exports.createUserCourt = https.onCall(async (data, context) => {
    const { name, serial, password } = data
    const adminFirestore = admin.firestore()
    const db = admin.database()

    const courtSnapshot = await adminFirestore
        .collection('courts')
        .where('serial', '==', serial)
        .get()

    if (courtSnapshot.docs.length > 0) {
        const { password: courtPassword } = courtSnapshot.docs[0].data()
        if (password === courtPassword) {
            const userCourt = {
                courtName: name,
                courtSerial: serial,
                userId: context.auth.uid,
            }
            const existingCourtWithSerial =
                await adminFirestore.collection('userCourts')
                    .where('courtSerial', '==', serial)
                    .where('userId', '==', context.auth.uid)
                    .get()
            if (existingCourtWithSerial.docs.length > 0) {
                throw new https.HttpsError(
                    'permission-denied',
                    `Sorry, you already have this court (${serial}) in your collection.`
                )
            }
            const existingCourtWithSameName =
                await adminFirestore.collection('userCourts')
                    .where('courtName', '==', name)
                    .where('userId', '==', context.auth.uid)
                    .get()
            if (existingCourtWithSameName.docs.length > 0) {
                throw new https.HttpsError(
                    'permission-denied',
                    `Sorry, you already have a court named "${name}" in your collection.`
                )
            }
            await adminFirestore.collection('userCourts').add(userCourt)
            const courtUsers = await getCourtUsers(serial)

            // Add permission to realtime db
            let courtUserStrings = courtUsers.join(',')
            let ref = db.ref(`courts/${serial}`)
            await ref.set(courtUserStrings)
        } else {
            throw new https.HttpsError(
                'permission-denied',
                'Sorry, there is no court with that serial and password.',
            )
        }
    } else {
        throw new https.HttpsError(
            'permission-denied',
            'Sorry, there is no court with that serial and password.',
        )
    }
    return true
})
*/
/*
export const editPod = https.onCall(async (data, context) => {})
export const removePod = https.onCall(async (data, context) => {})
export const ratePod = https.onCall(async (data, context) => {})
*/
