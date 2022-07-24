import { initialRiders } from "./initialRiders";

type Rider = {
  id: string;
  name: string;
  long: number;
  lat: number;
};

type Props = { riders: Rider[] };

const Card = (props: Props) => {
  return (
    <div className="absolute bottom-0 left-0 z-50">
      <div className="flex justify-center ">
        <div className="rounded-lg shadow-lg bg-white max-w-sm">
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2 pb-5">
              Riders waiting
            </h5>
            {/* <p className="text-gray-700 text-base mb-4">Names</p> */}
            <>
              {initialRiders.map((rider) => {
                return (
                  <div className="pb-5" key={rider.id}>
                    <h5 className="text-left text-gray-900 text-md font-small ">
                      {rider.name}
                    </h5>
                  </div>
                );
              })}
            </>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Find rides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
