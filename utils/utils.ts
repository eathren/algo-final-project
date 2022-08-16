export type TaxiGraph = Array<Node | Edge>;

export type NodeData = {
  id: string;
  label: string;
};

export type NodePosition = {
  x: number;
  y: number;
};

export type Node = {
  data: NodeData;
  position: NodePosition;
};

export type BackendFormatGraph = {
  vertices: BackendFormatNode[];
};

export type BackendFormatNode = {
  name: string;
  x: string;
  y: string;
};

export type EdgeData = {
  source: string;
  target: string;
  label: string;
  weight: number;
};

export type Edge = {
  data: EdgeData;
};
/**
 * Returns a HEIGHT by WIDTH grid of connected nodes.
 * This grid is connected by grids, bidirectionally. That is,
 * every edge goes both direction.
 * Note, we can likely add a high % chance with random generators to mix this up.
 */
export const createTaxiGraph = (
  height: number,
  width: number
): [TaxiGraph, BackendFormatGraph] => {
  const outputData = [];

  const backendData: BackendFormatGraph = { vertices: [] };

  let curr_id = 0;
  let curr_y = 50;
  let curr_x = 0;

  // POPULATES NODES
  for (let i = 0; i < height; i++) {
    curr_x = 50;
    curr_y += 50;
    for (let j = 0; j < width; j++) {
      const c_id = curr_id.toString();

      const newNode: Node = {
        data: { id: c_id, label: `Node: ${c_id}` },
        position: { x: curr_x, y: curr_y },
      };
      const backendNode: BackendFormatNode = {
        name: c_id,
        x: curr_x.toString(),
        y: curr_y.toString(),
      };
      outputData.push(newNode);
      backendData.vertices.push(backendNode);
      curr_x += 100;
      curr_id += 1;
    }
  }

  let source = 0;
  let target = 1;

  const numNodes = height * width;
  //   Populate edges
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (target % width != 0) {
        const outgoingEdge: Edge = createEdge(source, target, "", 150);
        outputData.push(outgoingEdge);
        const incomingEdge: Edge = createEdge(target, source, "", 150);
        outputData.push(incomingEdge);
      }

      if (source + width < numNodes) {
        const downwardsEdge: Edge = createEdge(source + width, source, "", 150);
        outputData.push(downwardsEdge);
      }

      if (source >= width) {
        const upwardsEdge: Edge = createEdge(source - width, source, "", 150);
        outputData.push(upwardsEdge);
      }
      source += 1;
      target += 1;
    }
  }
  return [outputData, backendData];
};

const createEdge = (
  source: number,
  target: number,
  label: string,
  weight: number
): Edge => {
  return {
    data: {
      source: target.toString(),
      target: source.toString(),
      label: "",
      weight: 150, // TODO. Make this a non default?
    },
  };
};
