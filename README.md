# Louisville Commercial Painters Website

A professional single-page website for Louisville Commercial Painting Co.

## 🚀 Quick Deployment to Vercel

### Prerequisites
- [GitHub account](https://github.com)
- [Vercel account](https://vercel.com) (sign up with your GitHub account - it's free!)
- Your logo image file

### Step 1: Prepare Your Files

1. **Replace the logo files** with your actual logo:
   - Replace `logo.png` with your company logo (recommended size: 500x200px or similar)
   - Replace `favicon.ico` with a 32x32 or 16x16 icon version of your logo
   - You can use tools like [favicon.io](https://favicon.io) to generate a favicon from your logo

### Step 2: Push to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Louisville Commercial Painters website"
   ```

2. Create a new repository on GitHub:
   - Go to [GitHub](https://github.com/new)
   - Name it: `louisville-commercial-painters`
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/louisville-commercial-painters.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a static site
5. Click "Deploy"
6. Wait 30-60 seconds - Done! 🎉

Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Login to your Vercel account
   - Confirm project settings
   - Deploy!

### Step 4: Custom Domain (Optional)

Once deployed, you can add a custom domain:

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `louisvillecommercialpainting.com`)
4. Follow the DNS setup instructions provided by Vercel

## 📁 Project Structure

```
.
├── index.html          # Main website file
├── logo.png           # Company logo (REPLACE THIS)
├── favicon.ico        # Browser icon (REPLACE THIS)
├── vercel.json        # Vercel configuration
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## ✨ Features

- **Fully Responsive**: Works on all devices (mobile, tablet, desktop)
- **SEO Optimized**: Proper meta tags, Open Graph, and Schema.org markup
- **Fast Loading**: Single HTML file with optimized performance
- **Professional Design**: Modern, clean design that builds trust
- **No Dependencies**: No build process required - just pure HTML/CSS/JS

## 🎨 Customization

### Update Contact Information

Edit [index.html](index.html) and search for these placeholder values:

- **Phone**: `(502) 555-0123` - line 25, 1209
- **Email**: `info@louisvillecommercialpainting.com` - line 1218
- **Domain**: `https://louisvillecommercialpainting.com` - lines 13, 16, 23, 24

### Update Business Details

- **Stats** (Years, Projects, etc.): Lines 1018-1028
- **Service Area**: Line 1227
- **Hours**: Lines 49-51, 1236

## 🔄 Making Updates

After making changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

Vercel will automatically redeploy your site within seconds!

## 📞 Support

If you need help with deployment:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

## 📝 License

© 2025 Louisville Commercial Painting Co. All rights reserved.
