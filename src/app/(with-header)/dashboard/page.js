import AVGResponseTimeChart from "@/components/ui/charts/AVGResponseTimeChart"
import BarChart from "@/components/ui/charts/BarChart"
import TotalReportsChart from "@/components/ui/charts/TotalReportsChart"
import dynamic from "next/dynamic"

const HeatMap = dynamic(() => import("@/components/ui/map/HeatMap"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto w-full pt-5">
        <h2 className="font-coolvetica text-4xl text-gray-600 mb-2">
          Informes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-5">
          <BarChart title='Nuevos Reportes' />
          <BarChart title='Reportes cerrados' />
          <AVGResponseTimeChart />
          <TotalReportsChart title='Reportes totales' />
        </div>
        <h2 className="font-coolvetica text-4xl text-gray-600 mb-2">
          Mapa de calor
        </h2>
      </div>
      <HeatMap />
    </>
  )
}

export default page