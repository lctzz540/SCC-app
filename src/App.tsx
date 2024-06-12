import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Multistep from "./Form";

function App() {
  return (
    <ChakraProvider>
      <div style={{ height: "90vh", width: "100%" }}>
        <Grid
          templateAreas={`
                  "nav main"
                  `}
          gridTemplateRows={"1fr "}
          gridTemplateColumns={"400px 1fr"}
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
          h="100vh"
          w="100%"
        >
          <GridItem pl="2" bg="gray.300" borderRadius={10} area={"nav"} h="90%">
            History
          </GridItem>
          <GridItem pl="2" area={"main"} w="700px">
            <Multistep />
          </GridItem>
        </Grid>
      </div>
    </ChakraProvider>
  );
}

export default App;
