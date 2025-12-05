# Deployment Checklist ✅

## Before You Deploy

### 1. Replace Logo Files
- [ ] Replace `logo.png` with your actual company logo
- [ ] Replace `favicon.ico` with your favicon (use [favicon.io](https://favicon.io) to generate from logo)

### 2. Update Contact Information in index.html
- [ ] Update phone number: Search for `(502) 555-0123` and replace with your real number
- [ ] Update email: Search for `info@louisvillecommercialpainting.com` and replace
- [ ] Update domain: Search for `louisvillecommercialpainting.com` and replace with your domain (or leave for now)

### 3. Optional: Update Business Stats
- [ ] Update years of experience (line ~1018)
- [ ] Update number of projects completed (line ~1022)
- [ ] Update service area if needed (line ~1227)

## Deploy to Vercel

### Option 1: Via Vercel Website (Recommended)
1. [ ] Push code to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. [ ] Go to [vercel.com](https://vercel.com)
3. [ ] Click "Add New Project"
4. [ ] Import your GitHub repository
5. [ ] Click "Deploy"
6. [ ] Wait ~60 seconds - Done! 🎉

### Option 2: Via Vercel CLI
1. [ ] Install Vercel CLI: `npm install -g vercel`
2. [ ] Run: `vercel`
3. [ ] Follow the prompts

## After Deployment

### Immediate Tasks
- [ ] Test the live site on mobile and desktop
- [ ] Verify all links work correctly
- [ ] Check that images load properly

### Later (When You Get a Domain)
- [ ] Purchase domain (e.g., from Namecheap, Google Domains)
- [ ] Add custom domain in Vercel dashboard
- [ ] Update DNS records as instructed by Vercel
- [ ] Update all `louisvillecommercialpainting.com` references in HTML

### Future Enhancements (Optional)
- [ ] Add Google Analytics tracking
- [ ] Set up contact form (when needed)
- [ ] Add real photos of completed projects
- [ ] Add customer testimonials
- [ ] Create a blog section

## Quick Commands Reference

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Make updates and redeploy
git add .
git commit -m "Updated contact info"
git push

# Vercel will automatically redeploy!
```

## Troubleshooting

**Logo not showing?**
- Make sure `logo.png` is an actual PNG image file
- Check file name is exactly `logo.png` (lowercase)

**Site not updating?**
- Check Vercel dashboard for deployment status
- Clear browser cache (Ctrl+Shift+R)

**Need help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

**Note**: The form is currently hidden. When you're ready to enable it, we can set up Formspree, Netlify Forms, or a custom backend.
