import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Product from "../../components/product";

import styles from "./styles.module.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((produto) => produto._id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2>Favoritos</h2>
        <div className={styles.container_list}>
          {favorites.length > 0 ? (
            favorites.map((produto) => {
              return (
                <Product
                  key={produto._id}
                  produto={produto}
                  removeFavorite={removeFavorite}
                />
              );
            })
          ) : (
            <p>Você ainda não favoritou nenhum hotel.</p>
          )}
        </div>
      </div>
    </div>
  );
}
