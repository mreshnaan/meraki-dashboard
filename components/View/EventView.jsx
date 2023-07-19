import React from "react";
import DataTable from "../Table/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus, FaSyncAlt } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";
import EventForm from "../Forms/EventForm";
import DeleteForm from "../Forms/DeleteForm";
import useGetQuery from "../Hooks/useGetQuery";

import {
  handleEventCreate,
  handleEventDelete,
  handleEventUpdate,
} from "../Handlers/EventHandlers";

function EventView() {
  const heading = "Events";
  const fetchDataURL = "/api/events/view";
  const filterOptions = ["name", "eventDate"];

  const textColor = useColorModeValue("black", "white");

  const { data, isLoading, refetch } = useGetQuery(fetchDataURL);

  const modalConfig = [
    {
      title: "Add Event",
      action: "Create",
      icon: <FaPlus color={textColor} />,
      type: "ghost",
      component: EventForm,
      handler: handleEventCreate,
    },
    {
      action: "View",
      icon: <FaEye color={textColor} />,
      type: "ghost",
      component: EventForm,
      // handler: handleEventView,
    },
    {
      action: "Update",
      icon: <FaEdit color={textColor} />,
      type: "ghost",
      component: EventForm,
      handler: handleEventUpdate,
    },
    {
      action: "Delete",
      icon: <FaTrashAlt color={textColor} />,
      type: "ghost",
      component: DeleteForm,
      handler: handleEventDelete,
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
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
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
        modalConfig={modalConfig}
        refetch={refetch}
      />
    </>
  );
}

export default EventView;
