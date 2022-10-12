
export const initialState = {
    loading:true,
    list : [],
    button_loading : false
}

const todoReducers = (state = initialState , action) =>{
    switch(action.type){
        case "Add_Todo" :
            
        return{                                             // to return the data already stored in the initialState *important*
            ...state ,
            button_loading : false,
         
        }

        case "Delete_Todo" :
            const newlist = state.list.filter((elem)=> (elem.id !== action.payload))
        return{                                             // id recieved from delete btn will be filtered here and will return the newList as well the old state
            ...state , 
        
            list : newlist
        }
        case 'Edit_Todo':
           
            const updatedTodos = state.list.map((elem)=>{
                if(elem.id === action.updatedDoc.id){
                    return {button_loading:true,  ...elem ,  first_name : action.updatedDoc.first_name , last_name : action.updatedDoc.last_name , email: action.updatedDoc.email}

                }
                return elem
            })
            return {
                ...state , 
                list : updatedTodos,
                button_loading : false
            }

        case 'Get_Todos' :  
            
            return {
                ...state,
                list : action.payload
                     
            }
        case 'loading' :
            return {
                ...state,
                loading : action.payload
            }
        case "button_loading" : {
            return {
                ...state,
                button_loading : action.payload
                
            }
        }

            
        default: return state;
    }
}

export default todoReducers                         //will be called from index.jsx in reducer