import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not set. Some API features will be disabled.')
}

let cached = global._mongoClientPromise

if (!cached) {
  cached = global._mongoClientPromise = { conn: null, promise: null }
}

export async function connectToDatabase () {
  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    return null
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // Mongoose 7 removed these but keeping for compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((mongooseInstance) => mongooseInstance)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectToDatabase
