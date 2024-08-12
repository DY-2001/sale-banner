import styles from "./Dashboard.module.css";
import { useContext, useState } from "react";
import { BannerContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigator = useNavigate();
  const { initBanner, setInitBanner } = useContext(BannerContext);
  const {
    bannerLink: initBannerLink,
    bannerDescription: initDescription,
    bannerEndTime: initEndTime,
    bannerVisibility: initVisibility,
  } = initBanner;

  const [bannerLink, setBannerLink] = useState(initBannerLink);
  const [description, setDescription] = useState(initDescription);
  const [endTime, setEndTime] = useState(initEndTime);
  const [visibility, setVisibility] = useState(initVisibility);

  const handleEndTimeChange = (e) => {
    const selectedDateTime = e.target.value;
    const timestamp = new Date(selectedDateTime).getTime();
    setEndTime(timestamp);
  };

  const handleSaveBannerDetails = () => {
    const saveBannerData = async () => {
      await fetch("http://localhost:5000/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannerLink,
          bannerDescription: description,
          bannerEndTime: endTime,
          bannerVisibility: visibility,
        }),
      });
    };

    saveBannerData();
    navigator("/");
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardContainer}>
        <label className={styles.inputLabel}>Banner Url</label>
        <input
          type="text"
          placeholder="link ..."
          value={bannerLink}
          onChange={(e) => setBannerLink(e.target.value)}
          className={styles.inputField}
        />

        <label className={styles.inputLabel}>Banner Description</label>
        <input
          type="text"
          placeholder="description ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.inputField}
        />

        <label className={styles.inputLabel}>Banner End Time</label>
        <input
          type="datetime-local"
          value={new Date(endTime).toISOString().slice(0, 16)}
          onChange={handleEndTimeChange}
          className={styles.inputField}
        />

        <div className={styles.checkBox}>
          <input
            type="checkbox"
            checked={visibility}
            onChange={() => setVisibility(!visibility)}
            name="visibility"
          />
          <label className={styles.inputLabel}>Banner visibility</label>
        </div>
        <button onClick={handleSaveBannerDetails} className={styles.saveButton}>
          save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
