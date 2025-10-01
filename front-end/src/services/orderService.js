import authService from './authService';

class OrderService {
  // Add a new order to the user's profile
  async addOrder(orderData) {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create order object with proper structure for profile display
      const newOrder = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        restaurantName: this.getRestaurantFromItems(orderData.items),
        mealName: this.getMealNameFromItems(orderData.items),
        image: this.getImageFromItems(orderData.items),
        date: new Date().toISOString(),
        status: 'En cours', // New orders start as "En cours"
        price: orderData.total || 0,
        customerInfo: {
          name: orderData.name,
          phone: orderData.phone,
          address: orderData.address,
          city: orderData.city
        },
        paymentMethod: orderData.payment || 'cod',
        items: orderData.items || []
      };

      // Get current user orders
      const currentOrders = user.orders || [];
      const updatedOrders = [newOrder, ...currentOrders];

      // Update user object locally
      const updatedUser = { ...user, orders: updatedOrders };
      authService.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Trigger auth state change event to update UI
      window.dispatchEvent(new CustomEvent('auth_state_changed', {
        detail: { isAuthenticated: true, user: updatedUser }
      }));

      // TODO: In a real app, you would also send this to the backend
      // await this.sendOrderToBackend(newOrder);

      return newOrder;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  }

  // Helper method to get restaurant name from items
  getRestaurantFromItems(items) {
    if (!items || items.length === 0) return 'Restaurant';
    
    // If items have restaurant info, use it
    if (items[0].restaurant) return items[0].restaurant;
    
    // Otherwise, use a default or derive from item names
    return 'Délices Marocains';
  }

  // Helper method to get meal name from items
  getMealNameFromItems(items) {
    if (!items || items.length === 0) return 'Commande';
    
    if (items.length === 1) {
      return items[0].name || items[0].title || 'Plat';
    } else {
      return `${items[0].name || items[0].title || 'Plat'} + ${items.length - 1} autre${items.length > 2 ? 's' : ''}`;
    }
  }

  // Helper method to get image from items
  getImageFromItems(items) {
    if (!items || items.length === 0) {
      return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center';
    }
    
    return items[0].image || items[0].img || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center';
  }

  // Update order status (for future use)
  async updateOrderStatus(orderId, newStatus) {
    try {
      const user = authService.getCurrentUser();
      if (!user || !user.orders) return;

      const updatedOrders = user.orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      const updatedUser = { ...user, orders: updatedOrders };
      authService.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Trigger auth state change event
      window.dispatchEvent(new CustomEvent('auth_state_changed', {
        detail: { isAuthenticated: true, user: updatedUser }
      }));

      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // Get user orders
  getUserOrders() {
    const user = authService.getCurrentUser();
    return user?.orders || [];
  }

  // Clear all orders
  async clearAllOrders() {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Update user object locally with empty orders array
      const updatedUser = { ...user, orders: [] };
      authService.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Trigger auth state change event to update UI
      window.dispatchEvent(new CustomEvent('auth_state_changed', {
        detail: { isAuthenticated: true, user: updatedUser }
      }));

      // TODO: In a real app, you would also send this to the backend
      // await this.clearOrdersOnBackend();

      return true;
    } catch (error) {
      console.error('Error clearing orders:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
const orderService = new OrderService();
export default orderService;
