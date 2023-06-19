import Tip from '@/components/ui/cards/Tip'
import React from 'react'


const colors = [
  '#FF7215',
  '#6498FF',
  '#FCC000',
  '#22B573',
  '#9B6EFF',
  '#FF4040',
]

const tips = [
  {
    title: 'Cerrá la canilla',
    description: 'Cerrá la canilla mientras te enjabonás las manos, te cepillás los dientes y ayudas a lavar la vajilla.',
    img: 'canilla.svg'
  },
  {
    title: 'Usá un balde',
    description: 'Usá un balde en lugar de usar una manguera cuando lavás el auto.',
    img: 'balde.svg'
  },
  {
    title: 'Cuando regás',
    description: 'Recuerda regar siempre cuando baje el sol. De esa manera se evita la evaporación del agua',
    img: 'evaporate.svg'
  },
  {
    title: 'Revisar las canillas',
    description: 'Recuerda revisar las canillas y avisar para que las reparen y así evitar pérdidas por el goteo.',
    img: 'pipe.svg'
  },
  {
    title: 'Cerrar las llaves de paso',
    description: 'Cuando te vayas de casa por unos días, recuerda cerrar las llaves de paso. La llave está al lado del medidor de agua.',
    img: 'valve.svg'
  },
  {
    title: 'Llamar a OSE o reportar en Cuidemos el Agua',
    description: 'Si ves una pérdida de agua en la calle o en tu casa, recuerda reportar en AquaCheck o llamar al teléfono 0800 1871.',
    img: 'ose.svg'
  }
]

const page = () => {
  return (
    <div className="p-4 bg-[#f4f4f4]">
      <div className='max-w-3xl mx-auto'>
        <h2 className="text-3xl text-center mt-4 mb-8 font-bold text-neutral-800">Consejos para cuidar el agua</h2>
        <ul className='flex flex-col gap-5'>
          {
            tips.map((tip, index) => (
              <li
                key={tip.title}
              >
                <Tip
                  color={colors[index % colors.length]}
                  {...tip}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default page