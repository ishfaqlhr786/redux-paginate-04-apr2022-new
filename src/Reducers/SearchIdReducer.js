const initialState = {
    loading: false,
   data: [{}],
     errorMsg: "",
    count: 0,
 }
   const SearchIdReducer= (state = initialState, action) => {
     switch (action.type) {
       case "PRODUCT_SEARCHID":
         return {
           ...state,
           loading: true,
           errorMsg: "",
         };
   
       case "PRODUCT_SEARCHID_FAIL":
         return {
           ...state,
           loading: false,
           errorMsg: "Unable to edit product",
         };
   
       case "PRODUCT_SEARCHID_SUCCESS":
         //  console.log(action.payload)
         return {
           ...state,
         // loading: false,
          data: action.payload,
 //errorMsg: "",
// count: action.payload.count,
        //  count: parseInt(action.payload.count),
         };
       default:
         return state;
     }
   };
   
   export default SearchIdReducer ;