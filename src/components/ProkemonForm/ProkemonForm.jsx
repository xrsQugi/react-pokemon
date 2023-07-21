//!styles
import css from './ProkemonForm.module.css';

//! notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//? --- class component ---
// import { Component } from 'react';

// export default class PokemonForm extends Component {
//   state = {
//     pokemonName: '',
//   };

//   handleNameChange = (e) => {
//     this.setState({ pokemonName: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     if (this.state.pokemonName.trim() === '') {
//       return toast.error("Введіть ім'я покемона", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//     this.props.onSubmit(this.state.pokemonName);
//     this.setState({ pokemonName: '' });
//   };
//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit} className={css.form_pokemon}>
//           <input
//           className={css.pokemon_input}
//             type="text"
//             name="pokemonName"
//             value={this.state.pokemonName}
//             onChange={this.handleNameChange}
//           />
//           <button type="submit" className={css.pokemon_btn}>Знайти</button>
//         </form>
//       </>
//     );
//   }
// }

//! --------------------------------------------------------------------------

//? --- hooks ---
import { useState } from 'react';

export default function PokemonForm({ onSubmit }) {
  const [pokemonName, setPokemonName] = useState('');

  const handleNameChange = e => {
    setPokemonName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pokemonName.trim() === '') {
      return toast.error("Введіть ім'я покемона", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    onSubmit(pokemonName);
    setPokemonName('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form_pokemon}>
        <input
          className={css.pokemon_input}
          type="text"
          name="pokemonName"
          value={pokemonName}
          onChange={handleNameChange}
        />
        <button type="submit" className={css.pokemon_btn}>
          Знайти
        </button>
      </form>
    </>
  );
}
