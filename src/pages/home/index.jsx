import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Product from "../../components/product";
import HotelRegister from "../hotel-register";

import styles from "./styles.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [hotel, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    const storedHotels = localStorage.getItem("hotels");
    if (storedHotels) {
      const hotelsData = JSON.parse(storedHotels);
      console.log(hotelsData);
      setHotels(hotelsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hotels", JSON.stringify(hotel));
  }, [hotel]);

  function createHotel(newHotel) {
    const newHotelWithId = {
      ...newHotel,
      _id: Date.now(),
    };
    notifySuccess("Hotel criado com sucesso.");
    setHotels((prevHotels) => [...prevHotels, newHotelWithId]);
  }

  const filteredHotels = hotel.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const orderedHotels = [...filteredHotels].sort((a, b) => {
    if (sortCriteria === "price") {
      return a.price - b.price;
    } else if (sortCriteria === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  function notifySuccess(message) {
    toast.success(message);
  }

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Pesquisar hotéis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className={styles.sort_selector}
          >
            <option value="">Ordenar por:</option>
            <option value="price">Preço</option>
            <option value="rating">Classificação</option>
          </select>
        </div>

        <div className={styles.container_list}>
          {orderedHotels.map((produto) =>
            produto && produto._id ? (
              <Product key={produto._id} produto={produto} />
            ) : null
          )}
        </div>
      </div>

      <button
        className={styles.float_button}
        onClick={() => setModalVisibility(true)}
      >
        +
      </button>
      <HotelRegister
        isOpen={modalVisibility}
        onClose={() => setModalVisibility(false)}
        onSave={createHotel}
      />
    </div>
  );
}
