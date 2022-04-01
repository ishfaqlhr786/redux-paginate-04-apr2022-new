import React ,{useState,useEffect,useCallback} from 'react'
import {useDispatch,useSelector}  from 'react-redux'
import {EditProduct} from './EditProduct'
import {GetProductList}  from '../actions/ProductActions'
import {DelProduct}   from '../actions/ProductActions'
import {CreateProductNew}  from '../actions/ProductActions'
import {useHistory,useLocation}  from 'react-router-dom'
import QueryString  from 'query-string'
import {Pagination}  from './Pagination'
import {SelectAll2} from './SelectAll2'
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
    const DelOne=useSelector((state)=>state.DeleteOne)
    console.log(DelOne)
    console.log(products.data)
    const [currentItems,setCurrentItems]=useState([])
    const [ProductId,setPid]=useState(0)
    const [limit,setLimit]= useState(parsed.limit)
    
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
  
    useEffect(()=>{
      
        setCurrentItems([...products.data.slice(pagination.start,pagination.end)])
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
   
    const EditClicked=(e,index,id)=>{
        e.preventDefault()
        console.log(index)
        setPid(id)
    }
    const handleLimit=(e)=>{
        e.preventDefault()
        setLimit(e.target.value)
        setShowPerPage(e.target.value)
        onPageChange(0, e.target.value)
          
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
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("form data is=",form)
        // const res=await axios.post(`https://fakestoreapi.com/products/`,form)
        // console.log(res.data)
        dispatch(CreateProductNew(form))
        const newItem={
            id: parseInt(form.id),
            category:form.category,
            price:form.price,
            title:form.title,
            image:form.image
          }
          const newData=[...currentItems]
          newData.push(newItem)
       // let arr=[...currentItems,form]
       // arr.push(res.data)
       // setList(arr)
        setCurrentItems(newData)
      
       
    
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
     
   // console.log(ProductId)
    return (
        <div>
             <span>
                  
                  <button 
                  className="btn btn-lg btn-danger"
                  onClick={(e)=>deleteSelected(e)}>Delete Selected
                  <i class="fa fa-trash" aria-hidden="true"></i></button>
                  </span>  
            <table>
                <tr>
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
                </tr>
                {
                    currentItems.map((item,index)=>{
                        const {id,category,title,image,price}= item;
                        return(<>
                      {  ProductId ===item.id ?( <EditProduct pid={ProductId}/>): (
                            <tr>
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
                                    <img src={image} alt="ll" width="200px"  height="200px"/>
                                </td>
                                <td>
                                    <button onClick={(e)=>EditClicked(e,index,id)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={(e)=>HandleDelete(e,id,index)}>Delete</button>
                                </td>
                            </tr>
                        )
                        
                      }
                        </>)
                    })
                }
            </table>
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
                 className="form-control"
                name="id" required="" value={form.id}
                onChange={handleChange}
                />
              <label className="custom-control-label">Title</label>
                <input type="text" 
                 className="form-control"
                name="title" required="required" value={form.title}
                onChange={handleChange}
                />
                <label className="custom-control-label">Category</label>
                <input type="text" 
                 className="form-control"
                name="category" required="required" value={form.category}
                onChange={handleChange}
                />
                <label className="custom-control-label">Price</label>
                <input type="number"
                 className="form-control"
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
