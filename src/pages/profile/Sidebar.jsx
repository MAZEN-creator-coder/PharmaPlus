import { Lock } from 'lucide-react';
import styles from './Sidebar.module.css';
import userAvatar from '/user-avatar.png';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <img src={userAvatar} alt="Sarah Johnson" className={styles.profileImage} />
        <h2 className={styles.userName}>Sarah Johnson</h2>
        <p className={styles.userEmail}>sarah.johnson@example.com</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input 
            type="text" 
            value="Sarah Johnson" 
            className={styles.input}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input 
            type="email" 
            value="sarah.johnson@example.com" 
            className={styles.input}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <div className={styles.phoneInput}>
            <span className={styles.countryCode}>US</span>
            <input 
              type="tel" 
              value="+1 (555) 987-6543" 
              className={styles.input}
              readOnly
            />
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
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <span className={styles.notificationLabel}>SMS Notifications</span>
            <label className={styles.switch}>
              <input type="checkbox" />
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


