import { createContext, useReducer } from "react"

const initialState = {
    city: 'hyderabad',
    dates:[{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }],
    options:{
        adult:1,
        children:0,
        room:1,
    },
}

export const SearchContext = createContext(initialState)

const SearchReducer = (state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return initialState
        default:
            return state
    }
}

export const SearchContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(SearchReducer, initialState)
    return (
        <SearchContext.Provider
            value={{
            city: state.city,
            dates: state.dates,
            options: state.options,
            dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}