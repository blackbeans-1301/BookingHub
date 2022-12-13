import * as React from "react"

export default function SearchBar() {
  return (
    <div className="flex w-full h-16 justify-center item-center">
      <div className="w-5/6 h-full flex justify-between item-center">
        <div className="bg-blue-400 w-5/6 flex item-center rounded-md">
          {/* hotel's name */}
          <div className="flex items-center m-2 w-2/5">
            <input className="h-full w-full rounded-md" placeholder="Destination" />
          </div>

          {/* calendar */}
          <div>

          </div>

          {/* number of room */}
          <div>

          </div>

        </div>


        {/* search button */}
        <div>

        </div>
      </div>

    </div>
  )
}
