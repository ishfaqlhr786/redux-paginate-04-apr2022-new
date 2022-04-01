
 const initialState = {
    loading: false,
    data: {},
    errorMsg: "",
  };
   const Delreducer= (state = initialState, action) => {
  
    //  const DeleteReducer = (state = initialState, action) => {
        switch (action.type) {
          case "PRODUCT_DELETING_LOADING":
            return {
              ...state,
              loading: true,
              errorMsg: "",
            };
          case "PRODUCT_DELETE_FAIL":
            return {
              ...state,
              loading: true,
              errorMsg: "Unable to find Pokemon",
            };
          case "PRODUCT_DELETING_SUCCESS":
            return {
             ...state,
              loading: false,
              errorMsg: "",
             
               data:action.payload
             
           
            };
          default:
            return state;
        }
      };
     
   
   
   export default Delreducer;
   