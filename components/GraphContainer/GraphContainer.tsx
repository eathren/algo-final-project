// @ts-nocheck

import cytoscape from "cytoscape";
import React, { useEffect, useMemo, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Config, names, uniqueNamesGenerator } from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";
import { Rider, Taxi, Variant } from "../../types";
import {
  BackendFormatNode,
  createTaxiGraph,
  TaxiGraph,
} from "../../utils/utils";
import RiderList from "../RiderList";

const config: Config = {
  dictionaries: [names],
};

const GraphContainer = () => {
  const [graphData, setGraphData] = useState<TaxiGraph>([]);
  const [vertices, setVertices] = useState<BackendFormatNode[] | any>([]);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [numTaxis, setNumTaxis] = useState(5);
  const [height, setHeight] = useState(12);
  const [width, setWidth] = useState(12);
  const [numRiders, setNumRiders] = useState(20);
  const [groups, setGroups] = useState<any[]>([]);
  const [order, setOrder] = useState<any[]>([]);
  const [path, setPath] = useState([]);

  // populates the inital graph, and any changes

  useEffect(() => {
    cyRef?.current?.nodes('[id = "0"]').style("background-color", "red");
  });

  // useEffect(() => {
  // cyRef?.current?.nodes("[id  = *").style("background-color", "grey");
  // }, [riders, taxis, height, width]);

  const getOrders = async () => {
    const outputData = JSON.stringify({
      numOfCabs: numTaxis,
      numPerCar: 4,
      source: { name: "0", x: 0, y: 0 },
      vertices: vertices,
    });

    const fetchedOrder = await fetch(
      "https://path-backend-service.herokuapp.com/path/getPaths",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: outputData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      });
    return fetchedOrder;
  };

  const calculatePaths = async () => {
    if (numTaxis == 0 || !graphData || numRiders == 0) return;
    await getOrders();
  };

  useEffect(() => {
    // iter through order arrays for who goes in what cab
    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < order[i].length; j++) {
        if (order[i].length > j + 1) {
          const n = order[i][j].name;
          if (n == null) console.log("NULL");
          if (!n) console.log("UNDEFINED");
          if (n == 0) console.log("ZERO");
          console.log("name", order[i][j].name);
          // undefined check
          if (order[i][j].name && order[i][j + 1].name) {
            // highlight path
            const searchPath = cyRef?.current?.elements().aStar({
              root: `#${order[i][j].name}`,
              goal: `#${order[i][j + 1].name}`,
              directed: true,
            });
            console.log(searchPath);
            if (searchPath) {
              searchPath.path.select();
            }
          }
        }
      }
    }
  });

  // generates all riders
  // Adds their data to send to the api with x,y, and node dest name
  const populateRiders = () => {
    const riders: Rider[] = [];
    for (let i = 0; i < numRiders; i++) {
      const newRider = createRandomRider();
      riders.push(newRider);
    }
    setRiders(riders);
  };

  // creates 1 rider, random
  const createRandomRider = () => {
    const numNodes = height * width - 1;
    const source = "0";
    // const source = Math.floor(Math.random() * numNodes).toString();
    const characterName: string = uniqueNamesGenerator(config);
    const color = "#b0c4de";
    const destination = Math.floor(Math.random() * numNodes).toString();
    const currNode = graphData
      .slice(0, height * width - 1)
      .find((node) => node.data.id === destination);
    // console.log(currNode);
    setVertices([
      ...vertices,
      {
        name: currNode?.data.id,
        x: currNode?.position.x,
        y: currNode?.position.y,
      },
    ]);
    return {
      id: uuidv4(),
      name: characterName,
      source: source,
      destination: destination,
      color: color,
      variant: Variant.rider,
    };
  };

  // creates 1 taxi. Taxi capacity is static.
  const createRandomTaxi = () => {
    const source = 0;
    const characterName: string = uniqueNamesGenerator(config);
    const color = "#ffff00";
    return {
      id: uuidv4(),
      name: characterName,
      source: source.toString(),
      color: color,
      variant: Variant.taxi,
      capacity: 4,
      carrying: 0,
    };
  };

  // creates all taxis
  const populateTaxis = () => {
    const taxis: Taxi[] = [];
    for (let i = 0; i < numTaxis; i++) {
      const newTaxi = createRandomTaxi();
      taxis.push(newTaxi);
    }
    setTaxis(taxis);
  };

  // bunch of state sent to presentational sidebar component.
  // state is lifted up from there, so user interaction fires and
  // modifies state.
  const clearRiders = () => {
    setRiders([]);
  };

  const clearTaxis = () => {
    setTaxis([]);
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

  const onNumTaxisChange = (event: { target: { value: any } }) => {
    setNumTaxis(event.target.value);
  };
  // end lifted state

  // initial setup of graph.
  useMemo(() => {
    setRiders([]);
    setTaxis([]);
    const d = createTaxiGraph(height, width);
    setGraphData(d[0]);
  }, [height, width]);

  // react cytoscape uses this ref to modify the graph. node colors, etc.
  const cyRef = React.useRef<cytoscape.Core | undefined>();

  // nextjs is ssr. Cytoscape is not. Ensure window exists before render.
  if (typeof window !== "undefined") {
    return (
      <div className="static  h-screen max-h-screen grid grid-cols-5">
        <RiderList
          height={height}
          width={width}
          riders={riders}
          numRiders={numRiders}
          taxis={taxis}
          numTaxis={numTaxis}
          onHeightChange={onHeightChange}
          onWidthChange={onWidthChange}
          onNumRidersChange={onNumRidersChange}
          onNumTaxisChange={onNumTaxisChange}
          populateRiders={populateRiders}
          clearRiders={clearRiders}
          populateTaxis={populateTaxis}
          clearTaxis={clearTaxis}
          calculatePaths={calculatePaths}
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
                shape: "octagon",
              },
            },

            {
              selector: "edge.higlighted",
              style: {
                "target-arrow-color": "white",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",
                "background-color": "white",
              },
            },

            {
              selector: "edge",
              style: {
                width: 4,
                "target-arrow-color": "grey",
                "target-arrow-shape": "vee",
                "curve-style": "segments",
                // "curve-style": "straight",
                // "curve-style": "haystack",
                "background-color": "grey",
              },
            },
          ]}
          style={{ margin: "5px" }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default GraphContainer;
