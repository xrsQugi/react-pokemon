//!styles
import css from './PokemonInfo.module.css';

//! notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//? --- class component ---
// import { Component } from 'react';

// export default class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     loading: false,
//     error: false,
//     status: 'idle'
//   };

//   componentDidUpdate(prevProps) {
//     if (prevProps.pokemonName !== this.props.pokemonName) {
//       this.setState({pokemon: null, status: "pending"})
//       console.log("помінялось ім'я");

//       setTimeout(() => {
//         fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
//           .then(response => {
//             if(response.ok){
//               return response.json();
//             } else{
//               return Promise.reject(new Error(`Немає покемона з іменем ${this.props.pokemonName}!`));
//             }
//           })
//           .then((pokemon) => this.setState({pokemon, status: "resolved" }))
//           .catch(error => this.setState({error, status: "rejected"}))
//       }, 1000)
//     }
//   }
//   render() {
//     const {pokemon, error, status} = this.state;

//     //!----- State machine -----
//     //? ("idle")
//     //? ("pending")
//     //? ("resolved")
//     //? ("rejected")

//     if(status === "pending"){
//       return <p className={css.loading}>Завантажую...</p>
//     }
//     if(status === "rejected"){
//       return <h3 className={css.error}>{error.message}</h3>
//     }
//     if(status === "resolved"){
//       return (
//         <div className={css.pokemon_card}>
//           <img
//             src={pokemon.sprites.other['official-artwork'].front_default}
//             alt={pokemon.name}
//             width="200"
//           />
//           <p className={css.pokemon_name}> {pokemon.name}</p>
//         </div>
//       )
//     }
//   }
// }

//! --------------------------------------------------------------------------

//? --- hooks ---
import { useState, useEffect } from 'react';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

export default function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(
    prevProps => {
      if (!pokemonName) {
        return;
      }

      setStatus(Status.PENDING);

      setTimeout(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              toast.error(`Немає покемона з іменем ${pokemonName}!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              return Promise.reject(
                new Error(`Немає покемона з іменем ${pokemonName}!`)
              );
            }
          })
          .then(pokemon => {
            setPokemon(pokemon);
            setStatus(Status.RESOLVED);
          })
          .catch(error => {
            setError(error);
            setStatus(Status.REJECTED);
            
          });
      }, 1000);
    },
    [pokemonName]
  );

  if (status === Status.PENDING) {
    return <p className={css.loading}>Завантажую...</p>;
  }
  if (status === Status.REJECTED) {
    return <h3 className={css.error}>{error.message}</h3>;
  }
  if (status === Status.RESOLVED) {
    return (
      <div className={css.pokemon_card}>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          width="200"
        />
        <p className={css.pokemon_name}> {pokemon.name}</p>
      </div>
    );
  }
}
