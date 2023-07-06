import React, { useContext, useEffect, useState } from "react";
import DataTable from "../Table/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Spinner, useColorModeValue } from "@chakra-ui/react";
import UserForm from "../Forms/UserForm";
import useGetQuery from "../Hooks/useGetQuery";

import {
  handleUserCreate,
  handleUserDelete,
  handleUserUpdate,
} from "../Handlers/UserHandler";
import { JwtContext } from "../Contexts/authContext";
import useGetQueryWithJwt from "../Hooks/useGetQueryWithJwt";

function TicketTypesView() {
  const [isLoadingToken, setIsLoadingToken] = useState(false);

  const jwt = useContext(JwtContext);
  const heading = "Ticket Types";
  const fetchDataURL = "/api/auth/getusers";
  const filterOptions = ["fullName", "role"];

  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    setIsLoadingToken(true);
    if (jwt) {
      console.log(jwt);
      setIsLoadingToken(false);
    }
  }, [jwt]);

  const { data, isLoading, refetch } = useGetQueryWithJwt(fetchDataURL, jwt);

  const actionConfig = [
    {
      title: "Add Type",
      action: "Create",
      icon: <FaPlus color={textColor} />,
      type: "ghost",
      component: UserForm,
      handler: handleUserCreate,
    },
    {
      action: "View",
      icon: <FaEye color={textColor} />,
      type: "ghost",
      component: UserForm,
      // handler: handleTicketTypesView
    },
    {
      action: "Update",
      icon: <FaEdit color={textColor} />,
      type: "ghost",
      component: UserForm,
      handler: handleUserUpdate,
    },
    {
      action: "Delete",
      icon: <FaTrashAlt color={textColor} />,
      type: "ghost",
      component: UserForm,
      handler: handleUserDelete,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
    },
  ];

  return (
    <>
      {isLoadingToken ? (
        <Spinner size="xl" />
      ) : (
        <DataTable
          isFilter={true}
          filterOptions={filterOptions}
          title={heading}
          loading={isLoading ? isLoading : isLoadingToken}
          data={data}
          columnFields={columns}
          actionConfig={actionConfig}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default TicketTypesView;
