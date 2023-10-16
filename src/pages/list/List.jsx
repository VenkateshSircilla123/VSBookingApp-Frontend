import './list.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SeatchItem from '../../components/searchItem/SeatchItem'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
function List() {
  const location = useLocation()
  const [dates, setDates] = useState(location.state.dates)
  const [showDate, setShowDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [destination, setDestination] = useState(location.state.destination)
  const [max, setMax] = useState(undefined)
  const [min, setMin] = useState(undefined)

  const { data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 99999}`)

  const { dispatch, dates:dates1, options:options1, city } = useContext(SearchContext)

  console.log(destination)

  const handleClick = ()=>{
    dispatch({type:"NEW_SEARCH", payload: {dates,destination,options}})
    reFetch()
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} onChange={(e)=>setDestination(e.target.value)}/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=>setShowDate(!showDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {showDate && <DateRange ranges={dates} moveRangeOnFirstSelection={false} editableDateInputs={true} onChange={item=>setDates([item.selection])} />}
            </div>
            <div className="lsItem">
            <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e)=>options.adult=e.target.value}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange={(e)=>options.children=e.target.value}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e)=>options.room=e.target.value}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>search</button>
          </div>
          <div className="listResult">
            {
              loading ? "loading..." :
              <>
                {
                  data.map(item=>(

                    <SeatchItem item={item} key={item._id}/>
                  ))
                }
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List