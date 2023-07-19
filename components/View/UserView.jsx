import React, { useContext, useEffect, useState } from "react";
import DataTable from "../Table/DataTable";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Spinner, useColorModeValue } from "@chakra-ui/react";
import UserForm from "../Forms/UserForm";
import DeleteForm from "../Forms/DeleteForm";


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

  //wait till get the jwt token in local storage
  useEffect(() => {
    setIsLoadingToken(true);
    if (jwt) {
      setIsLoadingToken(false);
    }
  }, [jwt]);

  const { data, isLoading, refetch } = useGetQueryWithJwt(fetchDataURL, jwt);

  const modalConfig = [
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
      component: DeleteForm,
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
      <DataTable
        isFilter={true}
        filterOptions={filterOptions}
        title={heading}
        loading={isLoading || isLoadingToken ? isLoading : isLoadingToken}
        data={data}
        columnFields={columns}
        modalConfig={modalConfig}
        refetch={refetch}
      />
    </>
  );
}

export default TicketTypesView;
