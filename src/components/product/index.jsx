import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function Product({ produto, removeFavorite }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(favorites.some((fav) => fav._id === produto._id));
  }, [produto._id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorited) {
      favorites = favorites.filter((fav) => fav._id !== produto._id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorited(false);
      removeFavorite(produto._id);
    } else {
      favorites.push(produto);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/detalhes/${produto._id}`}>
        <img src={produto.url_image} alt={produto.name} />
        <p>{produto.name}</p>
        <p>{produto.location}</p>
        <p>Avaliação: {produto.rating}/5</p>
        <p>A partir de: R$ {Number(produto.price).toFixed(2)}/dia</p>
      </Link>

      <button onClick={toggleFavorite} className={styles.favoriteButton}>
        {isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </div>
  );
}
