import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiX, FiCamera, FiAlertCircle, FiShoppingBag, FiHeart, FiStar, FiClock, FiCheck, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, error, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    bio: '',
    avatar: null
  });
  const [editData, setEditData] = useState(profileData);
  const [isLoading, setIsLoading] = useState(false);

  // Mock orders data for demonstration
  const [orders] = useState([
    {
      id: 1,
      restaurantName: "Chez Fatima",
      mealName: "Couscous Royal",
      image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=100&h=100&fit=crop&crop=center",
      date: "2024-01-15",
      status: "Livrée",
      price: 85
    },
    {
      id: 2,
      restaurantName: "Tajine Express",
      mealName: "Tajine Poulet aux Olives",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=100&h=100&fit=crop&crop=center",
      date: "2024-01-12",
      status: "En cours",
      price: 65
    },
    {
      id: 3,
      restaurantName: "Pastilla Palace",
      mealName: "Pastilla au Poisson",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center",
      date: "2024-01-10",
      status: "Annulée",
      price: 95
    },
    {
      id: 4,
      restaurantName: "Harira House",
      mealName: "Harira Traditionnelle + Pain",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=100&h=100&fit=crop&crop=center",
      date: "2024-01-08",
      status: "Livrée",
      price: 35
    }
  ]);

  // Rediriger si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Charger les données utilisateur
  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
        bio: user.bio || '',
        avatar: user.avatar || null
      };
      setProfileData(userData);
      setEditData(userData);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = async () => {
    setIsLoading(true);
    clearError();
    
    try {
      await updateProfile(editData);
      setProfileData(editData);
      setIsEditing(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
    clearError();
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'En cours':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <FiClock className="w-3 h-3 mr-1" />
            En cours
          </span>
        );
      case 'Livrée':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheck className="w-3 h-3 mr-1" />
            Livrée
          </span>
        );
      case 'Annulée':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiXCircle className="w-3 h-3 mr-1" />
            Annulée
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3] font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg ring-4 ring-orange-100">
                    {profileData.avatar ? (
                      <img 
                        src={profileData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                        <FiUser className="w-10 h-10 text-orange-600" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-orange-600 text-white p-2 rounded-full cursor-pointer hover:bg-orange-700 transition-colors shadow-lg">
                      <FiCamera className="w-3 h-3" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-[#1b2629] font-['Lora'] mt-4 mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                
                <div className="mb-4">
                  {!isEditing ? (
                    <button 
                      onClick={handleEdit}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center mx-auto"
                    >
                      <FiEdit3 className="w-4 h-4 mr-2" />
                      Modifier
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <FiSave className="w-4 h-4 mr-2" />
                        {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                      </button>
                      <button 
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-4 py-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <FiX className="w-4 h-4 mr-2" />
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-[#1b2629] font-['Lora'] mb-4">Informations personnelles</h3>
                
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="w-4 h-4 mr-2 text-orange-600" />
                      Prénom
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm bg-gray-50 px-3 py-2 rounded-lg">{profileData.firstName || 'Non renseigné'}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="w-4 h-4 mr-2 text-orange-600" />
                      Nom
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm bg-gray-50 px-3 py-2 rounded-lg">{profileData.lastName || 'Non renseigné'}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="w-4 h-4 mr-2 text-orange-600" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm bg-gray-50 px-3 py-2 rounded-lg">{profileData.email || 'Non renseigné'}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiPhone className="w-4 h-4 mr-2 text-orange-600" />
                      Téléphone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm bg-gray-50 px-3 py-2 rounded-lg">{profileData.phone || 'Non renseigné'}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <FiMapPin className="w-4 h-4 mr-2 text-orange-600" />
                      Adresse
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm bg-gray-50 px-3 py-2 rounded-lg">{profileData.address || 'Non renseigné'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-red-700">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-1">15</div>
                    <div className="text-sm font-semibold text-gray-700">Commandes</div>
                    <div className="text-xs text-gray-500">Total passées</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FiShoppingBag className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-pink-600 mb-1">7</div>
                    <div className="text-sm font-semibold text-gray-700">Favoris</div>
                    <div className="text-xs text-gray-500">Plats sauvegardés</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FiHeart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">4</div>
                    <div className="text-sm font-semibold text-gray-700">Avis</div>
                    <div className="text-xs text-gray-500">Restaurants notés</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FiStar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-[#1b2629] font-['Lora'] mb-6">Mes commandes récentes</h3>
              
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                    <img 
                      src={order.image} 
                      alt={order.mealName}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{order.mealName}</h4>
                          <p className="text-sm text-gray-600 mb-1">{order.restaurantName}</p>
                          <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="mb-2">{getStatusBadge(order.status)}</div>
                          <p className="text-lg font-bold text-[#1b2629]">{order.price} DH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
