import connectToDatabase from '../../../lib/mongodb.js'
import Contact from '../../../backend/models/Contact.js'
import { sendWhatsAppMessage } from '../../../backend/services/whatsapp.js'

export default async function handler (req, res) {
  await connectToDatabase()

  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields' })
      }

      const contactData = new Contact({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        subject: subject.trim(),
        message: message.trim(),
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent']
      })

      const savedContact = await contactData.save()

      // Send notification if configured
      if (process.env.TWILIO_WHATSAPP_NUMBER) {
        try {
          await sendWhatsAppMessage(process.env.TWILIO_WHATSAPP_NUMBER, `🔔 New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`)
        } catch (err) {
          console.error('WhatsApp notify failed:', err)
        }
      }

      res.status(201).json({ success: true, message: 'Thank you for your message!', contactId: savedContact._id })
    } catch (error) {
      console.error('Contact form error:', error)
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(e => e.message)
        return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors })
      }
      res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' })
    }

  } else if (req.method === 'GET') {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 20
      const status = req.query.status

      const filter = status ? { status } : {}

      const contacts = await Contact.find(filter).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).select('-__v')
      const total = await Contact.countDocuments(filter)

      res.json({ success: true, data: { contacts, currentPage: page, totalPages: Math.ceil(total / limit), totalContacts: total } })
    } catch (err) {
      console.error('Get contacts error:', err)
      res.status(500).json({ success: false, message: 'Failed to fetch contacts' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
