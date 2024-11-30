import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSign, User, Lock, KeyRound } from 'lucide-react';
import { API_ROOT } from '../../constants';
import TextInput from '../../components/ui/TextInput';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordChecks, setPasswordChecks] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  // 检查密码强度
  const validatePassword = (password) => {
    const checks = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    };
    setPasswordChecks(checks);
    return Object.values(checks).every(Boolean);
  };

  const handleChange = (value, e) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'password') {
      validatePassword(value);
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 密码验证
    if (!validatePassword(formData.password)) {
      setError('Password does not meet requirements');
      return;
    }

    // 确认密码匹配
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(API_ROOT + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/');
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md space-y-4">
            <TextInput
              type="email"
              name="email"
              label="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              startIcon={AtSign}
              placeholder="Enter your email"
            />
            
            <TextInput
              type="text"
              name="username"
              label="Username"
              required
              value={formData.username}
              onChange={handleChange}
              startIcon={User}
              placeholder="Choose a username"
            />
            
            <div className="space-y-2">
              <TextInput
                type="password"
                name="password"
                label="Password"
                required
                value={formData.password}
                onChange={handleChange}
                startIcon={Lock}
                placeholder="Create a password"
                errorMessage={
                  formData.password && !validatePassword(formData.password)
                    ? 'Password does not meet requirements'
                    : ''
                }
              />
              
              {/* 密码要求检查列表 */}
              <div className="mt-2 space-y-1 text-sm">
                <div className={`flex items-center ${passwordChecks.hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordChecks.hasUpperCase ? '✓' : '○'}</span>
                  <span>At least one uppercase letter</span>
                </div>
                <div className={`flex items-center ${passwordChecks.hasLowerCase ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordChecks.hasLowerCase ? '✓' : '○'}</span>
                  <span>At least one lowercase letter</span>
                </div>
                <div className={`flex items-center ${passwordChecks.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordChecks.hasSpecialChar ? '✓' : '○'}</span>
                  <span>At least one special character</span>
                </div>
                <div className={`flex items-center ${passwordChecks.hasMinLength ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordChecks.hasMinLength ? '✓' : '○'}</span>
                  <span>Minimum 8 characters</span>
                </div>
              </div>
            </div>
            
            <TextInput
              type="password"
              name="confirmPassword"
              label="Confirm password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              startIcon={KeyRound}
              placeholder="Confirm your password"
              errorMessage={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'Passwords do not match'
                  : ''
              }
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;