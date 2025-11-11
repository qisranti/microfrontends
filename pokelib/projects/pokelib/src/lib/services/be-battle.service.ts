import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BattleData } from "../models/battle-data.model";

@Injectable({
  providedIn: 'root',
})
export class BeBattleService {
  readonly #baseUrl = 'https://localhost:7129/api/v1/Battle';
  readonly #http = inject(HttpClient);

  createBattle(battle: BattleData): Observable<BattleData> {
    return this.#http.post<BattleData>(`${this.#baseUrl}`, battle);
  }

  getAllBattles(): Observable<BattleData[]> {
    return this.#http.get<BattleData[]>(`${this.#baseUrl}`);
  }

  setWinner(battle: BattleData): Observable<BattleData> {
    return this.#http.post<BattleData>(`${this.#baseUrl}`, battle);
  }

}
