import React, { useState, useEffect } from "react";
import Field from "../Components/forms/Field";
import { Link } from "react-router-dom";
import InvoiceAPI from "../services/InvoiceAPI";
import Select from "../Components/forms/Select";
import CustomerAPI from "../services/CustomerAPI";
import { toast } from "react-toastify";
import FormContentLoader from "../Components/loaders/FormContentLoader";

const InvoicePage = ({ match, history }) => {
  const { id = "new" } = match.params;

  const [invoice, setInvoice] = useState({
    amout: "",
    customer: "",
    status: "SENT"
  });
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    amout: "",
    customer: "",
    status: ""
  });
  const [loading, setLoading] = useState(true);

  //Permet de récuperer tous les clients
  const fetchCustomers = async () => {
    try {
      const data = await CustomerAPI.findAll();
      setLoading(false);
      setCustomers(data);
      if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      toast.error("Impossible de charger les clients");
      history.replace("/invoices");
    }
  };

  //Permet de recuperer un Invoice a partir de son ID
  const fetchInvoice = async id => {
    try {
      const { amout, status, customer } = await InvoiceAPI.find(id);
      setLoading(false);
      setInvoice({ amout, status, customer: customer.id });
    } catch (error) {
      toast.error("Impossible de charger la facture demandée");
      history.replace("/invoices");
    }
  };

  //Dertimine si ou doit Créer ou modifier une Invoices
  useEffect(() => {
    fetchCustomers();
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  //Gestion des changement dans les inputs des formulaires
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        await InvoiceAPI.update(id, invoice);
        toast.success("La facture a bien été modifiée");
        history.replace("/invoices");
      } else {
        await InvoiceAPI.create(invoice);
        toast.success("La facture a bien été enregistrée");
        history.replace("/invoices");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, title }) => {
          apiErrors[propertyPath] = title;
        });
        setErrors(apiErrors);
      }
      toast.error("Des erreurs dans votre formulaire");
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'une facture</h1>) || (
        <h1>Modification d'une facture</h1>
      )}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Field
            name="amout"
            label="Montant"
            placeholder="Montant de la facture"
            value={invoice.amout}
            onChange={handleChange}
            error={errors.amout}
          />

          <Select
            name="customer"
            label="Client"
            value={invoice.customer}
            onChange={handleChange}
            error={errors.customer}
          >
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </Select>

          <Select
            name="status"
            label="Status"
            value={invoice.status}
            onChange={handleChange}
            error={errors.status}
          >
            <option value="SENT">Envoyée</option>
            <option value="PAID">Payée</option>
            <option value="CANCELLED">Annulée</option>
          </Select>

          <div className="form-group pt-5">
            <button className="btn btn-success" type="submit">
              Enregistrer
            </button>
            <Link to="/invoices">Retour aux factures</Link>
          </div>
        </form>
      )}
      {loading && <FormContentLoader />}
    </>
  );
};

export default InvoicePage;
