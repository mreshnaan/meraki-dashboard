/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import DataTable from "../Table/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
import TicketTypeForm from "../Forms/TicketTypeForm";
import useGetQuery from "../Hooks/useGetQuery";

import {
  handleTicketTypeCreate,
  handleTicketTypeDelete,
  handleTicketTypeUpdate,
} from "../Handlers/TicketTypeHandler";
import { JwtContext } from "../Contexts/authContext";

function MyTicketsView() {
  const jwt = useContext(JwtContext);
  const heading = "My Tickets ";
  const fetchDataURL = "/api/tickets/viewmytickets";
  const filterOptions = ["name", "event.name", "price"];

  const textColor = useColorModeValue("black", "white");

  const { data, isLoading, refetch } = useGetQuery(fetchDataURL, jwt && jwt);

  // const actionConfig = [
  //   {
  //     title: "Add Type",
  //     action: "Create",
  //     icon: <FaPlus color={textColor} />,
  //     type: "ghost",
  //     component: TicketTypeForm,
  //     handler: handleTicketTypeCreate,
  //   },
  //   {
  //     action: "View",
  //     icon: <FaEye color={textColor} />,
  //     type: "ghost",
  //     component: TicketTypeForm,
  //     // handler: handleMyTicketsView
  //   },
  //   {
  //     action: "Update",
  //     icon: <FaEdit color={textColor} />,
  //     type: "ghost",
  //     component: TicketTypeForm,
  //     handler: handleTicketTypeUpdate,
  //   },
  //   {
  //     action: "Delete",
  //     icon: <FaTrashAlt color={textColor} />,
  //     type: "ghost",
  //     component: TicketTypeForm,
  //     handler: handleTicketTypeDelete,
  //   },
  // ];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Seller",
      dataIndex: ["seller", "fullName"],
      key: "seller.fullName",
    },
    {
      title: "Event",
      dataIndex: ["event", "name"],
      key: "event.name",
    },
    {
      title: "Type",
      dataIndex: ["ticketType", "name"],
      key: "ticketType.name",
    },
    {
      title: "Ticket Owner",
      dataIndex: ["ticketOwner", "fullName"],
      key: "ticketOwner.fullName",
    },
    {
      title: "ticketHolder",
      dataIndex: ["ticketHolder", "fullName"],
      key: "ticketHolder.fullName",
    },
  ];

  return (
    <>
      {data && jwt && (
        <DataTable
          isFilter={true}
          filterOptions={filterOptions}
          title={heading}
          loading={isLoading}
          data={data}
          columnFields={columns}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default MyTicketsView;
