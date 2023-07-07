import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './ProkemonForm.module.css'

export default class PokemonForm extends Component {
  state = {
    pokemonName: '',
  };

  handleNameChange = e => {
    this.setState({ pokemonName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.pokemonName.trim() === '') {
        return Notify.failure("Введіть ім'я покемона");
    }
    this.props.onSubmit(this.state.pokemonName);
    this.setState({ pokemonName: '' });
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={css.form_pokemon}>
          <input
          className={css.pokemon_input}
            type="text"
            name="pokemonName"
            value={this.state.pokemonName}
            onChange={this.handleNameChange}
          />
          <button type="submit" className={css.pokemon_btn}>Знайти</button>
        </form>
      </>
    );
  }
}
