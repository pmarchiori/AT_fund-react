import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/header";
import HotelRegister from "../hotel-register";
import styles from "./styles.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [visibilidadeModal, setVisibilidadeModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "",
    rating: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem("hotels");
    if (storedProducts) {
      const produtos = JSON.parse(storedProducts);
      const product = produtos.find((p) => p._id === parseInt(id));
      if (product) {
        setProductDetails(product);
        setFormData({
          name: product.name,
          price: product.price,
          location: product.location,
          rating: product.rating,
          url: product.url_image,
          description: product.description,
        });
      } else {
        notifyError("Hotel não encontrado.");
      }
    }
  }, [id]);

  function salvarEdicao(data) {
    const storedProducts = localStorage.getItem("hotels");
    if (storedProducts) {
      const produtos = JSON.parse(storedProducts);
      const updatedProducts = produtos.map((p) =>
        p._id === parseInt(id) ? { ...p, ...data, url_image: data.url } : p
      );
      localStorage.setItem("hotels", JSON.stringify(updatedProducts));
      setProductDetails({
        ...productDetails,
        ...data,
        url_image: data.url,
      });
      setVisibilidadeModal(false);
      notifySuccess("Hotel editado com sucesso.");
    }
  }

  function removerFavorito(id) {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const novosFavoritos = storedFavoritos.filter(
      (produto) => produto._id !== id
    );
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  }

  function excluirHotel() {
    const storedProducts = localStorage.getItem("hotels");
    if (storedProducts) {
      const produtos = JSON.parse(storedProducts);
      const updatedProducts = produtos.filter((p) => p._id !== parseInt(id));
      localStorage.setItem("hotels", JSON.stringify(updatedProducts));
      removerFavorito(parseInt(id));
      notifySuccess("Hotel excluído com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      notifyError("Erro ao excluir o hotel.");
    }
  }

  function notifySuccess(message) {
    toast.success(message);
  }

  function notifyError(message) {
    toast.error(message);
  }

  if (!productDetails) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Header />

      <div className={styles.content}>
        <div>
          <img src={productDetails.url_image} alt={productDetails.name} />
        </div>
        <div className={styles.details}>
          <p>{productDetails.name}</p>
          <p>{productDetails.location}</p>
          <p>R$ {productDetails.price}/dia</p>
          <p>{productDetails.rating}/5</p>
          <p>{productDetails.description}</p>

          <div className={styles.btn_container}>
            <button
              className={styles.editButton}
              onClick={() => setVisibilidadeModal(true)}
            >
              Editar Hotel
            </button>
            <button onClick={excluirHotel} className={styles.deleteButton}>
              Excluir Hotel
            </button>
          </div>
        </div>
      </div>

      <HotelRegister
        isOpen={visibilidadeModal}
        onClose={() => setVisibilidadeModal(false)}
        initialData={formData}
        onSave={salvarEdicao}
        title="Editar Hotel"
      />
    </div>
  );
}
