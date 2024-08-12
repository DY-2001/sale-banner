import styles from "./Banner.module.css";
import { useContext, useEffect } from "react";
import { BannerContext } from "../../App";
import CountDownTimer from "../countDownTimer/CountDownTimer";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const { initBanner, setInitBanner } = useContext(BannerContext);

  const { bannerVisibility, bannerEndTime, bannerLink, bannerDescription } =
    initBanner;

  const handleEdit = () => {
    navigate("/dashboard");
  };

  const handleVisibility = (e) => {
    const visibility = e.target.value === "1";
    setInitBanner({
      ...initBanner,
      bannerVisibility: visibility,
    });
  };

  useEffect(() => {
    const fetchBannerData = async () => {
      const response = await fetch("http://localhost:5000/banner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setInitBanner(data[0]);
    };
    fetchBannerData();
  }, []);

  if (!bannerLink) {
    return (
      <div className={styles.noBanner}>
        <div>No Banner Found</div>
        <button onClick={handleEdit} className={styles.addButton}>
          Add Banner
        </button>
      </div>
    );
  }

  if (bannerEndTime < new Date().getTime()) {
    return (
      <div className={styles.noBanner}>
        <div>Banner Expired</div>
        <button onClick={handleEdit} className={styles.addButton}>
          Add Banner
        </button>
      </div>
    );
  }

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.toggleVisibility}>
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          value={bannerVisibility ? 1 : 0}
          onChange={(e) => handleVisibility(e)}
          className={styles.toggleInput}
        />
        <label> Banner Visibility</label>
      </div>
      <div
        style={{
          backgroundImage: `url(${bannerLink})`,
          opacity: bannerVisibility ? 1 : 0,
        }}
        className={styles.banner}
      ></div>
      <button onClick={handleEdit} className={styles.editButton}>
        Edit Banner
      </button>
      <CountDownTimer bannerEndTime={bannerEndTime} />
      <div className={styles.description}>{bannerDescription}</div>
    </div>
  );
};

export default Banner;
