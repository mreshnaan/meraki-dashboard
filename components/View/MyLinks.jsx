/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import DataTable from "../Table/DataTable";
import useGetQuery from "../Hooks/useGetQuery";

import { JwtContext } from "../Contexts/authContext";
import useGetQueryWithJwt from "../Hooks/useGetQueryWithJwt";
import { Button } from "antd";
import { MdContentCopy } from "react-icons/md";

function MyLinks() {
  const jwt = useContext(JwtContext);

  const heading = "My Links ";
  const fetchDataURL = "/api/tickets/mylinks";
  const filterOptions = ["event.name", "ticketType.name"];

  const { data, isLoading, refetch } = useGetQueryWithJwt(fetchDataURL, jwt);

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
        title={heading}
        loading={isLoading}
        filterOptions={filterOptions}
        data={data}
        columnFields={columns}
        refetch={refetch}
      />
    </>
  );
}

export default MyLinks;
