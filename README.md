# 📝 Notes Manager

A modern, responsive web application for managing personal, work, and financial notes built with Next.js and TypeScript.

## ✨ Features

- 📊 Dashboard with note statistics
- 🎯 CRUD operations for notes
- 🏷️ Note categorization (Personal, Work, Finances, Others)
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Fast performance

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Font:** Outfit (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v8+ recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Toussaint-Manzi/simple-notes-app-frontend.git
cd simple-notes-app-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
notes-manager/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AddNoteModal.tsx
│   ├── DeleteConfirmationModal.tsx
│   ├── NoteCard.tsx
│   ├── Statistics.tsx
│   └── UpdateNoteModal.tsx
├── redux/
│   ├── provider.tsx
│   └── store.ts
├── services/
│   └── notes.ts
└── utils/
    └── axios.ts
```

## 💻 Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for static type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting capabilities
- All contributors who participate in this project
