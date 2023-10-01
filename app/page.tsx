import GameWrapper from "@/components/GameWrapper";

import { Tenor_Sans } from "next/font/google";

const inter = Tenor_Sans({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main
      style={{ backgroundColor: "#FFFEEE" }}
      className={`${inter.className} h-screen w-screen`}
    >
      <div className='h-screen'>
        <GameWrapper />
      </div>
    </main>
  );
}
