

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const { content } = action.payload;
      const obj = {
        task:content,
        status: "in progress"
      }
      return {
        ...state,
         tasks: [...state.tasks, obj]
      };
    }

    case "SUCCEED_TODO": {
      const { task } = action.payload;
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
   
    default:
      return state;
  }
}
