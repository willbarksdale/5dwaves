import { redirect } from 'next/navigation';

export default function PrivacyPage() {
  // Redirect to the existing Privacy Policy HTML page
  redirect('/privacy.html');
  
  // This will never render, but is needed for TypeScript
  return null;
} 