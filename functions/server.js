/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('firebase-admin')
const { https } = require('firebase-functions')
const next = require('next')
const serviceAccount = require('../recipeinapod-cf37c-firebase-adminsdk-yfhqi-2f3331f210.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

// const isDev = process.env.NODE_ENV !== 'production'

const server = next({
  conf: {
    dev: false,
    distDir: '.next',
  },
})
const handle = server.getRequestHandler()
exports.serverFunc = https.onRequest((req, res) => {
  server.prepare().then(() => handle(req, res))
})
