import TodoStore from './TodoStore';


class Store {
  stores: { [listName: string]: TodoStore } = {}
  add(listName: string) {
    this.stores[listName] = new TodoStore()
  }
  get(listName: string): TodoStore | undefined {
    return this.stores[listName];
  }
  remove(listName: string) {
    delete this.stores[listName];
  }
  keys() {
    return Object.keys(this.stores);
  }
}

export default new Store();
