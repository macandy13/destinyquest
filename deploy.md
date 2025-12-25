---
description: How to deploy the PWA to GitHub Pages for mobile testing
---

# Deploying to GitHub Pages

To test this app on your phone, we will host it using GitHub Pages.

## Prerequisite: GitHub Repository
Ensure this local folder is initialized as a git repository and linked to a remote GitHub repository.

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

## Step 1: Push Changes
I have already created the deployment workflow file at `.github/workflows/deploy.yml`. 
Simply push the latest changes to the `main` branch.

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

## Step 2: Configure GitHub Settings
1. Go to your repository on **GitHub.com**.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, ensure **Source** is set to **Deploy from a branch**.
4. (Optional) The workflow will create a `gh-pages` branch. You may need to select `gh-pages` on this screen *after* the first action run completes.

## Step 3: Access on Mobile
Once deployed (indicated by a green checkmark in the Actions tab):
1. Visit `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/` on your phone.
2. **iOS (Safari)**: Tap the **Share** button -> **Add to Home Screen**.
3. **Android (Chrome)**: Tap the **Three Dots** -> **Install App** or **Add to Home Screen**.

This will install it as a standalone PWA, hiding the browser bar.
