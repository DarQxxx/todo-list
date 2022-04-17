const userDataReducer = (state = {name : null, url: null, email: null, uid: "0"}, action) => {
    switch(action.type){
        case 'dataGather' :
            return state = action.payload
        default:
            return state
    }
}

export default userDataReducer;