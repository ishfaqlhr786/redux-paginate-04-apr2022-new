
import axios from 'axios'
import React ,{useState} from 'react'


export const GetProductList = () => async (dispatch) => {
   // const [items,setItems]= useState([])
 //  var items=[]
  const id=2

   try {
      dispatch({
        type: "LIST_LOADING",
      });
      const res = await axios.get(
        `https://fakestoreapi.com/products`
      )
      console.log(res.data)
  
   
     dispatch({
        type: "LIST_SUCCESS",
        payload:res.data,
      
     
      });
      
      
    } catch (e) {
      console.log(e.message, "error");
      dispatch({
        type: "LIST_FAIL",
      });
    }

  };

export const DelProduct = (id) => async (dispatch) => {
 // export const DeleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "PRODUCT_DELETING_LOADING",
      });
      const res = await axios.delete(`https://fakestoreapi.com/products/${id}`);
      console.log(res.data)
    //  console.log(`${id}`)
    // console.log(`${index}`)
      dispatch({
        type: "PRODUCT_DELETING_SUCCESS",
        payload: res.data,
      // index: index,
      });
      console.log("delete")
    } catch (e) {
      console.log(e.message, "error");
      dispatch({
        type: "PRODUCT_DELETE_FAIL",
      });
    }
  };
  export const CreateProductNew = (postData) => async (dispatch) => {
    // return axios.post(`https://fakestoreapi.com/products/`,postData)
    
     try {
       dispatch({
         type: "PRODUCT_CREATE_POSTING",
       });
      
     const res=await axios.post(`https://fakestoreapi.com/products/`,postData)
     console.log(res.data)
       dispatch({
         type: "PRODUCT_CREATE_SUCCESS",
        // response: res.data,
         payload: res.data,
      // response: postData,
       });
     } catch (e) {
       console.log(e.message, "error");
       dispatch({
         type: "PRODUCT_CREATE_FAIL",
       });
     }
   };
  


   export const EditProduct1 = (EditData,id) => async (dispatch) => {
    // return axios.post(`https://fakes,idtoreapi.com/products/`,postData)
    
     try {
       dispatch({
         type: "PRODUCT_EDIT-EDITING",
       });
      
     const res=await axios.put(`https://fakestoreapi.com/products/${id}`,EditData)
     console.log(res.data)
       dispatch({
         type: "PRODUCT_EDIT_SUCCESS",
        // response: res.data,
         payload: res.data,
      // response: postData,
       });
     } catch (e) {
       console.log(e.message, "error");
       dispatch({
         type: "PRODUCT_EDIT_FAIL",
       });
     }
   };
 

  export const SearchCategory = (category) => async (dispatch) => {
    // return axios.post(`https://fakes,idtoreapi.com/products/`,postData)
    
     try {
       dispatch({
         type: "PRODUCT_SEARCH",
       });
       const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      )
      console.log(res.data)
      
   
       dispatch({
         type: "PRODUCT_SEARCH_SUCCESS",
        // response: res.data,
         payload: res.data,
      // response: postData,
       });
     } catch (e) {
       console.log(e.message, "error");
       dispatch({
         type: "PRODUCT_SEARCHID_FAIL",
       });
     }
   };
   

  export const SearchId1 = (id) => async (dispatch) => {
    // return axios.post(`https://fakes,idtoreapi.com/products/`,postData)
    
     try {
       dispatch({
         type: "PRODUCT_SEARCHID",
       });
       const res = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      )
      console.log(res.data)
      
   
       dispatch({
         type: "PRODUCT_SEARCHID_SUCCESS",
        // response: res.data,
         payload: res.data,
      // response: postData,
       });
     } catch (e) {
       console.log(e.message, "error");
       dispatch({
         type: "PRODUCT_SEARCHID_FAIL",
       });
     }
   };
  // const [items,setItems]= useState([])
//  var items=[]
 
 
 // const product='Mens Cotton Jacket'
  
  // const [items,setItems]= useState([])
//  var items=[]
 
 
 // const product='Mens Cotton Jacket'
  