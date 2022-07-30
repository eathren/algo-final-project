import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Rider } from "../../types/Rider";
import { initialRiders } from "./initialRiders";
// https://docs.mapbox.com/help/timport uuid4 from "uuid4";utorials/use-mapbox-gl-js-with-react/#set-the-apps-default-state

// type Props = { riders: Rider[] };
const NewRiderCard = () => {};

const RiderList = () => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [showNewRiderCard, setShowNewRiderCard] = useState(false);
  const [name, setName] = useState("");
  const mapClick = () => {
    // return Geolocation.getCurrentPosition();
  };

  const addRider = () => {
    const newRider: Rider = {
      id: uuidv4(),
      name: name,
    };
  };

  const populateRiders = () => {
    setRiders([...riders, ...initialRiders]);
  };

  const clearRiders = () => {
    setRiders([]);
  };

  return (
    <div className=" max-h-screen bg-slate-800 z-50 p-2">
      <div className=" justify-center ">
        <div className="rounded-lg shadow-lg bg-white max-w-sm ">
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2 pb-5">
              {riders.length ? <>Riders waiting...</> : <>No Riders Yet.</>}
            </h5>
            {/* <p className="text-gray-700 text-base mb-4">Names</p> */}
            <>
              <div className="h-52 overflow-y-auto">
                {riders.map((rider) => {
                  return (
                    <div className="pb-5" key={rider.id}>
                      <h5 className="text-left text-gray-900 text-md font-small ">
                        {rider.name}
                      </h5>
                      <p className="text-left text-gray-900 text-md font-small ">
                        ({rider.latitude}, {rider.longitude})
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
            <div className="grid grid grid-cols-1 gap-4">
              <button
                onClick={() => addRider()}
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add Rider
              </button>
              {/* TODO. Only let users populate list once. Geo codes will stack. */}
              <button
                onClick={() => populateRiders()}
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Populate Other Riders
              </button>
              <button
                onClick={() => {
                  clearRiders();
                }}
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
