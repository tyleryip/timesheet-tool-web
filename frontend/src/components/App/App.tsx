import React from "react";
import SnackbarProvider from "react-simple-snackbar";
import Layout from "../Layout/Layout";

export default function App() {
  return (
    <SnackbarProvider>
      <Layout />
    </SnackbarProvider>
  );
}
