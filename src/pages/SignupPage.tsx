
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/data.service';
import { Input } from '../components/ui/input';
import { Apple, Phone } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await dataService.signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const AuthButton = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <button className="w-full flex items-center justify-center gap-3 p-4 rounded-full border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 transition-colors">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Scribe.Ai</h1>
          <h2 className="text-2xl font-bold mb-8">Create an account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-full"
          />
          
          <Input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-full"
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-full"
          />
          
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-4 border border-gray-300 rounded-full"
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Continue'}
          </button>
        </form>

        <div className="text-center mb-6">
          <p className="text-gray-600">
            Already have an account? 
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline ml-1"
            >
              Log in
            </button>
          </p>
        </div>

        <div className="text-center text-gray-500 mb-6">OR</div>

        <div className="space-y-3">
          <AuthButton 
            icon={() => <span className="text-red-500 font-bold">G</span>} 
            text="Continue with Google" 
          />
          <AuthButton 
            icon={() => <div className="w-5 h-5 bg-blue-500"></div>} 
            text="Continue with Microsoft Account" 
          />
          <AuthButton 
            icon={Apple} 
            text="Continue with Apple" 
          />
          <AuthButton 
            icon={Phone} 
            text="Continue with phone" 
          />
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <a href="#" className="hover:underline">Terms of Use</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
