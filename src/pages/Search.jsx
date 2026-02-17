import { useParams } from "react-router-dom";

function Search(){
  const { query } = useParams();

  return <h1>Search Results for: {query}</h1>;
}

export default Search;
