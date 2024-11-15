# SwipDev 🔥

SwipDev is an AI-powered freelancing platform that connects Filipino developers with global opportunities through an intuitive, Tinder-like interface. Our platform simplifies the hiring process by matching the right developers with the right projects.

## 🚀 Features

### For Employers
- AI-powered project description generation
- Intuitive swipe interface for developer selection
- Automated project task breakdown
- Integrated video interviews
- Smart matching algorithm
- Kanban board project management

### For Developers
- Professional profile showcasing
- Skill-based matching
- Project recommendations
- Integrated scheduling system
- Portfolio highlighting
- Real-time availability updates

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase
- **AI Integration**: OpenAI/Claude API
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Real-time**: Supabase Realtime
- **Meeting Integration**: Google Meet API

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Supabase account
- OpenAI API key (for AI features)
- Google Cloud Console account (for Meet integration)

## ⚙️ Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/swipdev.git
cd swipdev
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
swipdev/
├── app/                  # Next.js app directory
├── components/           # Reusable components
├── lib/                  # Utility functions and helpers
├── hooks/               # Custom React hooks
├── store/               # Zustand store configurations
├── styles/              # Global styles and Tailwind config
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── tests/               # Test files
```

## 🔐 Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `OPENAI_API_KEY` | OpenAI API key for AI features |
| `GOOGLE_OAUTH_CLIENT_ID` | Google OAuth client ID |

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
```

## 🚀 Deployment

The application can be deployed on Vercel:

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Filipino Developer Community
- Tinder for interface inspiration
- OpenAI/Anthropic for AI capabilities
- All our contributors and supporters

## 📧 Contact

- Email: support@swipdev.com
- Twitter: [@SwipDev](https://twitter.com/swipdev)
- Website: [https://swipdev.com](https://swipdev.com)

## 📊 Status

![Build Status](https://img.shields.io/github/workflow/status/yourusername/swipdev/CI)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

---
Made with ❤️ for Filipino Developers
