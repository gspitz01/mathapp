import { Stats } from "./stats";

export class MockAngularFireDataBase {

}

export class MockStatsService {
  addStats(stats: Stats) {

  }
}

export class MockAngularFireAuth {
  authState = {
    subscribe: function() {

    }
  }
}
