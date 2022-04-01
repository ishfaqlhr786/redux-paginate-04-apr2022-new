
import axios from 'axios'
import React ,{useState} from 'react'
const data=[
    {id:1,name:"chair",price:2000},
    {id:2,name:"table",price:2000},
    {id:2,name:"table bbbb",price:2000},
    {id:3,name:"knif",price:2000},
    {id:4,name:"cubaid",price:2000},
    {id:5,name:"bed" ,price:2000},
    {id:6,name:"chair",price:2000},
    {id:7,name:"table",price:2000},
    {id:8,name:"knif",price:2000},
    {id:9,name:"cubaid",price:2000},
    {id:10,name:"bed" ,price:2000},
    {id:11,name:"chair",price:2000},
    {id:12,name:"table",price:2000},
    {id:13,name:"knif",price:2000},
    {id:14,name:"cubaid",price:2000},
    {id:15,name:"bed" ,price:2000},
    {id:16,name:"chair",price:2000},
    {id:17,name:"table",price:2000},
    {id:18,name:"knif",price:2000},
    {id:19,name:"cubaid",price:2000},
    {id:20,name:"bed" ,price:2000},
    {id:20,name:"bedggg" ,price:2000444},
    {id:21,name:"table" ,price:2000},
    {id:22,name:"table" ,price:2000},
]

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
  // const [items,setItems]= useState([])
//  var items=[]
 
 
 // const product='Mens Cotton Jacket'
  