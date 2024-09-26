import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import styles from "./styles.module.css";

export default function HotelRegister({
  isOpen,
  onClose,
  initialData = {},
  onSave,
  title = "Cadastrar Hotel",
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    location: initialData?.location || "",
    rating: initialData?.rating || "",
    url: initialData?.url || "",
    description: initialData?.description || "",
  });

  const [errors, setErrors] = useState({});

  function validateForm() {
    let hasErrors = false;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório.";
      hasErrors = true;
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = "Preço deve ser um valor positivo.";
      hasErrors = true;
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Avaliação deve ser entre 1 e 5.";
      hasErrors = true;
    }
    if (!formData.location) {
      newErrors.location = "Local é obrigatório.";
      hasErrors = true;
    }
    if (!formData.url) {
      newErrors.url = "URL da imagem é obrigatório.";
      hasErrors = true;
    }
    if (!formData.description) {
      newErrors.description = "Descrição é obrigatória.";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  }

  function handleSave() {
    if (validateForm()) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        url_image: formData.url,
      });
      onClose();
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.container_modal}>
        <h3>{title}</h3>
        <input
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          placeholder="Nome do hotel"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <div className={styles.row}>
          <input
            type="number"
            value={formData.price}
            onChange={(event) =>
              setFormData({ ...formData, price: event.target.value })
            }
            placeholder="Preço"
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}

          <input
            type="number"
            value={formData.rating}
            onChange={(event) =>
              setFormData({ ...formData, rating: event.target.value })
            }
            placeholder="Avaliação"
          />
          {errors.rating && <p className={styles.error}>{errors.rating}</p>}

          <input
            value={formData.location}
            onChange={(event) =>
              setFormData({ ...formData, location: event.target.value })
            }
            placeholder="Local"
          />
          {errors.location && <p className={styles.error}>{errors.location}</p>}
        </div>

        <input
          value={formData.url}
          onChange={(event) =>
            setFormData({ ...formData, url: event.target.value })
          }
          placeholder="URL da imagem"
        />
        {errors.url && <p className={styles.error}>{errors.url}</p>}

        <textarea
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
          placeholder="Descrição"
        ></textarea>
        {errors.description && (
          <p className={styles.error}>{errors.description}</p>
        )}

        <div className={styles.row}>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
}
