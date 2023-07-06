import { Box, Flex } from "@chakra-ui/react";
import Layout from "../../components/MainLayout";
import EventView from "../../components/View/EventView";

export default function Events() {
  return (
    <>
      <Layout>
        <Flex flexDirection="column" pt={{ base: "20px", md: "10px" }}>
          <Box mt={"12px"}>
            <EventView />
          </Box>
        </Flex>
      </Layout>
    </>
  );
}
