import TodoStore from './TodoStore';


class Store {
  stores: { [listName: string]: TodoStore } = {}
  add(listName: string) {
    const name = listName.toLowerCase();
    if (this.stores[name]) {
      throw new Error(`${name} already exists in store`)
    }
    this.stores[name] = new TodoStore()
  }
  get(listName: string): TodoStore | undefined {
    return this.stores[listName.toLowerCase()];
  }
  remove(listName: string) {
    delete this.stores[listName.toLowerCase()];
  }
  keys() {
    return Object.keys(this.stores);
  }
}

export default new Store();
