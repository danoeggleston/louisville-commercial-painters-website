@echo off
echo ========================================
echo Louisville Commercial Painters Website
echo Git Setup Script
echo ========================================
echo.

echo Checking if git is initialized...
if exist .git (
    echo Git repository already exists!
) else (
    echo Initializing git repository...
    git init
    echo Git initialized!
)

echo.
echo Adding all files to git...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit - Louisville Commercial Painters website"

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create a repository on GitHub
echo 2. Run: git remote add origin YOUR_GITHUB_REPO_URL
echo 3. Run: git push -u origin main
echo.
echo Or deploy directly with Vercel CLI:
echo 1. Install: npm install -g vercel
echo 2. Run: vercel
echo.

pause
