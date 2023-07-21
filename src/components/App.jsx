//! --- styles and components ---
import PokemonForm from './ProkemonForm/ProkemonForm';
import PokemonInfo from './PokemonInfo/PokemonInfo';
import css from './App.module.css';

//! --- tostify ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//? --- class component ---
// import React, { Component } from 'react';

// export default class App extends Component {
//   state = {
//     pokemonName: '',
//   };

//   handleFormSubmit = pokemonName => {
//     this.setState({ pokemonName });
//   };

//   render() {
//     return (
//       <div className={css.search_pokemon}>
//         <h1 className={css.search_title}>Search pokemon by name</h1>
//         <PokemonForm onSubmit={this.handleFormSubmit} />
//         <PokemonInfo pokemonName={this.state.pokemonName} />
//       </div>
//     );
//   }
// }

//! --------------------------------------------------------------------------

//? --- hooks ---
import { useState } from 'react';

export default function App() {
  const [pokemonName, setPokemonName] = useState('');

  // const handleFormSubmit = pokemonName => {
  //   setPokemonName(pokemonName);
  // };

  return (
    <div className={css.search_pokemon}>
      <h1 className={css.search_title}>Search pokemon by name</h1>
      <PokemonForm onSubmit={setPokemonName} />
      <PokemonInfo pokemonName={pokemonName} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
