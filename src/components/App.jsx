import React, { Component } from 'react';
import PokemonForm from './ProkemonForm/ProkemonForm';
import PokemonInfo from './PokemonInfo/PokemonInfo';
import css from './App.module.css'

export class App extends Component {
  state = {
    pokemonName: '',
  };

  handleFormSubmit = pokemonName => {
    this.setState({ pokemonName });
  };

  render() {
    return (
      <div className={css.search_pokemon}>
        <h1 className={css.search_title}>Search pokemon by name</h1>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} />
      </div>
    );
  }
}
