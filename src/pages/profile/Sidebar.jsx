import { Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProfile } from '../../shared/api/users';
import styles from './Sidebar.module.css';
import userAvatar from '/user-avatar.png';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      //const token = localStorage.getItem('token');
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTM3Y2Y2NTBkN2I5NzhlNmI5YzFjMiIsImVtYWlsIjoibm9oYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImltYWdlIjoidXBsb2Fkcy9hdmF0YXItZGVmYXVsdC5qcGVnIiwiaWF0IjoxNzYyOTg0OTM4LCJleHAiOjE3NjI5ODg1Mzh9.1dI_rDvBk3n9n3A2rrRR81kTV2ddIlkG04cAVnqt350";
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try { 
        const profile = await getProfile(token);
        setUser(profile);
        console.log(profile);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <aside className={styles.sidebar}>Loading...</aside>;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <img
          src={`http://localhost:3000/${user?.avatar || 'uploads/avatar.webp'}`}
          //src={user?.avatar ? `/${user.avatar}` : userAvatar}
          alt={user?.fullName || 'Profile'}
          className={styles.profileImage}
        />
        <h2 className={styles.userName}>{user?.fullName || '—'}</h2>
        <p className={styles.userEmail}>{user?.email || '—'}</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input type="text" value={user?.fullName || ''} className={styles.input} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input type="email" value={user?.email || ''} className={styles.input} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <div className={styles.phoneInput}>
            <input type="tel" value={user?.phone || ''} className={styles.input} readOnly />
          </div>
        </div>

        <button className={styles.changePasswordButton}>
          <Lock size={18} />
          <span>Change Password</span>
        </button>

        <div className={styles.notificationSection}>
          <h3 className={styles.notificationTitle}>Notification Preferences</h3>
          <div className={styles.notificationItem}>
            <span className={styles.notificationLabel}>Email Notifications</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={user?.preferences?.newsletter || false} readOnly />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <span className={styles.notificationLabel}>SMS Notifications</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={user?.preferences?.smsAlerts || false} readOnly />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <button className={styles.saveButton}>Save Changes</button>
      </div>
    </aside>
  );
};

export default Sidebar;


