'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize users DB with a default admin if empty
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    if (!users.find(u => u.email === 'admin@property.com')) {
      users.push({
        id: 'admin_1',
        name: 'Super Admin',
        email: 'admin@property.com',
        password: 'property2026',
        role: 'Admin'
      });
      localStorage.setItem('pf_users', JSON.stringify(users));
    }

    const savedUser = localStorage.getItem('pf_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated DB check
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const sessionUser = { 
        id: foundUser.id, 
        email: foundUser.email, 
        name: foundUser.name, 
        role: foundUser.role 
      };
      setUser(sessionUser);
      localStorage.setItem('pf_user_session', JSON.stringify(sessionUser));
      
      // Role-based redirection
      if (sessionUser.role === 'Admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } else {
      alert('Invalid credentials! Try signing up if you don\'t have an account.');
    }
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    
    if (users.some(u => u.email === email)) {
      alert('Email already exists!');
      return;
    }

    // New signups are always Property Owners now, since Admin is pre-set
    const role = 'Property Owner';
    
    const newUser = { 
      id: Date.now().toString(), 
      name, 
      email, 
      password, 
      role 
    };

    users.push(newUser);
    localStorage.setItem('pf_users', JSON.stringify(users));

    const sessionUser = { 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name, 
      role: newUser.role 
    };
    setUser(sessionUser);
    localStorage.setItem('pf_user_session', JSON.stringify(sessionUser));
    
    router.push('/dashboard');
  };

  const changePassword = (currentPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex === -1 || users[userIndex].password !== currentPassword) {
      alert('Current password incorrect!');
      return false;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('pf_users', JSON.stringify(users));
    alert('Password updated successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pf_user_session');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
