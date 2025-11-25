import React, { useState } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../context/AuthContext';

const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const { notifications, markAsRead, markAllAsRead, clearNotification, clearAll, getUserNotifications } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const userNotifications = getUserNotifications(user?.id || '');
  
  const filteredNotifications = filter === 'unread' 
    ? userNotifications.filter(n => !n.read)
    : userNotifications;

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      clearAll();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'prescription': return '💊';
      case 'reminder': return '⏰';
      case 'system': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h2>Notifications</h2>
        <div className="notification-actions">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
          </div>
          <div className="action-buttons">
            <button 
              className="action-btn mark-all-read"
              onClick={handleMarkAllAsRead}
              disabled={userNotifications.filter(n => !n.read).length === 0}
            >
              Mark All as Read
            </button>
            <button 
              className="action-btn clear-all"
              onClick={handleClearAll}
              disabled={userNotifications.length === 0}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>No notifications</h3>
            <p>When you have notifications, they'll appear here.</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {getTypeIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-title-row">
                  <h4 className="notification-title">{notification.title}</h4>
                  {!notification.read && <span className="unread-indicator">New</span>}
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-meta">
                  <span className="notification-time">
                    {formatDate(notification.createdAt)}
                  </span>
                  <span className="notification-type">{notification.type}</span>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification(notification.id);
                }}
                title="Delete notification"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
