import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Table , Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PaginatedItems } from '../Pagination/Pagination'

const TableShow = ({ header, data  , currentUser , total , setLimit   , limit , setPage, page  , del}) => {
  currentUser = currentUser || false

  const headerTable = header.map((item,index) => {
    return (
      <th>
        {item.key}
        </th>
    )
  })

 
  const dataTable = data.map((item1 , index) => {
    return (
      <tr>
             
             <td>{item1.id }</td>

        {
          header.map((item2 , index) => {
            return (
              
              <td className='text-center'>
                
                {
                  currentUser && item1[item2.key] === currentUser.name ? item1[item2.key] + " ( You )" :
                item1[item2.key] === "1995" ? "admin" :
                item1[item2.key] === "1992" ? "Writer" :
                item1[item2.key] === "1999" ? "product" :
                 item1[item2.key] === "2001" ? "user" :
                   
                   item2.key === "images" ? (
                   <div className='d-flex flex-wrap gap-2'>
                    {item1[item2.key].map(img => <img width={50} src={img.image} alt='img-product'/>)}
                  </div>
                ) 
                :
                 item2.key === "image" ? <img  className='img-fluid  img-thumbnail ' alt='img-category' style={{width : "100px"}} src={item1[item2.key]}/> : item1[item2.key]}</td>
              
            )
          })
        }
        <td>
            <div className='d-flex gap-2'>
              <FontAwesomeIcon  cursor={item1.id === currentUser.id  ? "no-drop" :"pointer"} onClick={() => {del(item1.id)}} fontSize={"19px"} color={item1.id === currentUser.id  ? "#f5abab" :'red'} icon={faTrash} />
              <Link to={`${item1.id}`}>
                <FontAwesomeIcon cursor={"pointer"} fontSize={"19px"} icon={faPenToSquare} />
              </Link>
            </div>
          </td>
      </tr>
    )
  })
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {headerTable}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr ><td colSpan={12} className='text-center'>Loading</td> </tr> :
            data.length < 1 ? <tr ><td colSpan={12} className='text-center'>Not User found</td> </tr> : dataTable}
        </tbody>
      </Table>

      <div className=' w-100 d-flex justify-content-center w-100 align-items-center gap-5'>
       
        <span>total items : {total}</span>
        <PaginatedItems  setPage={setPage} limit={limit} total={total}  />
        <Form.Select style={{width:"100px"}} name='countPages'  onChange={ (e) => setLimit(e.target.value) }  id='countPages'  required  >
                        <option value='' >select</option>
                        <option value='3'>3</option>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>                  
        </Form.Select>
      </div>

    </div>
  )
}

export default TableShow