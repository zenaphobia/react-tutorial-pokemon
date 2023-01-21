function UserFilter({filters, setUserFilter}) {

  return (
    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        {filters.map(f=>(
            <a href={'#'+f.name} key={f.name}>
                <button id={f.name} className="mx-1 my-1 light" onClick={()=>{setUserFilter(f.name)}}>{f.name ? f.name : 'All'}</button>
            </a>
        ))}
    </div>
  )
}

export default UserFilter
