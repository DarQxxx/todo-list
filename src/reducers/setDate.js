const setDateReducer = (state = {day : null, month: null, year: null, fullDate: null}, action) => {
    switch(action.type){
        case 'dateSet' :
            return state = action.payload
        default:
            return state
    }
}

export default setDateReducer;