# RapidAid Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Firebase project with Authentication, Firestore, and Storage enabled
- Stripe account for payment processing
- Domain name (optional)

### 1. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "rapidaid"
3. Enable the following services:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Storage**

#### Configure Firestore Security Rules
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
    
    // Wallet transactions are readable by the user they belong to
    match /walletTransactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Notifications are readable by the user they belong to
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

#### Configure Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{requestId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### 2. Environment Configuration

Create `.env.local` file in the project root:
```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

### 3. Build and Deploy

#### Option 1: Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

#### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Option 3: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### 4. Post-Deployment Setup

#### Configure Custom Domain (Optional)
1. In Firebase Console, go to Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps

#### Set up Stripe Webhooks
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe-webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### 5. Monitoring and Analytics

#### Firebase Analytics
- Automatically enabled with Firebase
- Track user engagement and conversion rates

#### Error Monitoring
- Firebase Crashlytics for error tracking
- Console logging for development

### 6. Security Considerations

#### Environment Variables
- Never commit `.env.local` to version control
- Use different Firebase projects for development and production
- Rotate API keys regularly

#### Data Privacy
- Implement GDPR compliance if serving EU users
- Add privacy policy and terms of service
- Enable data retention policies in Firestore

### 7. Performance Optimization

#### Build Optimization
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Enable compression
# Add to vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        }
      }
    }
  }
})
```

#### Caching Strategy
- Set appropriate cache headers for static assets
- Use Firebase Hosting caching rules
- Implement service worker for offline functionality

### 8. Backup and Recovery

#### Firestore Backup
```bash
# Set up automated backups
gcloud firestore export gs://your-backup-bucket
```

#### Database Migration
- Use Firestore data migration scripts
- Test migrations in staging environment first

### 9. Scaling Considerations

#### Firestore Limits
- Monitor read/write operations
- Implement pagination for large datasets
- Use composite indexes for complex queries

#### Performance Monitoring
- Set up Firebase Performance Monitoring
- Monitor Core Web Vitals
- Track user experience metrics

### 10. Maintenance

#### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Test updates in staging environment

#### Database Maintenance
- Clean up old notifications
- Archive completed fund requests
- Optimize queries and indexes

## 🎯 Production Checklist

- [ ] Firebase project configured with all services
- [ ] Environment variables set correctly
- [ ] Security rules implemented
- [ ] Custom domain configured (optional)
- [ ] Stripe webhooks configured
- [ ] Analytics and monitoring enabled
- [ ] Error tracking set up
- [ ] Backup strategy implemented
- [ ] Performance monitoring active
- [ ] Privacy policy and terms added
- [ ] SSL certificate active
- [ ] CDN configured for static assets

## 📞 Support

For deployment issues:
1. Check Firebase Console for errors
2. Review browser console for client-side errors
3. Monitor Firestore usage and limits
4. Check Stripe dashboard for payment issues

## 🔄 Updates and Maintenance

### Regular Tasks
- Weekly: Review error logs and performance metrics
- Monthly: Update dependencies and security patches
- Quarterly: Review and optimize database queries
- Annually: Security audit and penetration testing

Your RapidAid application is now production-ready! 🚀
