const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const CONTACTS_FILE = path.join(__dirname, 'contacts.xlsx');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for contact submissions
const contactMessages = [];

// Projects data
const projects = [
  {
    id: 1,
    title: 'Chatbot',
    description: 'An AI chatbot with openai and gemini api with reactjs and nodejs',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'fullstack',
    github: 'https://github.com/Angel-Danison/mini-bookstore.git',
    live: 'https://github.com/Angel-Danison/mini-bookstore',
  },
  {
    id: 2,
    title: 'Game Developer Portfolio',
    description: 'Portfolio for a game developer. Using technologies like React, JWT, Node.js, Express.',
    image: '/game-portfolio.png',
    tags: ['React', 'JWT', 'Node.js', 'Express'],
    category: 'fullstack',
    github: 'https://github.com/Angel-Danison/gamerport.git',
    live: 'https://princejhaaportfolio.netlify.app/',
  },
  {
    id: 3,
    title: 'User Management CRUD App',
    description: 'A full-stack CRUD application for managing users with a beautiful UI. Built with React and Node.js.',
    image: '/node-crud.jpg',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    category: 'fullstack',
    github: 'https://github.com/Angel-Danison/node-crud.git',
    live: '#',
  },
  {
    id: 4,
    title: 'Mini bookstore',
    description: 'A mini bookstore with fictional and non fictional books.',
    image: 'https://wpastra.com/wp-content/uploads/2022/09/book-store-starter-template-featured-section.jpeg',
    tags: ['Node.js', 'Express'],
    category: 'nodejs',
    github: 'https://github.com/Angel-Danison/mini-bookstore.git',
    live: '#',
  },
  {
    id: 5,
    title: 'Web Simon Go Game',
    description: 'Web based Simon Go Game',
    image: '/output.png',
    tags: ['Next.js'],
    category: 'fullstack',
    github: 'https://github.com/Angel-Danison/Simon-go-game.git',
    live: '#',
  },
  {
    id: 6,
    title: 'Web Drumkit',
    description: 'Web based drumkit using html,css and javascript',
    image: '/output (1).png',
    tags: ['html', 'css', 'javascript'],
    category: 'react',
    github: 'https://github.com/Angel-Danison/-Interactive-Drum-Kit.git',
    live: '#',
  },
];

// GET projects
app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: projects });
});

// POST contact form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.',
    });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject: subject || 'No Subject',
    message,
    createdAt: new Date().toISOString(),
  };

  contactMessages.push(newMessage);

  // Excel Data Collection
  try {
    let workbook;
    let worksheet;
    const excelData = [{
      ID: newMessage.id,
      Date: newMessage.createdAt,
      Name: newMessage.name,
      Email: newMessage.email,
      Subject: newMessage.subject,
      Message: newMessage.message
    }];

    if (fs.existsSync(CONTACTS_FILE)) {
      workbook = XLSX.readFile(CONTACTS_FILE);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
      XLSX.utils.sheet_add_json(worksheet, excelData, { skipHeader: true, origin: -1 });
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet(excelData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    }

    XLSX.writeFile(workbook, CONTACTS_FILE);
    console.log('Saved to Excel:', CONTACTS_FILE);
  } catch (err) {
    console.error('Error saving to Excel:', err);
  }

  res.json({
    success: true,
    message: 'Thank you! Your message has been sent successfully. (Excel Data Collected)',
  });
});

// GET download Excel (Secret link for owner)
app.get('/api/contact/download', (req, res) => {
  if (fs.existsSync(CONTACTS_FILE)) {
    res.download(CONTACTS_FILE, 'contacts.xlsx');
  } else {
    res.status(404).json({ success: false, error: 'No contacts file found yet.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
