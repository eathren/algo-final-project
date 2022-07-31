import type { NextPage } from "next";
import Head from "next/head";
// todo: add state management -> zustand

import dynamic from "next/dynamic";

const GraphContainer = dynamic(() => import("../components/GraphContainer"), {
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

      <main className=" h-screen max-h-screen overflow-y-hidden">
        {/* Add if user not logged in logic, force login
        else showmap */}
        <div style={{ height: "100%", width: "100%" }}>
          <GraphContainer />
        </div>
      </main>
    </div>
  );
};

export default Home;
