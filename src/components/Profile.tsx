import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

interface UserData {
  name: string;
  avatar_url: string;
}

export default function Profile() {
  const { level } = useContext(ChallengesContext);

  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const user = Cookies.getJSON("user");
    setUser(user);
  }, []);

  return (
    <div className={styles.profileContainer}>
      <img src={user?.avatar_url} alt="Lucas Gonçalves" />
      <div>
        <strong>{user?.name}</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
