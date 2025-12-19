import connectToDatabase from '../../../lib/mongodb.js'
import Contact from '../../../backend/models/Contact.js'

export default async function handler (req, res) {
  await connectToDatabase()

  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const contact = await Contact.findById(id).select('-__v')
      if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' })
      return res.json({ success: true, data: contact })
    } catch (err) {
      console.error('Get contact error:', err)
      return res.status(500).json({ success: false, message: 'Failed to fetch contact' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body
      if (!['new', 'read', 'replied'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' })
      }

      const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true })
      if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' })

      return res.json({ success: true, data: contact })
    } catch (err) {
      console.error('Update contact error:', err)
      return res.status(500).json({ success: false, message: 'Failed to update contact' })
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
