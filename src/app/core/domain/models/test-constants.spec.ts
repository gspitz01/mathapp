import { Stats } from './stats';

export type Spied<T> = {
  [Method in keyof T]: jasmine.Spy;
};

export class MockAngularFireDataBase {
  list(name: string) {
    return {
      snapshotChanges: function() {
        return {
          pipe: function(func) {}
        };
      }
    };
  }

  object(name: string) {
    return {
      snapshotChanges: function() {
        return {
          pipe: function(func) {}
        };
      }
    };
  }
}

export class MockStatsService {
  addStats(stats: Stats) {

  }

  getMaxLevels() {
    return {
      subscribe: function() {

      }
    };
  }
}

export class MockAngularFireAuth {
  authState = {
    subscribe: function() {

    }
  };
}
