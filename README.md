# 🌸 Companion Journal

**Your Personal AI Companion for Emotional Wellness**

A beautiful, responsive web application that provides a safe space for journaling with AI companions that offer emotional support, mood tracking, and personal insights. Built as a Progressive Web App (PWA) with modern web technologies.

![Companion Journal](https://img.shields.io/badge/Status-Live-brightgreen) ![PWA](https://img.shields.io/badge/PWA-Ready-blue) ![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-orange)

## ✨ Features

### 🤖 AI Companions
Choose from 5 unique AI companions, each with distinct personalities:
- **Luna** 🌙 - Supportive and empathetic
- **Sage** 🦉 - Wise and thoughtful mentor
- **Bloom** 🌸 - Playful and energetic
- **Zen** 🧘 - Calm and meditative
- **Echo** 🔍 - Reflective and analytical

### 📖 Smart Journaling
- Rich text editor with formatting tools
- AI-powered writing prompts
- Auto-save functionality
- Mood-based entry categorization
- Personal companion responses

### 📊 Mood Tracking & Analytics
- Visual mood tracking with emoji scales
- Emotion tagging system
- Interactive charts and trends
- Weekly and monthly insights
- Mood pattern analysis

### ✅ Task Planning
- Wellness-focused task management
- Priority-based organization
- Due date tracking
- Progress monitoring
- Integration with mood tracking

### 📱 Progressive Web App
- Offline functionality
- Mobile-responsive design
- App-like experience
- Installable on devices
- Service worker caching

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanyaprajapati155-collab/AI-companion-journal-.git
   cd AI-companion-journal-
   ```

2. **Start local server**
   ```bash
   # Using Python
   python3 -m http.server 3001
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:3001
   ```

3. **Open in browser**
   ```
   http://localhost:3001
   ```

### GitHub Pages Deployment

1. Go to repository **Settings** → **Pages**
2. Select **Deploy from a branch** → **main**
3. Your app will be available at:
   ```
   https://tanyaprajapati155-collab.github.io/AI-companion-journal-/
   ```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS custom properties
- **Vanilla JavaScript** - ES6+ features and classes
- **Chart.js** - Interactive data visualization
- **Inter Font** - Modern typography

### PWA Features
- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - Installable app experience
- **Responsive Design** - Mobile-first approach

### Design System
- **CSS Custom Properties** - Consistent theming
- **Dark/Light Mode** - Automatic theme switching
- **Component-based CSS** - Modular styling
- **Accessibility** - WCAG compliant

## 📁 Project Structure

```
companion-journal/
├── index.html          # Main application file
├── app.js             # JavaScript application logic
├── style.css          # Complete styling system
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
└── README.md         # Project documentation
```

## 🎨 Design Features

### Color System
- **Light Mode**: Cream and teal color palette
- **Dark Mode**: Charcoal and teal accents
- **Semantic Colors**: Success, error, warning, info states
- **Accessibility**: High contrast ratios

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System fonts
- **Responsive**: Fluid typography scaling

### Layout
- **Grid System**: CSS Grid and Flexbox
- **Responsive**: Mobile-first design
- **Container**: Max-width constraints
- **Spacing**: Consistent spacing scale

## 🔧 Core Functionality

### Application Architecture
```javascript
class CompanionJournalApp {
  constructor() {
    this.currentUser = null;
    this.currentScreen = 'landing';
    this.currentCompanion = null;
    this.entries = [];
    this.tasks = [];
    this.moods = [];
    this.companions = [];
    this.charts = {};
  }
}
```

### Data Management
- **Local Storage**: Persistent user data
- **State Management**: Centralized application state
- **Data Validation**: Input sanitization
- **Auto-save**: Real-time data persistence

### Screen Management
- **Single Page Application**: Dynamic screen switching
- **Navigation**: Smooth transitions
- **State Persistence**: Maintains user context
- **Responsive Navigation**: Mobile-optimized

## 📊 Data Visualization

### Charts & Analytics
- **Mood Trends**: Line charts with Chart.js
- **Activity Patterns**: Bar charts for journaling frequency
- **Mood Distribution**: Doughnut charts for mood analysis
- **Interactive**: Hover effects and animations

### Insights Generation
- **Pattern Recognition**: Mood trend analysis
- **Progress Tracking**: Streak counting
- **Goal Achievement**: Task completion metrics
- **Personalized**: Companion-specific insights

## 🔒 Privacy & Security

### Data Protection
- **Local Storage Only**: No server-side data storage
- **Client-Side Processing**: All data stays on device
- **No Tracking**: No analytics or user tracking
- **Offline First**: Works without internet connection

### User Control
- **Data Export**: Download personal data
- **Account Deletion**: Complete data removal
- **Privacy Settings**: Granular control options
- **Transparent**: Open source code

## 📱 Mobile Experience

### Responsive Design
- **Mobile First**: Optimized for small screens
- **Touch Friendly**: Large tap targets
- **Gesture Support**: Swipe navigation
- **Performance**: Optimized for mobile devices

### PWA Features
- **Install Prompt**: Add to home screen
- **Offline Mode**: Works without internet
- **App-like UI**: Native app experience
- **Push Notifications**: Ready for implementation

## 🎯 User Journey

### Onboarding Flow
1. **Landing Page** - Feature overview and pricing
2. **Authentication** - Sign up or sign in
3. **Companion Selection** - Choose AI personality
4. **Preferences** - Customize experience
5. **Dashboard** - Start journaling

### Daily Usage
1. **Mood Check-in** - Track daily emotions
2. **Journal Entry** - Write with AI prompts
3. **Task Management** - Plan wellness activities
4. **Analytics Review** - View insights and trends
5. **Companion Chat** - Interactive conversations

## 🔮 Future Enhancements

### Planned Features
- **Voice Journaling** - Audio entry support
- **Advanced AI** - GPT integration
- **Social Features** - Community sharing
- **Export Options** - PDF and CSV export
- **Themes** - Additional color schemes

### Technical Improvements
- **Backend Integration** - User accounts and sync
- **Real-time Sync** - Multi-device support
- **Advanced Analytics** - Machine learning insights
- **API Integration** - Third-party wellness apps

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- **Code Style**: Follow existing patterns
- **Testing**: Test on multiple devices
- **Documentation**: Update README if needed
- **Accessibility**: Maintain WCAG compliance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Chart.js** - Data visualization library
- **Google Fonts** - Inter font family
- **CSS Custom Properties** - Modern CSS theming
- **PWA Standards** - Progressive Web App guidelines

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: Report bugs and feature requests
- **Discussions**: Community discussions
- **Email**: Contact the maintainers

---

**Made with ❤️ for emotional wellness and personal growth**

*Companion Journal - Where your diary talks back* 🌸