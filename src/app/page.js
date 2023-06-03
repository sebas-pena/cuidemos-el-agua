import dynamic from "next/dynamic";
import MapControls from "@/components/ui/map/MapControls";

const Map = dynamic(() => import("@/components/ui/map/Map"), {
  ssr: false
})

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Map height='calc(100vh - 68px)' showPointer />
      <MapControls />
    </main>
  )
}
