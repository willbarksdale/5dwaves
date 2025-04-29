# 5D Waves Website

This is the official website for 5D Waves meditation and relaxation app.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Modern black gradient design
- Responsive layout for all device sizes
- App store links to download the 5D Waves meditation app
- Links to Terms of Service, Privacy Policy, and Support pages
- Built with Next.js and Tailwind CSS

## Deployment with GitHub and Vercel

1. Push this repository to GitHub
2. Sign up for a [Vercel](https://vercel.com) account
3. Connect your GitHub repository to Vercel
4. Configure the following secrets in your GitHub repository settings:
   - `VERCEL_TOKEN` - Your Vercel API token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID
5. Push changes to the `main` branch to trigger automatic deployment

## Policy Pages

The `/tos`, `/privacy`, and `/support` routes are configured to redirect to the HTML policy pages in the repository:
- tos.html
- privacy.html
- support.html

Make sure these HTML files exist in the root of your GitHub repository.

## App Links

- iOS: [App Store](https://apps.apple.com/us/app/5d-waves/id6742191732)
- Android: [Google Play](https://play.google.com/store/apps/details?id=com.fivedwaves.organization)
