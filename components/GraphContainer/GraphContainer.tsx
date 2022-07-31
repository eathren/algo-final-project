import React, { useMemo, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Rider } from "../../types/Rider";
import { createTaxiGraph, TaxiGraph } from "../../Utils";

import { Config, names } from "unique-names-generator";
import RiderList from "../RiderList";

const config: Config = {
  dictionaries: [names],
};

const GraphContainer = () => {
  const [graphData, setGraphData] = useState<TaxiGraph>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [height, setHeight] = useState(20);
  const [width, setWidth] = useState(25);
  const [numRiders, setNumRiders] = useState(10);

  const [showNewRiderCard, setShowNewRiderCard] = useState(false);
  const [name, setName] = useState("");
  const mapClick = () => {
    // return Geolocation.getCurrentPosition();
  };

  // populates the inital graph, and any changes
  useMemo(() => {
    setGraphData(createTaxiGraph(height, width));
  }, [height, width]);

  const populateRiders = () => {
    const riders: Rider[] = [];
    for (let i = 0; i < numRiders; i++) {
      const newRider = createRandomRider();
      riders.push(newRider);
    }
    setRiders(riders);
  };

  const createRandomRider = () => {
    const numNodes = height * width;
    const node = Math.floor(Math.random() * numNodes).toString();
    const characterName: string = uniqueNamesGenerator(config);
    return { id: uuidv4(), name: characterName, node: node };
  };

  const clearRiders = () => {
    setRiders([]);
  };

  const onHeightChange = (event: { target: { value: any } }) => {
    setHeight(event.target.value);
  };

  const onWidthChange = (event: { target: { value: any } }) => {
    setWidth(event.target.value);
  };

  const onNumRidersChange = (event: { target: { value: any } }) => {
    setNumRiders(event.target.value);
  };

  const cyRef = React.useRef<cytoscape.Core | undefined>();
  if (typeof window !== "undefined") {
    return (
      <div className="max-h-screen grid grid-cols-5">
        <RiderList
          height={height}
          width={width}
          riders={riders}
          numRiders={numRiders}
          onHeightChange={onHeightChange}
          onWidthChange={onWidthChange}
          onNumRidersChange={onNumRidersChange}
          populateRiders={populateRiders}
          clearRiders={clearRiders}
        />

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

export default GraphContainer;
function uuidv4(): string {
  throw new Error("Function not implemented.");
}
function uniqueNamesGenerator(config: any): string {
  throw new Error("Function not implemented.");
}
