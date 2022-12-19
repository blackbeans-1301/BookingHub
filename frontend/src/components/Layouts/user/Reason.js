import * as React from "react"
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import SearchIcon from '@mui/icons-material/Search'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'

const data = [
  {
    id: 1,
    icon: <PriceChangeIcon className="text-blue-900" />,
    title: "Best room deals",
    description: "Find the best deals available from 900+ people"
  },
  {
    id: 2,
    icon: <SearchIcon className="text-blue-900" />,
    title: "Search without worry",
    description: "The prices you see aren't affected by your searches."
  },
  {
    id: 3,
    icon: <CurrencyExchangeIcon className="text-blue-900" />,
    title: "Book with flexibility",
    description: "Easily find rooms with no change fees."
  },
  {
    id: 4,
    icon: <WorkspacePremiumIcon className="text-blue-900" />,
    title: "Trusted and free",
    description: "We’re completely free to use – no hidden charges or fees."
  }
]

export default function Reason() {
  return (
    <div className="m-8">
      <h1 className="font-bold text-xl text-gray-600">Here's why you choose bookinghub</h1>
      <div className="flex justify-between m-12">
        {data.map(
          card => {
            return (
              <div className="inline-block w-1/5 h-40 rounded-md border border-blue-900">
                <div className="ml-2">
                  <div className="p-2">
                    {card.icon}
                  </div>
                  <div>
                    <h1 className="font-bold text-xl ml-2 text-indigo-900 mb-4">{card.title}</h1>
                  </div>
                  <div className="mx-2">
                    {card.description}
                  </div>
                </div>

              </div>
            )
          }
        )}
      </div>

    </div>
  )
}
