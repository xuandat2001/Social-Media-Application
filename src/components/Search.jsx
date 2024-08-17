function Search(){
    return(
        <>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input
            className="form-control"
            type="search"
            placeholder="Search User"
            aria-label="Search"
            //value={search}
            //onChange={(e) => setSearch(e.target.value)}
            />
      </form>
        </>
    )
}
export default Search;