import { redirect } from 'next/navigation';

export default function SupportPage() {
  // Redirect to the existing Support HTML page
  redirect('/support.html');
  
  // This will never render, but is needed for TypeScript
  return null;
} 