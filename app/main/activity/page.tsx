'use client';
import React, { useEffect } from 'react';
import activityStyles from '../../../ui/activity/activity.module.scss';
import { fetchNotifications } from '@/store/reducers/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';

const ActivityPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { notifications, status, error } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className={activityStyles.container}>
      <div className={activityStyles.title}>Activity</div>
      <div className={activityStyles.content}>
        {error && <div className={activityStyles.error}>{error}</div>}
        {notifications.length === 0 && status !== 'loading' && !error && (
          <div>No notifications available.</div>
        )}
        {status === 'loading' && <div>Loading notifications...</div>}
        {[...notifications].reverse().map((notification) => (
          <div key={notification.id}>
            {notification.senderUserId ? (
              <div>
                <strong>User ID:</strong> {notification.senderUserId._id}<br />
                <strong>User Name:</strong> {notification.senderUserId.name}
              </div>
            ) : (
              <div>No sender information available.</div>
            )}
            <div><strong>Description:</strong> {notification.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
