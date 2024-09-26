import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Meus Hotéis</h1>
      </Link>

      <Link to="/favorites">
        <button className={styles.favBtn}>Favoritos</button>
      </Link>
    </header>
  );
}
