import React, { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { createTaxiGraph, TaxiGraph } from "../../Utils";
import RiderList from "../RiderList";

const MapView = () => {
  const [graphData, setGraphData] = useState<TaxiGraph>([]);

  useEffect(() => {
    setGraphData(createTaxiGraph(20, 25));
  }, []);

  const cyRef = React.useRef<cytoscape.Core | undefined>();

  const layout = { name: "cose-bilkent" };
  if (typeof window !== "undefined" && graphData.length) {
    return (
      <div className="max-h-screen grid grid-cols-5">
        <RiderList />
        <CytoscapeComponent
          cy={(cy) => (cyRef.current = cy)}
          className="col-span-4"
          elements={graphData}
          stylesheet={[
            {
              selector: "node",
              style: {
                width: 10,
                height: 10,
                shape: "rectangle",
              },
            },
            {
              selector: "edge",
              style: {
                width: 1.5,
                "target-arrow-color": "red",
                "target-arrow-shape": "triangle",
                "curve-style": "taxi",
              },
            },
          ]}
          style={{ width: "1920px", height: "1080px", margin: "20px" }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default MapView;
