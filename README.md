# RapidAid - Emergency Crowdfunding Platform

RapidAid is a web-based platform designed to provide immediate financial support for individuals facing emergencies, such as medical crises. The platform connects verified users in need of funds with donors willing to contribute, ensuring transparency, trust, and efficiency in emergency crowdfunding.

## 🚀 Features

- **User Authentication & Verification**: Secure email login using Firebase Authentication with identity verification
- **Emergency Fund Requests**: Create and manage fund requests with real-time progress tracking
- **Donation System**: Direct donations from wallet with instant updates
- **Wallet Integration**: Personal wallet with Stripe/Razorpay payment processing
- **Request Verification**: Community verification system for building trust
- **Real-Time Updates**: Live donation tracking and progress bars
- **Notifications**: Alert system for funding updates and new requests

## 🛠️ Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Payment**: Stripe / Razorpay
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rapidaid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/):
   
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Enable Storage
   - Get your Firebase config
   
   Update `src/lib/firebase.ts` with your Firebase configuration:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

4. **Firestore Security Rules**
   
   Set up the following Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own user document
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Fund requests are readable by all authenticated users
       match /fundRequests/{requestId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null && request.auth.uid == resource.data.userId;
         allow update: if request.auth != null && request.auth.uid == resource.data.userId;
       }
       
       // Donations are readable by all authenticated users
       match /donations/{donationId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
       }
       
       // Notifications are readable by the user they belong to
       match /notifications/{notificationId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
       }
     }
   }
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   └── ProtectedRoute.tsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── lib/               # External library configurations
│   └── firebase.ts    # Firebase configuration
├── pages/             # Page components
│   ├── Home.tsx       # Landing page
│   ├── Login.tsx      # Login page
│   ├── Signup.tsx     # Registration page
│   ├── Dashboard.tsx  # User dashboard
│   ├── CreateRequest.tsx # Fund request creation
│   ├── RequestDetails.tsx # Request details view
│   ├── Wallet.tsx     # Wallet management
│   └── Profile.tsx    # User profile
├── types/             # TypeScript type definitions
│   └── index.ts       # Application types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```

4. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Advanced verification system
- [ ] Automated fraud detection
- [ ] Integration with more payment gateways

---

**RapidAid** - Making emergency financial support accessible, transparent, and efficient. 💙