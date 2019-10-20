export const add = content => ({
    type: "ADD_TODO",
    payload: {
      content
    }
  });


  export const succeed_action = task => ({
    type: "SUCCEED_TODO",
    payload: {
      task
    }
  });

  export const failed_action = task => ({
    type: "FAILED_TODO",
    payload: {
      task
    }
  });
  
  export const list_action = list =>({
    type: "LIST_TODO",
    payload: {
      list
    }
  })

  