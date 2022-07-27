import type { NextPage } from "next";
import Head from "next/head";
import MapView from "../components/MapView";
import styles from "../styles/Home.module.css";

// todo: add state management -> zustand

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rideshare Efficient Pathing</title>
        <meta name="description" content="Ride share efficient pathing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Add if user not logged in logic, force login
        else showmap */}
        <div style={{ height: "100%", width: "100%" }}>
          <MapView />
        </div>
      </main>
    </div>
  );
};

export default Home;
