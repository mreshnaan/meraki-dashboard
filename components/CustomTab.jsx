import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";



function CustomTab({tabs}) {
  return (
    <Tabs variant="unstyled" size="sm" isLazy>
      <TabList
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        margin="0px"
        padding="0px"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            _selected={{
              color: "#2d3748",
              borderBottom: "3px solid #2d3748",
            }}
            _focus={{
              boxShadow: "none",
            }}
            _hover={{
              color: "#2d3748",
              borderBottom: "3px solid #2d3748",
            }}
            borderBottom="3px solid transparent"
            padding="1rem"
            fontSize="16px"
            fontWeight="bold"
            cursor="pointer"
            outline="none"
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel pl={"0px"} key={index}>{tab.view}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default CustomTab;
