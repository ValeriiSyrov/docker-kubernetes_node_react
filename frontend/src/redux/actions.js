export const add = content => ({
    type: "ADD_TODO",
    payload: {
      content
    }
  });


  export const succeed_action = id => ({
    type: "SUCCEED_TODO",
    payload: {
      id
    }
  });
  

  