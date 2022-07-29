import CytoscapeComponent from "react-cytoscapejs";
import RiderList from "../RiderList";

import { geoJson } from "./GeoJson";

const MapView = () => {
  if (typeof window !== "undefined" && geoJson) {
    return (
      <div>
        <RiderList />
        <CytoscapeComponent
          elements={geoJson}
          style={{ width: "1920px", height: "1080px", margin: "20px" }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default MapView;
