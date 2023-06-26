import dynamic from "next/dynamic";
import MapControls from "@/components/ui/map/MapControls";
import DisplayReport from "@/components/ui/cards/DisplayReport";

const Map = dynamic(() => import("@/components/ui/map/Map"), {
  ssr: false
})

export const metadata = {
  title: "Home",
  description: "Home page",
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Map height='calc(100svh - 64px)' showPointer />
      <MapControls />
      <DisplayReport />
    </main>
  )
}
