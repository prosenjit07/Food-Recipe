import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "eb57d31f";
  const APP_KEY = "e2fb009de8d17e4fac2cbbbb71a32122";
  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  // const [counter, setCounter] = useState(0);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('checken');

  useEffect(() => {
    // console.log("Effect has been run");
    getRecipes();
    console.log('Lets say we are fetching data');
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');

  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar"
          type="text" value={search}
          onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search</button>
      </form>
      <div className='recipes'>

      {recipes.map(recipe => (
        <Recipe title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>

      {/* <h1 onClick={() => setCounter(counter + 1)}>{counter} </h1> */}

    </div>
  );
};

export default App; 