import connectToDatabase from '../lib/mongodb.js'

export default async function handler (req, res) {
  try {
    const conn = await connectToDatabase()

    res.status(200).json({
      message: 'Serverless API is running',
      timestamp: new Date().toISOString(),
      mongodb: conn ? 'connected' : 'disconnected'
    })
  } catch (err) {
    console.error('Health check error:', err)
    res.status(500).json({ success: false, error: 'Health check failed' })
  }
}
