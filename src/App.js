import './App.css';
import React,{useState,useEffect} from "react"
import Recipe from './Recipe';

const App=()=>{
  const APP_ID='9cdabfee';
  const APP_KEY='31de1b70c164e9425706ec1eee12a6b6';

  const [recipes,setRecipes]=useState([])
  const [search,setSearch]=useState("")
  const [query,setQuery]=useState('chicken')

  useEffect(()=>{
    getRecipes();
  },[query])

  const getRecipes= async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data=await response.json(); //format it
    setRecipes(data.hits);
  };

  const updateSearch=e=>{
    setSearch(e.target.value);
  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe=>(
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
        image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
      
    </div>
  )
}

export default App;
