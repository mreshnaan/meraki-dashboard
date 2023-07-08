import { toast } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import { Flex } from "@chakra-ui/react";

export const handleTicketCreate = async (values, refetch, close, jwt) => {
  console.log(values);
  try {
    const response = await fetch("/api/tickets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        event: values.event.id,
        ticketType: values.ticketType.id,
        comment: values.comment,
        fullName: values.fullName,
        email: values.email,
        qty: values.qty,
      }),
    });
    if (response.ok) {
      const { data } = await response.json();
      const link = `${process.env.NEXT_PUBLIC_DOMAIN}/purchase/tickets/${data.link}`;
      toast.success(
        <Flex justifyContent={"center"} alignItems={"center"}>
          <div>Purchase successful! Click the button to copy the link:</div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              toast.success("Link copied to clipboard!");
            }}
          >
            <MdContentCopy />
          </button>
        </Flex>
      );

      refetch();
    } else {
      const error = await response.json();
      throw new Error(error.data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
  close();
};

export const handleTicketUpdate = async (values, refetch, close, jwt) => {
  console.log(values);
  try {
    const response = await fetch(
      `/api/events/tickets/adminupdate/${values._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          event: values.event.id,
          ticketType: values.ticketType.id,
          seller: values.seller.id,
        }),
      }
    );
    if (response.ok) {
      toast.success("Successfully Updated");
      refetch();
    } else {
      const error = await response.json();
      throw new Error(error.data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
  close();
};

export const handleTicketDelete = async (values, refetch, close, jwt) => {
  console.log(values);
};
