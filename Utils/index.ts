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
 * Returns a WIDTH by HEIGHT grid of connected nodes.
 */
export const createTaxiGraph = (height = 20, width = 25): TaxiGraph => {
  const outputData = [];

  let curr_id = 0;
  let curr_y = 50;
  let curr_x = 0;

  // POPULATES NODES
  for (let i = 0; i <= height; i++) {
    curr_x = 50;
    curr_y += 50;
    for (let j = 0; j <= width; j++) {
      const c_id = curr_id.toString();

      const newNode: Node = {
        data: { id: c_id, label: `Node: ${c_id}` },
        position: { x: curr_x, y: curr_y },
      };
      outputData.push(newNode);
      curr_x += 100;
      curr_id += 1;
    }
  }

  let source = 0;
  let target = 1;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (source < height * width) {
        const outgoingEdge: Edge = createEdge(source, target, "", 150);
        const incomingEdge: Edge = createEdge(target, source, "", 150);

        outputData.push(outgoingEdge);
        outputData.push(incomingEdge);
        if (source >= height + 1) {
          const upwardsEdge: Edge = createEdge(
            source,
            source - height - 1,
            "",
            150
          );
          outputData.push(upwardsEdge);

          const downwardsEdge: Edge = createEdge(
            source - height - 1,
            source,
            "",
            150
          );
          outputData.push(downwardsEdge);
        }
        source += 1;
        target += 1;
      }
    }
  }
  return outputData;
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
