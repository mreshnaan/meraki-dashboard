/* eslint-disable react/jsx-no-undef */
import {
  Box,
  Grid,
  GridItem,
  FormLabel,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select, Form } from "antd";
import InputField from "../Fields/InputField";
import { useEffect, useState } from "react";
import { fetchEventData } from "../Data/Fetch";
import CustomAutoComplete from "../Fields/CustomAutoComplete";

function UserForm({ modal, refetch, record, handler, close }) {
  const textColor = useColorModeValue("gray", "white");

  const isView = modal.toLowerCase() === "view";
  const isUpdate = modal.toLowerCase() === "update";

  const jwt = useContext(JwtContext);
  const jwtToken = !isView && jwt;

  const onFinish = async (values) => {
    await handler({ ...values, event: eventDetails }, refetch, close, jwtToken);
  };

  const initialValues = {
    _id: record ? record._id : "",
    fullname: record ? record.fullname : "",
    role: record ? record.role : "",
    email: record ? record.email : "",
    password: "",
    mobile: record ? record.mobile : "",
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
                label={"User ID"}
                name={"_id"}
                type={"text"}
              />
            </GridItem>
          )}
          <GridItem colSpan={12}>
            <InputField
              disable={isView}
              label={"Full Name"}
              name={"fullname"}
              message={"Please enter the Full Name"}
              placeholder={"Enter your Full Name"}
              type={"text"}
            />
          </GridItem>

          <GridItem colSpan={12}>
            <Form.Item
              label="User Role"
              name="role"
              rules={[{ required: true, message: "Please select your Role" }]}
            >
              <Select
                style={{
                  background: "transperant",
                  color: textColor,
                }}
                placeholder="Select a Role"
              >
                <Option value="ADMIN">ADMIN</Option>
                <Option value="CREW">CREW</Option>
                <Option value="GUEST">GUEST</Option>
                <Option value="TICKETING">TICKETING</Option>
              </Select>
            </Form.Item>
          </GridItem>
          <GridItem colSpan={12}>
            <InputField
              disable={isView}
              label={"E-mail"}
              name={"email"}
              message={"Please enter the E-mail"}
              placeholder={"Enter your E-mail"}
              type={"email"}
            />
          </GridItem>
          <GridItem colSpan={12}>
            <InputField
              disable={isView}
              label={"Password"}
              name={"password"}
              message={"Please enter the Password"}
              placeholder={"Enter your Password"}
              type={"password"}
            />
          </GridItem>
          <GridItem colSpan={12}>
            <InputField
              disable={isView}
              label={"Mobile Number"}
              name={"mobile"}
              message={"Please enter the Mobile Number"}
              placeholder={"Enter your Mobile Number"}
              type={"text"}
            />
          </GridItem>
        </Grid>

        {!isView && (
          <Box display="flex" justifyContent="end" mt={4}>
            <Button
              type="primary"
              htmltype="submit"
              bg={"teal.400"}
              _hover={{ bg: "teal.500" }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Form>
  );
}

export default UserForm;
