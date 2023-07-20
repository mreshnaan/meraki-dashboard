/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import DataTable from "../Table/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
import TicketTypeForm from "../Forms/TicketTypeForm";
import useGetQueryWithJwt from "../Hooks/useGetQueryWithJwt";

import {
  handleTicketTypeCreate,
  handleTicketTypeDelete,
  handleTicketTypeUpdate,
} from "../Handlers/TicketTypeHandler";
import { JwtContext } from "../Contexts/authContext";
import { Button } from "antd";
import { MdContentCopy } from "react-icons/md";

function MyTicketsView() {
  const jwt = useContext(JwtContext);
  const heading = "My Tickets ";
  const fetchDataURL = "/api/tickets/viewmytickets";
  const filterOptions = ["event.name", "ticketType.name"];

  const textColor = useColorModeValue("black", "white");

  const { data, isLoading, refetch } = useGetQueryWithJwt(fetchDataURL, jwt);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
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
      title: "ticketHolder",
      dataIndex: ["ticketHolder", "fullName"],
      key: "ticketHolder.fullName",
    },
    {
      title: "Links",
      key: "secret",
      dataIndex: "secret",
      render: (_, { secret }) => {
        const link = `${process.env.NEXT_PUBLIC_DOMAIN}/purchase/tickets/${secret}`;
        return (
          <Button
            ghost
            icon={<MdContentCopy />}
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Link copied to clipboard!");
            }}
          >
            Copy the Link
          </Button>
        );
      },
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
        refetch={refetch}
      />
    </>
  );
}

export default MyTicketsView;
