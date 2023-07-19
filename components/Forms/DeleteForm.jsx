import { Button } from "antd";
import React from "react";

function DeleteForm({ refetch, record, handler, close }) {
  const handleDelete = async () => {
    await handler(record, refetch, close, jwtToken);
  };
  return (
    <>
      <h1>Are you sure you want to delete this ?</h1>
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Button
          key="cancel"
          style={{
            width: "100px",
            height: "40px",
          }}
          onClick={close}
        >
          Cancel
        </Button>

        <Button
          key="delete"
          style={{
            width: "100px",
            height: "40px",
          }}
          type="primary"
          htmltype="submit"
          danger
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default DeleteForm;
