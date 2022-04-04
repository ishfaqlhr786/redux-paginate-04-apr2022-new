


import React ,{useState,useEffect,useCallback} from 'react'
import {useDispatch,useSelector}  from 'react-redux'
import {EditProduct} from './EditProduct'
import {GetProductList, SearchCategory}  from '../actions/ProductActions'
import {DelProduct}   from '../actions/ProductActions'
import  {EditProduct1}  from '../actions/ProductActions'
import {CreateProductNew}  from '../actions/ProductActions'
import {SearchId1}  from '../actions/ProductActions'
import {useHistory,useLocation}  from 'react-router-dom'
import QueryString  from 'query-string'
import {Pagination}  from './Pagination'
import {SelectAll2} from './SelectAll2'
import  {nanoid } from 'nanoid'

import '../App.css'
export const List = () => {
    const loc=useLocation()
    const history=useHistory()
    const {search} = loc
   const parsed= QueryString.parse(search)
   console.log(parsed.limit)
   console.log(parsed.offset)
    const dispatch=useDispatch()
    const products=useSelector((state)=> state.List)
    console.log(products.loading)
    const DelOne=useSelector((state)=>state.DeleteOne)
    console.log(DelOne)
    const editOne=useSelector((state)=>state.EditProduct)
    console.log(editOne)
    const searchCat=useSelector((state)=>state.SearchCat)
    console.log("search data is",searchCat.data)
    const searchid=useSelector((state)=>state.SearchId1)
    console.log(searchid.data)

    console.log(products.data)
    const [currentItems,setCurrentItems]=useState([])
    const [ProductId,setPid]=useState(0)
    const [limit,setLimit]= useState(parsed.limit)
    const [category,setCategory]=useState("plz enter category")
    const [searchId,setSearchId]=useState(0)
    const [showPerPage,setShowPerPage]= useState(limit)
    const [pagination,setPagination]=useState({
        start:parsed.offset,
        end:showPerPage
    })
    const [form,setForm]= useState({
       id:0,
        category:"",
        title:"",
        price:0,
        image:""
    })
    const [editForm,setEditForm]=useState({
        id:0,
        category:"",
        title:"",
        price:0,
        image:""
       
      })
  
    useEffect(()=>{
      
        setCurrentItems([...products.data.slice(pagination.start,pagination.end)])
        //products.loading= true
      },[pagination.start,pagination.end,limit])
    console.log(currentItems)
   
    
    
   
    useEffect(()=>{
        //  setCurrentItems([...products.data.slice(pagination.start,pagination.end)])
        dispatch(GetProductList())
      },[])
      
    const onPageChange=(start,end)=>{
   
        console.log(start, end)
        setPagination({ start: start, end: end })
        history.push({
            pathname: '/list',
            search: "?" + new URLSearchParams({ limit: limit }).toString() + "&&" + new URLSearchParams({ offset: start }).toString()
        })
      }
   
    const EditClicked=(e,index,id,item)=>{
        e.preventDefault()
        console.log(index)
        setPid(id)
        const editData={
            id:item.id,
             category:item.category,
            price:item.price,
            title:item.title,
            image:item.image
            
     
     
         }
         setEditForm(editData)

    }
    const handleLimit=(e)=>{
        e.preventDefault()
        setLimit(e.target.value)
        setShowPerPage(e.target.value)
        onPageChange(0, e.target.value)
          
    }
   
    const handleSearchByCategory=(e,category)=>{
       e.preventDefault();
        console.log(category)
      
       
        dispatch(SearchCategory(category))
       
   const a=  currentItems.filter(p=>p.category===category)
   console.log(a)
   let newData=[]
   newData= a;
   console.log(newData)
   setCurrentItems(newData)
    }
    
    const handleSearchById=(e)=>{
        e.preventDefault();
        console.log(searchId)
      
       
        dispatch(SearchId1(searchId))
       
   const a=  currentItems.filter(p=>p.id===  parseInt(searchId))
   console.log(a)
   let newData=[]
   newData= a;
   console.log(newData)
   setCurrentItems(newData)
    }
    
    useEffect(()=>{
        changeUrl();
      },[limit])
    const changeUrl=()=>{
        history.push({
            pathname: '/list',
            search: "?" + new URLSearchParams({ limit: limit }).toString() + "&&" + new URLSearchParams({ offset: pagination.start }).toString()
        })
    }
    const HandleDelete=(e,id,index)=>{
        e.preventDefault()
        console.log("id is ",id)
        dispatch(DelProduct(id))
        const newData=[...currentItems]
        newData.splice(index,1)
        setCurrentItems(newData)

    }
    const handleChangeChk = (e) => {
        const { name, checked } = e.target;
        console.log(name)
        console.log(checked)
        if (name === "Allselect") {
            let tempUser = currentItems.map(item => {
                return { ...item, isChecked: checked }
            })
            setCurrentItems(tempUser)
        } else {
            let tempUser = currentItems.map(item => item.id === parseInt(name) ? { ...item, isChecked: checked } : item)
            console.log(tempUser)
            setCurrentItems(tempUser)




        }
  
    }
    const deleteSelected=(e)=>{
        e.preventDefault()
        let newList=[...currentItems]
        const a = currentItems.filter((item) => item?.isChecked === true)
        console.log("checked array", a)
        for(let i =0;i<a.length;i++){
            dispatch(DelProduct(a[i].id))
        const ind= newList.findIndex(el=>el.id===a[i].id)
        newList.splice(ind,1)

        }
        setCurrentItems(newList)
      }
      const handleChange=(e)=>{
        e.preventDefault()
        setForm({...form,[e.target.name]:e.target.value})
    }
    
    const EditHandle=(e)=>{
        e.preventDefault()
        setEditForm({...editForm,[e.target.name]:e.target.value})
    }
    const handleCancel=()=>{
        setPid(0);
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("form data is=",form)
       
        dispatch(CreateProductNew(form))
        const newItem={
          id:  parseInt(form.id),
            category:form.category,
            price:form.price,
            title:form.title,
            image:form.image
          }
          const newData=[...currentItems]
          newData.push(newItem)
    // const newData=[...products.data]
    // newData.push(newItem)
       setCurrentItems(newData)
      
       
    
    }
    const handleEditSubmit=(e)=>{
      //  const  handleEditFormSubmit=async(e)=>{
            e.preventDefault();
            console.log(editForm)
            dispatch(EditProduct1(editForm,ProductId))
          
                const newproducts = [...currentItems]
              
                const index = newproducts.findIndex((product) => product.id === ProductId)
                console.log(index)
              //  newproducts[index] = res.data;
                newproducts[index]= editForm
              
                setCurrentItems(newproducts)
              //  setList(newproducts)
              setPid(0)
            //  })
          

    }
    
    
    const changeImage=(e)=>{
        try {
          setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) }
    
          )
        }
        catch {
          return 0
        }
    
    
      }
      const EditImage=(e)=>{
        try {
          setEditForm({ ...editForm, image: URL.createObjectURL(e.target.files[0]) }
    
          )
        }
        catch {
          return 0
        }
    
    
      }
     
   // console.log(ProductId)
    return (
        <div style={{backgroundColor:"#b8e994"}}>
            <form>
                <table>
                    <tr>
                        <td>
                            <label>Search by Category</label>
                        </td>
                        <td><input type="text" value={category} onChange={(e)=>
                    setCategory(e.target.value)    
                    }/>
                    <button onClick={(e)=>handleSearchByCategory(e,category)}
                    className="btn btn-sm btn-primary"
                    >
                    <i className="fa fa-search-plus" 
                       style={{fontSize:"10px"}}
                       aria-hidden="true"></i>
                    </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Search by ID</label>
                        </td>
                        <td><input type="number" value={searchId} onChange={(e)=>
                    setSearchId(e.target.value)    
                    }/>
                    <button onClick={(e)=>handleSearchById(e)}
                    className="btn btn-sm btn-primary"
                    >
                    <i className="fa fa-search-plus" 
                       style={{fontSize:"20px"}}
                       aria-hidden="true"></i>
                    </button>
                        </td>
                    </tr>
                </table>
            </form>
             <span>
                  
                  <button 
                  className="btn btn-lg btn-danger"
                  onClick={(e)=>deleteSelected(e)}>Delete Selected
                  <i class="fa fa-trash" aria-hidden="true"></i></button>
                  </span>  
                  <form onSubmit={handleEditSubmit}>
            <table width="100%" border="5px solid black">
                <tr style={{backgroundColor:"grey"}}>
                <th style={{paddingLeft:"20px"}}>
                   <SelectAll2 list={currentItems}   handleChange={handleChangeChk} 
                   
                   />
                   </th>
                    <th>
                        ID
                    </th>
                    <th>
                        Category
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Picture
                    </th>
                    <th>
                        Edit
                    </th>
                    <th>
                        Delete
                    </th>
                </tr>
                {
                    currentItems.map((item,index)=>{
                        const {id,category,title,image,price}= item;
                        return(<>
                      {  ProductId ===item.id ?( <EditProduct pid={ProductId}
                      editForm={editForm} EditHandle={EditHandle} handleCancel={handleCancel} EditImage={EditImage}
                      />): (
                            <tr style={{border:"2px solid #b71540",overflow:"hidden"}}>
                                <td style={{paddingLeft:"20px"}}>
                <input type="checkbox" 
              className="  custom-control-input"
                name={item.id}
                    checked={item?.isChecked || false}
                    onChange={handleChangeChk} 
                    />
                </td>
                                <td>{id}</td>
                                <td>{category}</td>
                                <td>{title}</td>
                                <td>{price}</td>
                                <td>
                                    <img src={image} alt="ll"    style={{borderRadius:"50%",height:"100px",width:"100px"}}/>
                                </td>
                                <td>
                                    <button onClick={(e)=>EditClicked(e,index,id,item)}
                                    className="btn btn-md btn-warning"
                                    >

                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={(e)=>HandleDelete(e,id,index)}
                                    className="btn btn-md btn-danger"
                                    >
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                        
                      }
                        </>)
                    })
                }
            </table>
            </form>
            <ul style={{display:"flex", listStyleType:"none",marginLeft:"500px"}}>
          <li>
      <select style={{height:"40px",width:"100px"}}
               value={limit}
                name="limit"
              //  placeholder={placeholder}
                onChange={handleLimit}
                
              >
               
                <option value="10">10</option>
                <option value="20">
                  20
                  </option>
                <option value="5">5</option>
                <option value="25">25</option>
              </select>
              </li>
              <li>
             <Pagination showPerPage={showPerPage} onPageChange={onPageChange}
      total={products.data.length} limit={limit}
      />
      </li>
      </ul>
      <h2>Add new Product</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <label className="custom-control-label">ID</label>
                <input type="number" 
                 className=""
                name="id" required="" value={form.id}
                onChange={handleChange}
                />
              <label className="custom-control-label">Title</label>
                <input type="text" 
                 className=""
                name="title" required="required" value={form.title}
                onChange={handleChange}
                />
                <label className="custom-control-label">Category</label>
                <input type="text" 
                 className=""
                name="category" required="required" value={form.category}
                onChange={handleChange}
                />
                <label className="custom-control-label">Price</label>
                <input type="number"
                 className=""
                name="price" required="required" value={form.price}
                onChange={handleChange}
                /><br/>
                 <div style={{position:"relative", top:"100px",left:"500px"}}>
                 <label for="file">Please select am image</label>
               </div>
                <input type="file" onChange={changeImage} name="form.image" id="file"

/>


  <div>
  
   <img src={form.image} width="200px" height="190px" style={form.image === "" ? {display: "none"} : {position:"relative",bottom:"300px",left:"300px"
   
   }}
   
   />
   
   </div>
                <button 
                className="btn btn-md btn-success"
                type="submit">Add
                <i class="fa fa-plus-square" aria-hidden="true"></i></button>
            </form>
           
        </div>
    )
}