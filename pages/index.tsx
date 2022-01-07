import Head from "next/head";
import Sidebar from "../Components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black">
        <Sidebar />
        {/* SideBar */}
        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}
