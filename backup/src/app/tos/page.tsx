import { redirect } from 'next/navigation';

export default function TOSPage() {
  // Redirect to the existing TOS HTML page
  redirect('/tos.html');
  
  // This will never render, but is needed for TypeScript
  return null;
} 