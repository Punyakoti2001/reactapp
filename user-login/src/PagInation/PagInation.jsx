import React from 'react'

export default function PagInation({postPerPage,totalPosts,currentPage,setCurrentPage}) 
{

    let page = []
    for (let i=1;i<=Math.ceil(totalPosts/postPerPage);i++)
    {
        page.push(i)
    }
    function abc()
    {}
    
  return (
    <div>
        <ul className='pagination'>
        {
            page.map((pag,index)=>(
                <li className={`page-item page-link`} key={pag} ><button onClick={()=>{ setCurrentPage(pag)
                    
                }} >{pag}</button></li>
            ))
        }
      
        </ul>
        
    </div>
  )
}
