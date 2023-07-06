import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import Layout from "../../../components/MainLayout";
import PurchaseTicketView from "../../../components/View/PurchaseTicketView";

export default function TicketPurchase() {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <>
      <Box
        display={"flex"}
        w="full"
        h={{ sm: "100%", xl: "100%" }}
        minHeight={"100vh"}
        alignItems={"center"}
        flexDirection={"column"}
        bg={"#1f2733"}
        color={textColor}
        transition={"all .3s ease"}
      >
        <PurchaseTicketView />
      </Box>
    </>
  );
}
