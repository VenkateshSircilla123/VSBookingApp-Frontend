import React, {useContext, useState} from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

export default function Header({type}) {
    const [showDate, setShowDate] = useState(false)
    const [destination, setDestination] = useState('hyderabad')
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [showOptions, setShowOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const handleOption = (name,operation)=>{
        setOptions((prev)=>{
            return {
                ...prev,
                [name] : operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }
    const navigate = useNavigate()

    const { dispatch } = useContext(SearchContext)
    const {user} = useContext(AuthContext)

    const handleSearch = ()=>{
        dispatch({type:"NEW_SEARCH", payload: {dates,destination,options}})
        navigate('/hotels', {state: {destination, dates, options}})
    }


  return (
    <div className='header'>
        <div className={type !== 'list' ? "headerContainer" : 'headerContainer listMode'}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>
            {type !== 'list' &&
            <>
            <h1 className="headerTitle">A lifetime of discounts? It's Genuis</h1>
            <p className="headerDisc">Get rewarded for your trawels - unlock instant savings of 10% or more with a free VS-Booking account</p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className='headerIcon'/>
                    <input type="text" 
                    onChange={e=>setDestination(e.target.value)}
                    className="headerSearchInput" placeholder='Where are you going?' />
                </div>
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                    <span onClick={()=>setShowDate(!showDate)} className='headerSearchText'>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                </div>
                {showDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className='date'
                />}
                <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
                <span className='headerSearchText'
                onClick={()=>setShowOptions(!showOptions)}>{options.adult} Adults . {options.children} Children . {options.room} room</span>
                {showOptions && <div className="options">
                    <div className="optionItem">
                        <span>adults</span>
                        <div className="optionCounter">

                            <button
                            disabled={options.adult <= 1}
                            className="optionCounterBtn"
                            onClick={()=>handleOption('adult', 'd')}>-</button>
                            <span className="optionCounterNumber">{options.adult}</span>
                            <button className="optionCounterBtn"
                            onClick={()=>handleOption('adult', 'i')}
                            >+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span>childern</span>
                        <div className="optionCounter">

                            <button
                            disabled={options.children <=0}
                            className="optionCounterBtn"
                            onClick={()=>handleOption('children', 'd')}>-</button>
                            <span className="optionCounterNumber">{options.children}</span>
                            <button className="optionCounterBtn"
                            onClick={()=>handleOption('children', 'i')}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span>room</span>
                        <div className="optionCounter">

                            <button 
                            disabled={options.room <= 1}
                            className="optionCounterBtn"
                            onClick={()=>handleOption('room', 'd')}>-</button>
                            <span className="optionCounterNumber">{options.room}</span>
                            <button className="optionCounterBtn"
                            onClick={()=>handleOption('room', 'i')}>+</button>
                        </div>
                    </div>
                </div>}
                </div>
                <div className="headerSearchItem">
                    <button onClick={handleSearch} className="headerBtn">
                        search
                    </button>
                </div>
            </div>
            </>}
        </div>
    </div>
  )
}