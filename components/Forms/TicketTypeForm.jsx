import {
  Box,
  Grid,
  GridItem,
  FormLabel,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { DatePicker, Form } from "antd";
import InputField from "../Fields/InputField";
import { useContext, useEffect, useState } from "react";
import { fetchEventData } from "../Data/Fetch";
import CustomAutoComplete from "../Fields/CustomAutoComplete";
import { JwtContext } from "../Contexts/authContext";

function TicketTypeForm({ active, refetch, record, handler, close }) {
  const textColor = useColorModeValue("gray", "white");

  const isView = active.toLowerCase() === "view";
  const isUpdate = active.toLowerCase() === "update";

  const jwt = useContext(JwtContext);
  const jwtToken = !isView && jwt;

  const [eventOptions, setEventOptions] = useState([]);

  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    fetchEventData(setEventOptions);
  }, []);

  const onFinish = async (values) => {
    await handler({ ...values, event: eventDetails }, refetch, close, jwtToken);
  };

  const initialValues = {
    _id: record ? record._id : "",
    name: record ? record.name : "",
    event: record ? record.event?.name : "",
    price: record ? record.price : "",
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      style={{
        color: textColor,
      }}
    >
      <Box p={4}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          {record && (
            <GridItem colSpan={12}>
              <InputField
                disable={record}
                label={"Type ID"}
                name={"_id"}
                type={"text"}
              />
            </GridItem>
          )}
          <GridItem colSpan={12}>
            <InputField
              disable={isView}
              label={"Ticket Type Name"}
              name={"name"}
              message={"Please enter the Ticket Type Name"}
              placeholder={"Enter your Ticket Type Name"}
              type={"text"}
            />
          </GridItem>
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
          <GridItem colSpan={12}>
            <InputField
              disable={isView}
              label={"Price"}
              name={"price"}
              message={"Please enter the Price"}
              placeholder={"Enter your Price"}
              type={"number"}
            />
          </GridItem>
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

export default TicketTypeForm;
