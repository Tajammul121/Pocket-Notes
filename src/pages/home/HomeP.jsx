import React, { useEffect, useState } from "react";
import styles from "./homep.module.css";
import { Sidebar } from "../../components/JSX/Sidebar"
import { Landing } from "../../components/JSX/Landing";
import { GroupS } from "../../components/JSX/GroupS";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [windowWith, setWindowWith] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { currentActiveGroup } = useSelector((note) => note.note);

  const isCurrGrpNull = currentActiveGroup === null;

  return (
    <div className={styles.container}>
      <div
        className={styles.left_container}
        style={{ display: isCurrGrpNull || (windowWith < 720 && "none") }}
      >
        <Sidebar />
      </div>

      {!currentActiveGroup ? (
        <div className={styles.right_container}>
          <Landing />
        </div>
      ) : (
        (currentActiveGroup || windowWith > 719) && (
          <div className={styles.right_container} style={{ display: "block" }}>
            <GroupS />
          </div>
        )
      )}
    </div>
  );
}
