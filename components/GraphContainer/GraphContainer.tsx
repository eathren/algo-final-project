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
import dummyGroups from "./dummyData.json";
import dummyOrder from "./dummyOrder.json";

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
  const [numRiders, setNumRiders] = useState(10);
  const [groups, setGroups] = useState<any[]>([]);
  const [order, setOrder] = useState<any[]>([]);
  // HERE. Probably an array of string ids, in order (?)
  // if multiple paths, then that's going to be an array of arrays.
  const [path, setPath] = useState([]);

  // TODO: https://github.com/plotly/react-cytoscapejs/issues/46s

  // populates the inital graph, and any changes
  useMemo(() => {
    setRiders([]);
    setTaxis([]);
    const d = createTaxiGraph(height, width);
    setGraphData(d[0]);

    // setVertices(d[1]);
  }, [height, width]);

  useEffect(() => {
    cyRef?.current?.nodes('[id = "0"]').style("background-color", "red");
  });

  useEffect(() => {
    cyRef?.current?.nodes("[id  = *").style("background-color", "grey");
  }, [riders, taxis, height, width]);

  // cy.elements()
  // cy.nodes()
  // cy.edges()
  // step 1:
  // get node names, and x y coordinates
  // step 2: match nodes and driver destinations
  // step 3

  const getOrders = async () => {
    const vertices: any[] = [];

    const fetchedOrder = await fetch(
      "https://path-backend-service.herokuapp.com/path/getPaths",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numOfCabs: numTaxis,
          numPerCar: 4,
          source: { name: "0", x: 0, y: 0 },
          vertices: vertices,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
    return fetchedOrder;
  };

  const getDummyGroups = () => {
    const g: any = Object.entries(dummyGroups);
    // console.log("groups", g);
    setGroups(g);
  };

  const getDummyOrder = () => {
    const o: any[] = dummyOrder;
    // console.log("order", o);
    setOrder(o);
  };

  const getApiPaths = () => {};

  const calculatePaths = () => {
    if (numTaxis == 0 || !graphData || numRiders == 0) return;
    // const output = {
    //   numOfCabs: numTaxis,
    //   numPerCar: 4,
    //   source: { name: "0", x: "0", y: "0" },
    //   vertices: vertices,
    // };
    getDummyGroups();
    getDummyOrder();
    // uncomment here when api works.
    // getOrders();
    // this works.

    // next, chain together each of these paths, with multiple paths

    // add paths for each group
    // in order, 1 2 3 4

    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < order[i].length; j++) {
        if (order[i].length > j + 1) {
          var searchPath = cyRef?.current?.elements().aStar({
            root: `#${order[i][j].name}`,
            goal: `#${order[i][j + 1].name}`,
            directed: true,
          });
          console.log(searchPath);
          if (searchPath) {
            searchPath.path
              .style("background-color", "green")
              .style("opacity", "1")
              .select();
          }
        }
      }
    }
  };

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
    const source = "0";
    // const source = Math.floor(Math.random() * numNodes).toString();
    const characterName: string = uniqueNamesGenerator(config);
    const color = "#b0c4de";
    const destination = Math.floor(Math.random() * numNodes).toString();
    const currNode = graphData
      .slice(0, height * width - 1)
      .find((node) => node.data.id === destination);
    console.log(currNode);
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

  const populateTaxis = () => {
    const taxis: Taxi[] = [];
    for (let i = 0; i < numTaxis; i++) {
      const newTaxi = createRandomTaxi();
      taxis.push(newTaxi);
    }
    setTaxis(taxis);
  };

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

  const cyRef = React.useRef<cytoscape.Core | undefined>();

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
