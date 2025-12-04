# AWS Deployment & CI/CD Guide

This guide outlines two primary ways to deploy your SvelteKit portfolio to AWS:

1.  **AWS Amplify (Recommended)**: Easiest setup, fully managed, built-in CI/CD.
2.  **S3 + CloudFront**: Best for purely static sites, low cost, requires manual CI/CD setup.

---

## Option 1: AWS Amplify (Recommended)

AWS Amplify Hosting provides a git-based workflow for hosting full-stack serverless web apps. It supports SvelteKit out of the box (both SSR and Static).

### Steps:

1.  **Push your code to GitHub**.
2.  **Log in to AWS Console** and navigate to **AWS Amplify**.
3.  Click **"Create new app"** -> **"Host web app"**.
4.  Select **GitHub** as your source code provider.
5.  Authorize AWS Amplify to access your GitHub account.
6.  Select your **repository** and **branch** (e.g., `main`).
7.  **Build Settings**: Amplify should automatically detect SvelteKit.
    - Ensure the build command is `npm run build` (or `pnpm run build`).
    - Ensure the output directory is `build` (or `.svelte-kit/output` depending on adapter, but usually `build` or `public`). _Note: Amplify's auto-detection usually handles this._
8.  Click **"Save and Deploy"**.

### Custom Domain Setup:

Yes, you can easily connect your own domain (e.g., `yourname.com`) to your Amplify app. AWS handles the SSL certificate automatically.

1.  In the **AWS Amplify Console**, go to your app.
2.  In the left sidebar, click on **"Domain management"**.
3.  Click **"Add domain"**.
4.  Enter your domain name (e.g., `example.com`).
5.  Click **"Configure domain"**.
6.  **If your domain is in AWS Route 53**: Amplify will automatically configure the DNS records for you.
7.  **If your domain is elsewhere (GoDaddy, Namecheap, etc.)**:
    - Amplify will provide you with **CNAME** or **A** records.
    - Log in to your domain registrar's dashboard and add these records to your DNS settings.
    - Verification usually takes 15-30 minutes.
8.  Once verified, Amplify will automatically provision a free SSL certificate (HTTPS) for your site.

### CI/CD:

- **Automatic**: Amplify automatically sets up a CI/CD pipeline. Every time you push to your connected branch, Amplify will build and deploy the new version.
- **Previews**: You can enable "Pull Request Previews" to deploy a temporary URL for every PR.

---

## Option 2: S3 + CloudFront (Static Site)

If your site is purely static (no server-side API routes), this is a very cost-effective and performant option.

### Prerequisites:

1.  Install `adapter-static`:
    ```bash
    pnpm add -D @sveltejs/adapter-static
    ```
2.  Update `svelte.config.js`:
    ```javascript
    import adapter from '@sveltejs/adapter-static';
    // ...
    kit: {
      adapter: adapter({
        fallback: '404.html', // specific to SPA or static host fallback
      });
    }
    ```
3.  Add a `src/routes/+layout.ts` file with:
    ```typescript
    export const prerender = true;
    ```

### Deployment Steps (Manual):

1.  Run `pnpm build`.
2.  Sync the `build/` folder to an S3 bucket.
3.  Configure the S3 bucket for "Static Website Hosting".
4.  Create a CloudFront distribution pointing to the S3 bucket.

### CI/CD with GitHub Actions:

Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'build'
```

_Note: You will need to add `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` to your GitHub Repository Secrets._

---

## Recommendation

For your portfolio, **AWS Amplify** is the simplest and most robust choice. It handles the build process, domain management (SSL), and CI/CD without requiring you to manage infrastructure or write YAML files.
