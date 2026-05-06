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
  const { user } = useAuth();

  useEffect(() => {
    // Load user-added listings and bookings from localStorage
    const savedListings = localStorage.getItem('pf_listings');
    const savedBookings = localStorage.getItem('pf_bookings');
    const savedFavs = localStorage.getItem('pf_saved');
    
    if (savedListings) setUserListings(JSON.parse(savedListings));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    if (savedFavs) setSavedProperties(JSON.parse(savedFavs));
  }, []);

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

  // Global listings includes static ones + all user-added ones
  const allListings = [...userListings, ...staticProperties];

  return (
    <ListingContext.Provider value={{ 
      listings: allListings, 
      userListings, 
      bookings,
      savedProperties,
      addListing, 
      addBooking,
      deleteListing,
      toggleSave
    }}>
      {children}
    </ListingContext.Provider>
  );
}

export const useListings = () => useContext(ListingContext);
