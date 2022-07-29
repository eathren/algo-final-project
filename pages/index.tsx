import type { NextPage } from "next";
import Head from "next/head";
// todo: add state management -> zustand

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../components/MapView"), {
  // Do not import in server side
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rideshare Efficient Pathing</title>
        <meta name="description" content="Ride share efficient pathing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Add if user not logged in logic, force login
        else showmap */}
        <div style={{ height: "100%", width: "100%" }}>
          <MapComponent />
        </div>
      </main>
    </div>
  );
};

export default Home;
