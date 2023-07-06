import React from "react";
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

function TicketTypesView() {
  const heading = "Ticket Types";
  const fetchDataURL = "/api/events/tickettypes/viewall";
  const filterOptions = ["name", "event.name", "price"];

  const textColor = useColorModeValue("black", "white");

  const { data, isLoading, refetch } = useGetQuery(fetchDataURL);

  const actionConfig = [
    {
      title: "Add Type",
      action: "Create",
      icon: <FaPlus color={textColor} />,
      type: "ghost",
      component: TicketTypeForm,
      handler: handleTicketTypeCreate,
    },
    {
      action: "View",
      icon: <FaEye color={textColor} />,
      type: "ghost",
      component: TicketTypeForm,
      // handler: handleTicketTypesView
    },
    {
      action: "Update",
      icon: <FaEdit color={textColor} />,
      type: "ghost",
      component: TicketTypeForm,
      handler: handleTicketTypeUpdate,
    },
    {
      action: "Delete",
      icon: <FaTrashAlt color={textColor} />,
      type: "ghost",
      component: TicketTypeForm,
      handler: handleTicketTypeDelete,
    },
  ];

  const columns = [
    {
        title: "ID",
        dataIndex: "_id",
        key: "_id",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Event Name",
        dataIndex: ["event", "name"],
        key: "event.name",
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

export default TicketTypesView;
