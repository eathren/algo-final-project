import cytoscape from "cytoscape";
import React, { useMemo, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { Config, names, uniqueNamesGenerator } from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";
import { Rider, Taxi, Variant } from "../../types";
import {
  BackendFormatGraph,
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
  const [backendFormatGraph, setBackendFormatGraph] =
    useState<BackendFormatGraph>();
  const [riders, setRiders] = useState<Rider[]>([]);
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [numTaxis, setNumTaxis] = useState(3);
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
    setBackendFormatGraph(d[1]);
  }, [height, width]);

  // useEffect(() => {
  // cy.nodes('[id = "yourId"]').style("background-color", "desiredColor");
  // })

  // cy.elements()
  // cy.nodes()
  // cy.edges()

  const getGroups = async () => {
    fetch("https://path-backend-service.herokuapp.com/path/getGroups", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numOfCabs: 4,
        numPerCar: 5,
        source: { name: "snell", x: 0, y: 0 },
        vertices: [
          { name: "a", x: 1, y: 1 },
          { name: "b", x: 3, y: 5 },
          { name: "c", x: 2, y: 4 },
          { name: "d", x: -1, y: -5 },
          { name: "e", x: 0, y: 7 },
          { name: "f", x: -3, y: -5 },
          { name: "g", x: 2, y: 8 },
          { name: "h", x: -2, y: -6 },
          { name: "i", x: 2, y: 9 },
          { name: "j", x: 2, y: 0 },
          { name: "k", x: 0, y: 2 },
          { name: "l", x: -4, y: -2 },
          { name: "m", x: 4, y: 7 },
          { name: "n", x: -6, y: -2 },
          { name: "o", x: 4, y: 8 },
          { name: "p", x: 3, y: 0 },
          { name: "q", x: 0, y: 3 },
          { name: "r", x: -5, y: -4 },
          { name: "s", x: 2, y: 2 },
          { name: "t", x: -4, y: -4 },
          { name: "u", x: 2, y: 7 },
          { name: "v", x: 7, y: 0 },
          { name: "x", x: 0, y: 4 },
          { name: "y", x: -7, y: -1 },
          { name: "z", x: 1, y: 3 },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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

  const calculatePaths = () => {
    console.log("NULL FUNCTION");
    if (numTaxis == 0 || !graphData || numRiders == 0) return;
    const output = {
      numOfCabs: numTaxis,
      numPerCar: 4,
      source: { name: "0", x: "0", y: "0" },
      vertices: backendFormatGraph,
    };
    // getGroups();
    getDummyGroups();
    getDummyOrder();

    // this works.

    // next, chain together each of these paths, with multiple paths

    // add paths for each group
    // in order, 1 2 3 4

    for (let i = 0; i < order.length; i++) {
      console.log(order[i]);
      for (let j = 0; j < order[i].length; j++) {
        console.log(order[i][j].name);
        if (order[i].length > j + 1) {
          var dfs = cyRef?.current?.elements().aStar({
            root: `#${order[i][j].name}`,
            goal: `#${order[i][j + 1].name}`,
            directed: true,
          });
          console.log(dfs);
          if (dfs) dfs.path.select();
        }
      }
      // console.log(order[i][1][j].name, order[i][1][j + 1].name);
    }

    // console.log(riders);
    // console.log(output);
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
          style={{ margin: "5px" }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default GraphContainer;
