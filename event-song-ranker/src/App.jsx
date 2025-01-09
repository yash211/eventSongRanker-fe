import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import musicImage from './assets/music.jpeg';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      <main className="max-w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <img
              src={musicImage}
              alt="Music"
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            {isLogin ? (
              <LoginForm onToggleForm={() => setIsLogin(false)} />
            ) : (
              <SignupForm onToggleForm={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;