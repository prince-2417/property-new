'use client';
// Updated to ensure booking system is globally available
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { properties as staticProperties } from '@/data/properties';

const ListingContext = createContext();

export function ListingProvider({ children }) {
  const [userListings, setUserListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  
  // New: Managed projects and areas
  const [projects, setProjects] = useState([
    { 
      id: 1,
      title: 'Marina Heights', 
      location: 'Dubai Marina', 
      price: 'From AED 3.4M', 
      status: 'Ready to move',
      image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1000'
    },
    { 
      id: 2,
      title: 'Skyline Residences', 
      location: 'Business Bay', 
      price: 'From AED 2.1M', 
      status: 'Off-plan',
      image: 'https://images.unsplash.com/photo-1541339902294-12784724e071?auto=format&fit=crop&q=80&w=1000'
    },
    { 
      id: 3,
      title: 'Palm Oasis', 
      location: 'Jumeirah', 
      price: 'From AED 5.8M', 
      status: 'Luxury villas',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000'
    }
  ]);

  const [areas, setAreas] = useState([
    { 
      id: 1,
      name: 'Dubai Marina', 
      count: '2,450 listings', 
      label: 'Waterfront living',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=600'
    },
    { 
      id: 2,
      name: 'Downtown Dubai', 
      count: '1,820 listings', 
      label: 'Luxury skyscrapers',
      image: 'https://images.unsplash.com/photo-1549944850-84e00be42197?auto=format&fit=crop&q=80&w=600'
    },
    { 
      id: 3,
      name: 'Palm Jumeirah', 
      count: '1,150 listings', 
      label: 'Exclusive Island',
      image: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&q=80&w=600'
    },
    { 
      id: 4,
      name: 'Business Bay', 
      count: '1,330 listings', 
      label: 'Urban lifestyle',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600'
    }
  ]);

  const { user } = useAuth();

  useEffect(() => {
    // Load user-added listings and bookings from localStorage
    const savedListings = localStorage.getItem('pf_listings');
    const savedBookings = localStorage.getItem('pf_bookings');
    const savedFavs = localStorage.getItem('pf_saved');
    const savedProjects = localStorage.getItem('pf_projects');
    const savedAreas = localStorage.getItem('pf_areas');
    
    if (savedListings) setUserListings(JSON.parse(savedListings));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedFavs) setSavedProperties(JSON.parse(savedFavs));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedAreas) setAreas(JSON.parse(savedAreas));
  }, []);

  const updateProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('pf_projects', JSON.stringify(newProjects));
  };

  const updateAreas = (newAreas) => {
    setAreas(newAreas);
    localStorage.setItem('pf_areas', JSON.stringify(newAreas));
  };

  const addListing = (listingData) => {
    if (!user) return;

    const newListing = {
      ...listingData,
      id: Date.now(),
      ownerId: user.id,
      ownerName: user.name,
      createdAt: new Date().toISOString(),
      status: 'Active',
      views: 0,
      leads: 0,
    };

    const updatedListings = [newListing, ...userListings];
    setUserListings(updatedListings);
    localStorage.setItem('pf_listings', JSON.stringify(updatedListings));
    return newListing;
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `BK-${Date.now()}`,
      status: 'Paid',
      amount: 5000,
      createdAt: new Date().toISOString(),
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('pf_bookings', JSON.stringify(updatedBookings));
    return newBooking;
  };
  
  const toggleSave = (propertyId) => {
    const isSaved = savedProperties.includes(propertyId);
    let updated;
    if (isSaved) {
      updated = savedProperties.filter(id => id !== propertyId);
    } else {
      updated = [...savedProperties, propertyId];
    }
    setSavedProperties(updated);
    localStorage.setItem('pf_saved', JSON.stringify(updated));
  };

  const deleteListing = (id) => {
    const updatedListings = userListings.filter(l => l.id !== id);
    setUserListings(updatedListings);
    localStorage.setItem('pf_listings', JSON.stringify(updatedListings));
  };

  const updateListing = (id, updatedData) => {
    const updatedListings = userListings.map(l => 
      l.id === id ? { ...l, ...updatedData } : l
    );
    setUserListings(updatedListings);
    localStorage.setItem('pf_listings', JSON.stringify(updatedListings));
  };

  // Global listings includes static ones + all user-added ones
  const allListings = [...userListings, ...staticProperties];

  return (
    <ListingContext.Provider value={{ 
      listings: allListings, 
      userListings, 
      bookings,
      savedProperties,
      projects,
      areas,
      addListing, 
      addBooking,
      deleteListing,
      updateListing,
      toggleSave,
      updateProjects,
      updateAreas
    }}>
      {children}
    </ListingContext.Provider>
  );
}

export const useListings = () => useContext(ListingContext);
