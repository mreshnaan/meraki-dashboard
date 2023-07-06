import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import InputField from "../Fields/InputField";
import CustomAutoComplete from "../Fields/CustomAutoComplete";
import {
  fetchEventData,
  fetchSellerData,
  fetchTicketOptions,
} from "../Data/Fetch";
import { JwtContext } from "../../components/Contexts/authContext";

function TicketForm({ active, refetch, record, handler, close }) {
  const jwtToken = useContext(JwtContext);

  const isView = active.toLowerCase() === "view";
  const isUpdate = active.toLowerCase() === "update";

  const [eventOptions, setEventOptions] = useState([]);
  const [ticketOptions, setTicketOptions] = useState([]);
  const [sellerOptions, setSellerOptions] = useState([]);

  const [eventDetails, setEventDetails] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);

  const prevEventDetailsRef = useRef(null);

  useEffect(() => {
    fetchEventData(setEventOptions);
    if (jwtToken) {
      fetchSellerData(setSellerOptions, jwtToken);
    }
  }, []);
  //check eventDetails is change
  useEffect(() => {
    if (prevEventDetailsRef.current !== eventDetails) {
      prevEventDetailsRef.current = eventDetails;
      if (eventDetails) {
        fetchTicketOptions(eventDetails, setTicketOptions);
      }
    }
  }, [eventDetails]);

  const onFinish = async (values) => {
    await handler(
      {
        ...values,
        event: eventDetails,
        ticketType: ticketDetails,
        seller: sellerDetails,
      },
      refetch,
      close,
      jwtToken
    );
  };

  const initialValues = {
    _id: record ? record._id : "",
    fullName: record ? record.ticketOwner?.fullName : "",
    email: record ? record.ticketOwner?.email : "",
    qty: record ? record.qty : "",
  };

  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Box p={4}>
        <Grid templateColumns={{ base: "1fr" }} gap={4}>
          {record && (
            <GridItem colSpan={12}>
              <InputField
                label={"Type ID"}
                name={"_id"}
                type={"text"}
                disable={record}
              />
            </GridItem>
          )}
          {eventOptions && (
            <GridItem colSpan={12}>
              <CustomAutoComplete
                disable={isView}
                setSelectedData={setEventDetails}
                label={"Event"}
                defaultValue={record ? record.event?.name : ""}
                data={eventOptions}
                fields={[
                  { label: "Event ID", valueKey: "_id" },
                  { label: "Event Venue", valueKey: "venue" },
                ]}
              />
            </GridItem>
          )}

          {eventDetails != null && (
            <GridItem colSpan={12}>
              <CustomAutoComplete
                disable={isView}
                setSelectedData={setTicketDetails}
                label={"Type"}
                defaultValue={record ? record.ticketType.name : ""}
                data={ticketOptions}
                fields={[
                  { label: "Ticket ID", valueKey: "_id" },
                  { label: "Ticket Price", valueKey: "price" },
                ]}
              />
            </GridItem>
          )}

          {isUpdate && (
            <>
              <GridItem colSpan={12}>
                <CustomAutoComplete
                  disable={isView}
                  setSelectedData={setSellerDetails}
                  label={"Seller"}
                  defaultValue={record ? record.ticketOwner?.email : ""}
                  data={sellerOptions}
                  fields={[
                    { label: "Seller ID", valueKey: "id" },
                    { label: "Seller Full Name", valueKey: "fullName" },
                  ]}
                />
              </GridItem>
            </>
          )}

          {!isUpdate && (
            <>
              <GridItem colSpan={6}>
                <InputField
                  disable={isView}
                  label={"Comment"}
                  name={"comment"}
                  message={"Please enter the Comment"}
                  placeholder={"Enter your Comment"}
                  type={"text"}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <InputField
                  disable={isView}
                  label={"Email"}
                  name={"email"}
                  message={"Please enter the E-mail"}
                  placeholder={"Enter your E-mail"}
                  type={"email"}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <InputField
                  disable={isView}
                  label={"Full Name"}
                  name={"fullName"}
                  message={"Please enter Full Name"}
                  placeholder={"Enter your Full Name"}
                  type={"text"}
                />
              </GridItem>
            </>
          )}

          {isView ||
            (!isUpdate && (
              <>
                <GridItem colSpan={6}>
                  <InputField
                    label={"Quantity"}
                    name={"qty"}
                    message={"Please enter Quantity Amount"}
                    placeholder={"Enter your Quantity Amount"}
                    type={"number"}
                  />
                </GridItem>
              </>
            ))}
        </Grid>

        {!isView && (
          <Box display="flex" justifyContent="end" mt={4}>
            <Button type="primary" htmltype="submit">
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Form>
  );
}

export default TicketForm;
