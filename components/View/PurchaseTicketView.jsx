import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { Box } from "@chakra-ui/react";
import InputField from "../Fields/InputField";

import { Form } from "antd";

function PurchaseTicketView() {
  const router = useRouter();
  const { secret } = router.query;
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/tickets/${secret}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const { data } = await response.json();
          setTicketData(data);
        } else {
          const error = await response.json();
          throw new Error(error.data.error);
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    if (secret) {
      fetchData();
    }
  }, [secret]);

  const handleSubmit = (ticketId, values) => {
    // Handle form submission for the specific ticket ID
    handleUpdateTicketHolers(ticketId, values);
  };

  const handleUpdateTicketHolers = async (id, values) => {
    try {
      const response = await fetch(`/api/tickets/updateholder/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          mobile: values.mobile,
        }),
      });
      if (response.ok) {
        toast.success("Successfully Updated the Ticket Holders");
        // router.reload("/dashboard/tickets");
      } else {
        const error = await response.json();
        throw new Error(error.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  function formatString(inputString) {
    const firstSix = inputString?.slice(0, 6);
    const middleEight = inputString?.slice(6, 16);
    const lastFour = inputString?.slice(-4);

    return `${firstSix}...${middleEight}...${lastFour}`;
  }

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"80%"}
        margin="30px"
      >
        <h1 style={{ fontSize: "2rem", padding: "0px", marginBottom: "4px" }}>
          Ticket Purchase Portal
        </h1>
        <h6 style={{ padding: "0px", marginBottom: "1rem" }}>
          {formatString(secret)}
        </h6>
        <Box
          width={"70%"}
          display="grid"
          gridTemplateColumns="repeat(2, minmax(300px, 1fr))"
          gap="20px"
          padding="20px"
        >
          {ticketData.map((ticket) => (
            <Box
              key={ticket._id}
              border="1px solid #ccc"
              padding="20px"
              marginTop="1rem"
              marginBottom="1rem"
              borderRadius="16px"
              textAlign="center"
            >
              <h4>Ticket ID: {ticket._id}</h4>
              <p>Ticket Owner: {ticket.ticketOwner?.fullName}</p>
              <p>Email: {ticket.ticketOwner?.email}</p>
              <Form
                onFinish={(values) => handleSubmit(ticket._id, values)}
                initialValues={
                  ticket.ticketHolder
                    ? {
                        fullName: ticket.ticketHolder?.fullName,
                        email: ticket.ticketHolder?.email,
                        mobile: ticket.ticketHolder?.mobile,
                      }
                    : null
                }
              >
                <Box p={4}>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={4}
                  >
                    <GridItem colSpan={12}>
                      <InputField
                        label={"Full Name"}
                        name={"fullName"}
                        message={"Please enter the Full Name"}
                        placeholder={"Enter your Full Name"}
                        type={"text"}
                      />
                    </GridItem>
                    <GridItem colSpan={12}>
                      <InputField
                        label={"E-mail"}
                        name={"email"}
                        message={"Please enter the E-mail"}
                        placeholder={"Enter your E-mail"}
                        type={"email"}
                      />
                    </GridItem>
                    <GridItem colSpan={12}>
                      <InputField
                        required={false}
                        label={"Mobile"}
                        name={"mobile"}
                        message={"Please enter the Mobile Number"}
                        placeholder={"Enter your Mobile Number"}
                        type={"text"}
                      />
                    </GridItem>
                  </Grid>

                  <Box display="flex" justifyContent="end" mt={4}>
                    <Button
                      type="submit"
                      htmltype="submit"
                      bg={"teal.400"}
                      _hover={{ bg: "teal.500" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Form>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default PurchaseTicketView;
