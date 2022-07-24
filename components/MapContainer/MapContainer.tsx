import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";

type Props = {};

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
});

const MapContainer = (props: Props) => {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
      className="z-40"
      zoom={[12]}
      center={[-71.069387, 42.350795]}
    >
      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  );
};

export default MapContainer;
