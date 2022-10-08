
const initialState = {
    list : []
}

const todoReducers = (state = initialState , action) =>{
    switch(action.type){
        case "Add_Todo" :
            
        return{                                             // to return the data already stored in the initialState *important*
            ...state ,
            list : [
                ...state.list,
                {
                    id :  action.payload.id,
                    first_name :  action.payload.first_name,
                    last_name :  action.payload.last_name,
                    email :  action.payload.email
                }
            ]
        }

        case "Delete_Todo" :
            const newlist = state.list.filter((elem)=> (elem.id !== action.payload))
        return{                                             // id recieved from delete btn will be filtered here and will return the newList as well the old state
            ...state , 
        
            list : newlist
        }
        case 'Edit_Todo':
            const updatedTodos = state.list.map((elem)=>{
                if(elem.id === action.payload.id){
                    return {...elem , first_name : action.payload.first_name , last_name : action.payload.last_name , email: action.payload.email}

                }
                return elem
            })
            return {
                ...state , 
                list : updatedTodos
            }

        case 'Get_Todos' :  
            return {
                
                list : action.payload
            }

            
        default: return state;
    }
}

export default todoReducers                         //will be called from index.jsx in reducer