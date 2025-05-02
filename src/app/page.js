'use client'
import { useState } from 'react';
import Image from 'next/image';
import statesData from './statesData';
import React from 'react';
import QRCode from 'react-qr-code';

export default function Home() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showHotelList, setShowHotelList] = useState(false);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedCity('');
    setSelectedHotel(null);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedHotel(null);
    setShowHotelList(true);
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

  const handleBooking = (details) => {
    const bookingRef = Math.random().toString(36).substring(2, 15);
    const booking = {
      bookingRef,
      hotelId: selectedHotel.id,
      checkIn: details.checkIn,
      checkOut: details.checkOut,
      roomType: details.roomType,
      timestamp: new Date().toISOString()
    };
    setBookingDetails(booking);
    setShowQRCode(true);
    setShowBookingModal(false);
  };

  const getCities = (state) => {
    if (!state) return [];
    return [...new Set(statesData[state].map(hotel => hotel.city))];
  };

  const getHotels = (state, city) => {
    if (!state || !city) return [];
    return statesData[state].filter(hotel => hotel.city === city);
  };

  return (
    <div className="min-h-screen">
      {!showHotelList ? (
        <>
          {/* Hero Section */}
          <section className="relative h-screen">
            <Image
              src="/images/rootpage/hero-banner.jpg"
              alt="Luxury Hotel"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-2xl">
                <h1 className="text-6xl font-bold mb-6">Experience Luxury</h1>
                <p className="text-2xl mb-8">Discover India`s Finest Hotels</p>
                <div className="relative inline-block w-64">
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateSelect(e.target.value)}
                    className={`w-full p-4 text-lg font-semibold rounded-full appearance-none cursor-pointer bg-white text-black hover:bg-opacity-90 transition ${
                      !selectedState ? 'text-black' : 'text-black'
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='black'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Book Now</option>
                    {Object.keys(statesData).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                {selectedState && (
                  <div className="mt-4">
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCitySelect(e.target.value)}
                      className="w-64 p-4 text-lg font-semibold rounded-full bg-white text-black"
                    >
                      <option value="">Select City</option>
                      {getCities(selectedState).map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Add explore more text */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                  <p className="text-lg font-semibold">Explore More</p>
                  <svg 
                    className="w-6 h-6 mx-auto mt-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Amenities Section */}
          <section className="py-20 px-8 bg-white">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-600">Luxury Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { title: 'Luxurious Rooms', image: 'rooms.jpg', desc: 'Experience unparalleled comfort' },
                { title: 'Fine Dining', image: 'dining.jpg', desc: 'Savor exquisite cuisine' },
                { title: 'Spa & Wellness', image: 'spa.jpg', desc: 'Rejuvenate your senses' },
                { title: 'Premium Bar', image: 'bar.jpg', desc: 'Unwind in style' }
              ].map((amenity, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={`/images/rootpage/${amenity.image}`}
                      alt={amenity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-600">{amenity.title}</h3>
                  <p className="text-gray-600">{amenity.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={() => {
                setShowHotelList(false);
                setSelectedCity('');
              }}
              className="mb-8 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-600">
              Hotels in {selectedCity}, {selectedState}
            </h1>

            <div className="grid grid-cols-1 gap-8">
              {getHotels(selectedState, selectedCity).map(hotel => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold mb-2 text-gray-600">{hotel.name}</h2>
                          <div className="text-yellow-500 mb-2"><span className="text-gray-600">Star Rating:</span> {'★'.repeat(hotel.star)}</div>
                          <p className="text-gray-600 mb-4">Customer Rating: {hotel.rating}/5.0</p>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">₹{hotel.pricePerNight}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-600">Amenities:</h3>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-600">Reviews:</h3>
                        <div className="space-y-4">
                          {hotel.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4 last:border-b-0">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-gray-600">By {review.reviewerName}:</p>
                                <div className="text-yellow-500">{'★'.repeat(review.rating)}</div>
                              </div>
                              <p className="text-sm text-gray-600">{review.date}</p>
                              <p className="mt-1 text-gray-600">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleHotelSelect(hotel)}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} 

      {/* Booking Modal - Single instance */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-600">Complete Your Booking</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleBooking({
                checkIn: e.target.checkIn.value,
                checkOut: e.target.checkOut.value,
                roomType: e.target.roomType.value
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600">Check-in Date</label>
                <input
                  type="date"
                  name="checkIn"
                  required
                  className="w-full p-2 border rounded-lg text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600">Check-out Date</label>
                <input
                  type="date"
                  name="checkOut"
                  required
                  className="w-full p-2 border rounded-lg text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600">Room Type</label>
                <select
                  name="roomType"
                  required
                  className="w-full p-2 border rounded-lg text-gray-600"
                >
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Confirmation - Single instance */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-600">Booking Confirmed!</h2>
            <p className="mb-4 text-gray-600">Your Booking Reference: {bookingDetails.bookingRef}</p>
            <div className="flex justify-center bg-gray-100 p-6 rounded-lg mb-6">
              <QRCode
                value={JSON.stringify(bookingDetails)}
                size={200}
                level="H"
                includemargin="true"
              />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Please save this QR code. You`ll need it to check in at the hotel.
            </p>
            <button
              onClick={() => {
                setShowQRCode(false);
                setSelectedState('');
                setSelectedCity('');
                setSelectedHotel(null);
                setBookingDetails(null);
                setShowHotelList(false);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}