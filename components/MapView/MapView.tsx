import MapContainer from "../MapContainer";
import RiderList from "../RiderList";

type Props = {};

const MapView = (props: Props) => {
  return (
    <div>
      <div style={{ height: "100%", width: "100%" }}>
        <MapContainer />
        <RiderList />
      </div>
    </div>
  );
};

export default MapView;
