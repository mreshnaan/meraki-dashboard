import { Box, Flex } from "@chakra-ui/react";
import Layout from "../../components/MainLayout";
import TicketView from "../../components/View/TicketView";
import TicketTypeView from "../../components/View/TicketTypeView";
import MyTicketsView from "../../components/View/MyTicketsView";
import MyLinks from "../../components/View/MyLinks";
import CustomTab from "../../components/CustomTab";
import { useMemo } from "react";

export default function Tickets() {

  const tabs = useMemo(() => [
    {
      title: "Tickets",
      view: <TicketView />,
    },
    {
      title: "Ticket Type",
      view: <TicketTypeView />,
    },
    {
      title: "My Tickets",
      view: <MyTicketsView />,
    },
    {
      title: "My Links",
      view: <MyLinks />,
    },
  ], []);
  
  return (
    <>
      <Layout>
        <Flex flexDirection="column" pt={{ base: "20px", md: "10px" }}>
          <CustomTab tabs={tabs} />
        </Flex>
      </Layout>
    </>
  );
}
