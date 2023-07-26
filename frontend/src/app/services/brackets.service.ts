import { Injectable } from '@angular/core';
import { IApiMatch } from '@models/match.model';
import { IApiRound } from '@models/round.model';

import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BracketsService {
  convertToTree(rounds: IApiRound[], matches: IApiMatch[]): TreeNode[] {
    const roundsWithMatches: any = [];

    rounds.forEach((round) => {
      const tmpMatch = { [round.id]: [] };
      matches.forEach((match) => {
        if (match.round == round.id) (tmpMatch[round.id] as any).push(match);
      });
      roundsWithMatches.push(tmpMatch);
    });

    return [];
  }

  private createTreeNode(label: string): TreeNode {
    return { label: label };
  }
}
