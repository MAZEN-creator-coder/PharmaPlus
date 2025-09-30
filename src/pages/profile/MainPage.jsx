import Sidebar from './Sidebar';
import OrderHistory from './OrderHistory';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.app}>
      <div className={styles.mainContent}>
        <Sidebar />
        <OrderHistory />
      </div>
    </div>
  );
};

export default MainPage;


