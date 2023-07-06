export const fetchEventData = async (setEventOptions) => {
  try {
    const response = await fetch("/api/events/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const { data } = await response.json();
      console.log("event : ", data);
      setEventOptions(
        data.map((item) => ({
          name: item.name,
          id: item._id,
          venue: item.venue,
          ticketTypes: item.ticketTypes,
        }))
      );
    } else {
      const error = await response.json();
      throw new Error(error.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTicketOptions = async (eventDetails, setTicketOptions) => {
  if (eventDetails) {
    try {
      const response = await fetch(`/api/events/byid/${eventDetails.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { data } = await response.json();
        setTicketOptions(
          data.ticketTypes.map((item) => ({
            name: item.name,
            id: item._id,
            price: item.price,
          }))
        );
      } else {
        const error = await response.json();
        throw new Error(error.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchSellerData = async (setSellerOptions, jwt) => {
  try {
    const response = await fetch("/api/auth/getticketsellers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.ok) {
      const { data } = await response.json();
      console.log("sellers :", data);
      setSellerOptions(
        data.map((item) => ({
          name: item.email,
          id: item._id,
          fullName: item.fullName,
        }))
      );
    } else {
      const error = await response.json();
      throw new Error(error.data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
