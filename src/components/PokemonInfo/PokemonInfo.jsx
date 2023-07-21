import { Component } from 'react';
import css from './PokemonInfo.module.css'

// export default class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     loading: false,
//     error: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.pokemonName !== this.props.pokemonName) {
//       this.setState({loading: true, pokemon: null, error: false})
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
//           .then(pokemon => this.setState({ pokemon }))
//           .then(() => {
//             this.setState({error: false})
//           })
//           .catch(error => this.setState({error, status: "rejected"}))
//           .finally(() => {
//             this.setState({loading: false})
//           })
//       }, 1000)
//     }
//   }
//   render() {
//     const {pokemon, loading, error} = this.state;

//     return (
//       <div>
//         {error && <h3>{error.message}</h3>}
//         {loading && <p>Загружаю...</p>}
//         {pokemon && (
//           <div className={css.pokemon_card}>
//             <img
//               src={pokemon.sprites.other['official-artwork'].front_default}
//               alt={pokemon.name}
//               width="200"
//             />
//             <p className={css.pokemon_name}> {pokemon.name}</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }



export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
    error: false,
    status: 'idle'
  };

  componentDidUpdate(prevProps) {
    if (prevProps.pokemonName !== this.props.pokemonName) {
      this.setState({pokemon: null, status: "pending"})
      console.log("помінялось ім'я");

      setTimeout(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
          .then(response => {
            if(response.ok){
              return response.json();
            } else{
              return Promise.reject(new Error(`Немає покемона з іменем ${this.props.pokemonName}!`));
            }
          })
          .then((pokemon) => this.setState({pokemon, status: "resolved" }))
          .catch(error => this.setState({error, status: "rejected"}))
      }, 1000)
    }
  }
  render() {
    const {pokemon, error, status} = this.state;

    //!----- State machine -----
    //? ("idle")
    //? ("pending")
    //? ("resolved")
    //? ("rejected")

    if(status === "pending"){
      return <p className={css.loading}>Завантажую...</p>
    } 
    if(status === "rejected"){
      return <h3 className={css.error}>{error.message}</h3>
    }
    if(status === "resolved"){
      return (
        <div className={css.pokemon_card}>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width="200"
          />
          <p className={css.pokemon_name}> {pokemon.name}</p>
        </div>
      )
    }
  }
}