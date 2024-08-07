import { defineStore } from 'pinia';


interface Document {
  id: number;
  name: string;
  items: Item[];
}

interface Item {
  id: number;
  name: string;
  manufacturer: string;
  count: number;
  unit: string;
}

export const useDocumentStore = defineStore('documents', {
  state: () => ({
    documents: [
      {
        id: 1,
        name: 'List1',
        items: [
          { id: 1, name: 'name1', manufacturer: 'man1', count: 10, unit: 'шт.' },
          { id: 2, name: 'name2', manufacturer: 'man2', count: 20, unit: 'шт.' },
          { id: 3, name: 'name3', manufacturer: 'man3', count: 30, unit: 'шт.' },
          { id: 4, name: 'name4', manufacturer: 'man4', count: 40, unit: 'шт.' },
        ],
      },
      {
        id: 2,
        name: 'List2',
        items: [
          { id: 1, name: 'name5', manufacturer: 'man5', count: 1, unit: 'шт.' },
          { id: 2, name: 'name6', manufacturer: 'man6', count: 2, unit: 'шт.' },
          { id: 3, name: 'name7', manufacturer: 'man7', count: 3, unit: 'шт.' },
          { id: 4, name: 'name8', manufacturer: 'man8', count: 4, unit: 'шт.' },
        ],
      },
    ] as Document[],
  }),
  actions: {
    addDocument(document: Document) {
      this.documents.push(document);
    },
    removeDocument(id: number) {
      this.documents = this.documents.filter(doc => doc.id !== id);
    },
    updateDocument(updatedDocument: Document) {
      const index = this.documents.findIndex(doc => doc.id === updatedDocument.id);
      if (index !== -1) {
        this.documents[index] = updatedDocument;
      }
    },
  },
});