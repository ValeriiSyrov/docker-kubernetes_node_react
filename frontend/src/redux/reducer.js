

const initialState = {
  tasks: []
 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const { content } = action.payload;
      
      return {
        ...state,
         tasks: [...state.tasks, content]
      };
    }

    case "SUCCEED_TODO": {
      const {task}  = action.payload;
      const tasks = state.tasks.map(el=>{

         if (el._id === task._id) {
           el = task
             return el
         } else {
           return el
         }
      })

      return {
        ...state,
        tasks
        
      };
    }


    case "FAILED_TODO": {
      const {task}  = action.payload;
      const tasks = state.tasks.filter(el=>el._id !==task._id)

      return {
        ...state,
        tasks
        
      };
    }

    case "LIST_TODO": {
      const {list}  = action.payload;
      return {
        ...state,
        tasks: list
        
      };
    }
   
    default:
      return state;
  }
}
