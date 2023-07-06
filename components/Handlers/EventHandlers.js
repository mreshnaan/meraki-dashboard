import { toast } from "react-hot-toast";

export const handleEventCreate = async (values, refetch, close, jwt) => {
  try {
    const response = await fetch("/api/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: values.name,
        imageUrl: values.imageUrl,
        eventDate: values.eventDate,
        venue: values.venue,
      }),
    });
    if (response.ok) {
      // const data = await response.json();
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

export const handleEventUpdate = async (values, refetch, close, jwt) => {
  try {
    const response = await fetch("/api/events/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        id: values._id,
        name: values.name,
        imageUrl: values.imageUrl,
        eventDate: values.eventDate,
        venue: values.venue,
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

export const handleEventDelete = async (values, refetch, close, jwt) => {
  console.log(values);
};
