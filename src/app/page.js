import dynamic from "next/dynamic";
import MapControls from "@/components/ui/map/MapControls";
import DisplayReport from "@/components/ui/cards/DisplayReport";

const Map = dynamic(() => import("@/components/ui/map/Map"), {
  ssr: false
})

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Map height='calc(100vh - 68px)' showPointer />
      <MapControls />
      <div
        className="absolute top-3 left-3 z-[99999]"
      >
        <DisplayReport />
      </div>
    </main>
  )
}
