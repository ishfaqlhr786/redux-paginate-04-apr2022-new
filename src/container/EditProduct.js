

export const EditProduct = ({editForm,EditHandle,handleCancel,EditImage}) => {
    console.log(EditHandle)
    return (
        <>
           <tr style={{overflow:"hidden"}}>
              
           <td>
           <input type="number" value={editForm.id}
           name="id"/>
           </td>
           <td>
           
           <input type="text" value={editForm.category}
           name="category" onChange={EditHandle}
           />
           </td>
           <td>
           
           <input type="title" value={editForm.title}
           name="title" onChange={EditHandle}
           />
           </td>
           <td>
           
           <input type="price" value={editForm.price}
           name="price" onChange={EditHandle}
           />
           </td>
           <td>
           <input type="file" onChange={EditImage} name="editForm.image" id="file1"/>
        <h6 style={{position:"relative",top:"-30px",right:"0px" ,left:"30px"}}> select new image</h6>  
          
           </td>
           <td>
               <img src={editForm.image}  alt="ll" width="100px" height="100px" style={{borderRadius:"50%"}}/>
           </td>
           <td>
               <button type="submit" className="btn btn-md btn-success">
               <i class="fa fa-plus-square" aria-hidden="true"></i>
               </button>
           </td>
           <td>
               <button onClick={handleCancel}
               className="btn btn-md btn-secondary"
               >Cancel</button>
           </td>
           </tr>

        </>
    )
}