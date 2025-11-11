import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BattlePokemon } from "../models/battle-pokemon";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BeBattlePokemonService {
  readonly #baseUrl = 'https://localhost:7129/api/v1/BattlePokemons'; // move to env
  readonly #http = inject(HttpClient);

  createPlayerPokemon(battlepokemon: BattlePokemon): Observable<BattlePokemon> {
    return this.#http.post<BattlePokemon>(`${this.#baseUrl}`, battlepokemon);
  }

  getPlayerPokemons(battleId:number, playerName: string): Observable<BattlePokemon[]> {
    return this.#http.get<BattlePokemon[]>(`${this.#baseUrl}`);
  }

  attackPokemon(targetPokemon: BattlePokemon, attack: number): Observable<BattlePokemon> {
      const params = new HttpParams().set('Attack', attack.toString());
    return this.#http.post<BattlePokemon>(`${this.#baseUrl}/AttackPokemon`, targetPokemon, { params });
  }

}
