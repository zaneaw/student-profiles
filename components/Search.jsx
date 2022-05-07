import React from 'react'

export default function Search({query, setQuery}) {
  return (
      <div className="z-2 sticky top-0 left-0 right-0 z-50 self-center bg-white px-4">
          <input
              type="search"
              placeholder="Search by name"
              onChange={(event) => setQuery(event.target.value)}
              value={!query ? "" : query}
              className="z-50 max-h-[50px] min-h-[50px] min-w-full border-b-2 bg-white px-2 pt-1 text-lg outline-0 focus-visible:border-black"
          />
      </div>
  )
}
