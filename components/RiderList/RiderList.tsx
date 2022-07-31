import { ChangeEventHandler, useState } from "react";
import { Rider } from "../../types/Rider";

type Props = {
  height: number;
  width: number;
  riders: Rider[];
  numRiders: number;
  onHeightChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onWidthChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onNumRidersChange: ChangeEventHandler<HTMLInputElement> | undefined;
  populateRiders: (event: React.MouseEvent<HTMLButtonElement>) => void;
  clearRiders: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const RiderList = (props: Props) => {
  const [showNewRiderCard, setShowNewRiderCard] = useState(false);

  // const [name, setName] = useState("");
  // const addRider = () => {
  //   const newRider: Rider = {
  //     id: uuidv4(),
  //     name: name,
  //   };
  // };

  return (
    <div className=" max-h-screen bg-slate-800 z-50 p-2">
      <div className=" justify-center pt-2 pb-2">
        <div className="rounded-lg shadow-lg bg-white max-w-sm ">
          <div className="p-3">
            <h5 className="text-gray-900 text-xl font-medium mb-2 ">Graph</h5>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Height
                </label>
                <input
                  type="number"
                  className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                  id="riderInput"
                  placeholder="0"
                  onChange={props.onHeightChange}
                  value={props.height}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Width
                </label>
                <input
                  type="number"
                  className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                  id="riderInput"
                  placeholder="0"
                  onChange={props.onWidthChange}
                  value={props.width}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" justify-center ">
        <div className="rounded-lg shadow-lg bg-white max-w-sm ">
          <div className="p-3">
            <h5 className="text-gray-900 text-xl font-medium mb-2 ">
              {props.riders.length ? (
                <>Riders waiting...</>
              ) : (
                <>No Riders Yet.</>
              )}
            </h5>
            <>
              <div className="h-36 overflow-y-auto b-black">
                {props.riders.map((rider) => {
                  return (
                    <div className="pb-5" key={rider.id}>
                      <h5 className="text-left text-gray-900 text-md font-small ">
                        {rider.name}
                      </h5>
                      <p className="text-left text-gray-900 text-md font-small ">
                        Node: {rider.node}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
            <div className="grid grid grid-cols-1 gap-4">
              {/* <button
                onClick={() => addRider()}
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add Custom Rider
              </button> */}
              {/* TODO. Only let users populate list once. Geo codes will stack. */}
              <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                  <label className="form-label inline-block mb-2 text-gray-700">
                    # Riders
                  </label>
                  <input
                    type="number"
                    className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="riderInput"
                    placeholder="0"
                    onChange={props.onNumRidersChange}
                    value={props.numRiders}
                  />
                </div>
              </div>
              <button
                onClick={props.populateRiders}
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Populate Other Riders
              </button>
              <button
                onClick={props.clearRiders}
                type="button"
                className=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Clear Riders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderList;
