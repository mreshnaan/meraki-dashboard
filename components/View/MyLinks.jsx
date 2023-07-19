/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import DataTable from "../Table/DataTable";
import useGetQuery from "../Hooks/useGetQuery";

import { JwtContext } from "../Contexts/authContext";
import useGetQueryWithJwt from "../Hooks/useGetQueryWithJwt";

function MyLinks() {
  const jwt = useContext(JwtContext);

  const heading = "My Links ";
  const fetchDataURL = "/api/tickets/mylinks";
  const filterOptions = ["event.name", "ticketType.name"];

  const { data, isLoading, refetch } = useGetQuery(fetchDataURL, jwt && jwt);

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
      title: "Links",
      type: "link",
      dataIndex: "secret",
      key: "secret",
    },
  ];

  return (
    <>
      {jwt && (
        <DataTable
          isFilter={true}
          title={heading}
          loading={isLoading}
          filterOptions={filterOptions}
          data={data}
          columnFields={columns}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default MyLinks;
