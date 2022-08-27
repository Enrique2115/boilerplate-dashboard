import { Button } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_HOST } from "src/Config/Constants";
import { DashboardLayout } from "src/layout/dashboard-layout";
import axiosInstance from "src/services/axiosInstance";
import eventBus from "src/utils/eventBus";

const Orders = () => {
  const [prueba, setPrueba] = useState();

  const handlePrueba = async () => {
    try {
      const url = `${API_HOST}/auth/prueba`;
      const { data, error } = await axiosInstance.get(url);

      setPrueba(data);
    } catch (error) {
      const _content =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(_content);

      setPrueba(_content);

      if (error.response && error.response.status === 403) {
        eventBus.dispatch("logout");
      }
    }
  };

  return (
    <DashboardLayout>
      Orders
      <Button color="secondary" onClick={() => handlePrueba()}>
        Hola
      </Button>
      {prueba}
    </DashboardLayout>
  );
};

export default Orders;
