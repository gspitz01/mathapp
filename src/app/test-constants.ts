import { Stats } from "./stats";

export class MockAngularFireDataBase {
  list(name: string) {
    return {
      snapshotChanges: function() {
        return {
          pipe: function(func) {}
        }
      }
    }
  }
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
