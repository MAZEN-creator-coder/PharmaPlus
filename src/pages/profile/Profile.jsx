import styles from './Profile.module.css';

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.greeting}>Hi Amr Tamer</p>
        <div className={styles.profileInfo}>
          <p>Welcome to your profile page!</p>
          <p>Here you can manage your account settings and preferences.</p>
        </div>
      </div>
    </div>
  );
}
