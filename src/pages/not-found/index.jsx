import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  return (
    <div>
      <h1>Ops... Não encontramos essa página.</h1>
      <button onClick={goBack}>Voltar para a tela inicial</button>
    </div>
  );
}
