import { Box, Flex } from "@chakra-ui/react";
import Layout from "../../components/MainLayout";
import UserView from "../../components/View/UserView";

export default function Users() {
  return (
    <>
      <Layout>
        <Flex flexDirection="column" pt={{ base: "20px", md: "10px" }}>
          <Box mt={"12px"}>
            <UserView />
          </Box>
        </Flex>
      </Layout>
    </>
  );
}
