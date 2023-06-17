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
    img: 'canilla.png'
  },
  {
    title: 'Usá un balde',
    description: 'Usá un balde en lugar de usar una manguera cuando lavás el auto.',
    img: 'balde.png'
  },
  {
    title: 'Cuando regás',
    description: 'Recuerda regar siempre cuando baje el sol. De esa manera se evita la evaporación del agua',
    img: 'regadera.png'
  },
  {
    title: 'Revisar las canillas',
    description: 'Recuerda revisar las canillas y avisar para que las reparen y así evitar pérdidas por el goteo.',
    img: 'canilla2.png'
  },
  {
    title: 'Cerrar las llaves de paso',
    description: 'Cuando te vayas de casa por unos días, recuerda cerrar las llaves de paso. La llave está al lado del medidor de agua.',
    img: 'obrero.png'
  },
  {
    title: 'Llamar a OSE o reportar en Cuidemos el Agua',
    description: 'Si ves una pérdida de agua en la calle o en tu casa, recuerda reportar en AquaCheck o llamar al teléfono 0800 1871.',
    img: 'celular.png'
  }
]

const page = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Consejos para cuidar el agua</h2>
      <ul className='flex flex-col gap-3 mt-2'>
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
  )
}

export default page