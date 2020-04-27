const initialState = {
  greeting: 'Hello, world!'
};

const root = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default root;
