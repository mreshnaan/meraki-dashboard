import React, { useContext } from "react";
import DataTable from "../Table/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
import TicketForm from "../Forms/TicketForm";
import useGetQuery from "../Hooks/useGetQuery";

import {
  handleTicketCreate,
  handleTicketDelete,
  handleTicketUpdate,
} from "../Handlers/TicketHandler";

function TicketView() {
  const heading = "Tcikets";
  const fetchDataURL = "/api/tickets/viewall";
  const filterOptions = ["ticketType.name", "ticketType.price"];

  const textColor = useColorModeValue("black", "white");

  const { data, isLoading, refetch } = useGetQuery(fetchDataURL);

  const actionConfig = [
    {
      title: "Add Ticket",
      action: "Create",
      icon: <FaPlus color={textColor} />,
      type: "ghost",
      component: TicketForm,
      handler: handleTicketCreate,
    },
    {
      action: "View",
      icon: <FaEye color={textColor} />,
      type: "ghost",
      component: TicketForm,
      // handler: handleTicketView,
    },
    {
      action: "Update",
      icon: <FaEdit color={textColor} />,
      type: "ghost",
      component: TicketForm,
      handler: handleTicketUpdate,
    },
    {
      action: "Delete",
      icon: <FaTrashAlt color={textColor} />,
      type: "ghost",
      component: TicketForm,
      handler: handleTicketDelete,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Event Name",
      dataIndex: ["event", "name"],
      key: "event.name",
    },
    {
      title: "Ticket Type",
      dataIndex: ["ticketType", "name"],
      key: "ticketType.name",
    },
    {
      title: "Seller",
      dataIndex: ["seller", "fullName"],
      key: "seller.fullName",
    },
    {
      title: "Price",
      dataIndex: ["ticketType", "price"],
      key: "ticketType.price",
    },
    {
      title: "Ticket Owner",
      dataIndex: ["ticketOwner", "fullName"],
      key: "ticketOwner.fullName",
    },
    {
      title: "Ticket Holder",
      dataIndex: ["ticketHolder", "fullName"],
      key: "ticketHolder.fullName",
    },
  ];

  return (
    <>
      <DataTable
        isFilter={true}
        filterOptions={filterOptions}
        title={heading}
        loading={isLoading}
        data={data}
        columnFields={columns}
        actionConfig={actionConfig}
        refetch={refetch}
      />
    </>
  );
}

export default TicketView;
