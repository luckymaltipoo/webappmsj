import * as admin from 'firebase-admin'
import { NextApiRequest } from 'next'

const verifyIdToken = (token) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => null)
}

export const loadIdToken = async (req) => {
  if (!req.cookies.token) return null
  const decoded = await verifyIdToken(req.cookies.token)
  if (!decoded) return null
  return decoded.uid
}
