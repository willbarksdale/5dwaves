import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-black text-white py-8">
      <div className="w-full max-w-[460px] px-4 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 mt-4">
          <Image 
            src="/images/logo.png" 
            alt="5D Waves Logo" 
            width={150} 
            height={150}
            className="mx-auto"
            priority
          />
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold mb-4 text-center">5D Waves</h1>
        <p className="text-center text-gray-300 mb-8">Meditation & Relaxation App</p>

        {/* Download Buttons */}
        <div className="flex flex-col w-full gap-4 mb-8">
          <a 
            href="https://apps.apple.com/us/app/5d-waves/id6742191732" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black border border-white rounded-full py-3 w-full flex items-center justify-center gap-2 text-base font-medium hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0298 11.9994C17.0225 10.1709 18.0742 8.77023 20.2006 7.81469C19.0346 6.09595 17.2374 5.11641 15.0489 5.02443C12.9947 4.93589 11.0123 6.35047 10.1799 6.35047C9.32105 6.35047 7.64245 5.06855 5.9828 5.06855C3.22827 5.11267 0.246338 7.3524 0.246338 11.9165C0.246338 13.3087 0.493316 14.7488 0.987273 16.2368C1.66443 18.2381 4.01592 22.9447 6.49855 22.8674C7.78701 22.8299 8.66542 21.8242 10.3816 21.8242C12.0596 21.8242 12.8718 22.8674 14.3026 22.8674C16.8068 22.8299 18.9392 18.5727 19.5894 16.5639C16.3318 14.9658 17.0298 12.0631 17.0298 11.9994ZM14.025 3.75122C15.8148 1.607 15.6766 0 15.6766 0C14.2535 0.074977 12.5897 0.933214 11.6336 2.0114C10.5793 3.16364 10.0188 4.5409 10.1569 5.98641C11.718 6.09595 12.9286 5.20727 14.025 3.75122Z" />
            </svg>
            Download on iOS
          </a>
          <a 
            href="https://play.google.com/store/apps/details?id=com.fivedwaves.organization" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black border border-white rounded-full py-3 w-full flex items-center justify-center gap-2 text-base font-medium hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.90321 0.651367C1.57104 1.00172 1.38477 1.49344 1.38477 2.1297V21.8696C1.38477 22.5059 1.57104 22.9976 1.90321 23.348L2.0252 23.4569L13.4145 12.0677L2.0252 0.542481L1.90321 0.651367Z" />
              <path d="M17.4094 16.0625L13.4145 12.0676L17.4094 8.07275L21.8751 10.7096C23.1163 11.456 23.1163 12.6793 21.8751 13.4257L17.4094 16.0625Z" />
              <path d="M1.90312 23.348C2.32847 23.7734 2.99292 23.8282 3.75377 23.4029L17.4093 16.0625L13.4144 12.0676L2.0251 23.4569L1.90312 23.348Z" />
              <path d="M1.90312 0.651417C2.32847 0.226072 2.99292 0.281269 3.75377 0.706613L17.4093 8.04706L13.4144 12.0677L2.0251 0.542532L1.90312 0.651417Z" />
            </svg>
            Download on Android
          </a>
        </div>
        
        {/* Social Media Icons Row */}
        <div className="flex justify-center items-center gap-10 my-10">
          <a 
            href="https://youtube.com/@5dwaves" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="YouTube"
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
            </svg>
          </a>
          <a 
            href="https://facebook.com/5dwaves" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Facebook"
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
            </svg>
          </a>
          <a 
            href="https://instagram.com/5dwaves" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
            </svg>
          </a>
          <a 
            href="https://tiktok.com/@5dwaves" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="TikTok"
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
            </svg>
          </a>
          <a 
            href="mailto:will@5dwaves.com" 
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Email"
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
          </a>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          <p className="text-gray-300 mb-4">
            Raise your consciousness, meditate, sleep deeply & clear your mind with the 5D Waves meditation app.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto py-6 border-t border-gray-800">
        <div className="flex justify-between items-center max-w-[460px] mx-auto px-5">
          <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
            Terms
          </Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
            Privacy
          </Link>
          <Link href="/support" className="text-gray-400 hover:text-white transition-colors text-sm">
            Support
          </Link>
        </div>
      </footer>
    </main>
  );
}
