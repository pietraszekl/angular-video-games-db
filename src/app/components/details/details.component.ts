import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../../models';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0;
  gameId: string = '';
  game?: Game;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpsService: HttpService
  ) {}

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private getGameDetails(id: string) {
    this.gameSub = this.httpsService
      .getGameDetails(id)
      .subscribe((game: Game) => {
        this.game = game;
        setTimeout(() => {
          this.gameRating = this.game?.details.metacritic || 0;
        }, 500);
      });
  }
}
