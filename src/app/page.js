import Map from "@/components/ui/Map";
import LeaksCounter from "@/components/ui/cards/LeaksCounter";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Map height='calc(100vh - 68px)' />
      <div className='absolute top-3 right-3 z-[9999999]'>
        <LeaksCounter count={10} />
      </div>
    </main>
  )
}
