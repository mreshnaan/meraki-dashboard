import { toast } from "react-hot-toast";
export const handleTicketTypeCreate = async (values, refetch, close, jwt) => {
  try {
    const response = await fetch("/api/events/tickettypes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        eventId: values.event.id,
        price: values.price,
        name: values.name,
      }),
    });
    if (response.ok) {
      toast.success("Successfully Created");
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

export const handleTicketTypeUpdate = async (values, refetch, close, jwt) => {
  try {
    const response = await fetch("/api/events/tickettypes/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        id: values._id,
        name: values.name,
        price: values.price,
      }),
    });
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

export const handleTicketTypeDelete = async (values, refetch, close, jwt) => {
  console.log(values);
  close();
};
