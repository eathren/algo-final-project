import { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { createTaxiGraph, TaxiGraph } from "../../Utils";
import RiderList from "../RiderList";

const MapView = () => {
  const [graphData, setGraphData] = useState<TaxiGraph>([]);

  useEffect(() => {
    setGraphData(createTaxiGraph(20, 20));
  }, []);

  if (typeof window !== "undefined" && graphData.length) {
    return (
      <div>
        <RiderList />
        <CytoscapeComponent
          elements={graphData}
          style={{ width: "1920px", height: "1080px", margin: "20px" }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default MapView;
