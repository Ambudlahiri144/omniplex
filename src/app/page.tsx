import styles from "@/styles/Home.module.css";
import AuthWrapper from "./AuthWrapper";
import MainPrompt from "../components/MainPrompt/MainPrompt";
import UpgradeButton from "@/components/UpgradeButton";

const Home = () => {
  return (
    <AuthWrapper>
      <div className={styles.main}>
        <div>
          <MainPrompt />
        </div>
        
        {/* This div positions the button at the bottom of the page */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '500px', padding: '0 20px' }}>
          <UpgradeButton />
        </div>
        
      </div>
    </AuthWrapper>
  );
};

export default Home;
