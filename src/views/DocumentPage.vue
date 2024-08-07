<template>
  <div>
    <h1 class="py-4 px-4">{{ isEdit ? 'Edit Document' : 'New Document' }}</h1>
    <form @submit.prevent="saveDocument">
      <div>
        <label class="px-4 px-4" for="name">Document Name: </label>
        <div class="flex items-center">
          <BaseInput v-if="isEditing" class="py-4 px-4" id="name" v-model="document.name" required />
          <p v-else class="py-4 px-4">{{ document.name }}</p>
          <BaseButton v-if="!isEditing" @click="isEditing = true" class="ml-4" textbutton="Редактировать" />
          <BaseButton v-else @click="isEditing = false" class="ml-4" textbutton="Просмотр" />
        </div>
      </div>
      <h2 class="py-4 px-4">Items: </h2>
      <div class="flex justify-center content-center px-4 py-4" v-for="(item, index) in document.items" :key="item.id">
        <div>
          <label :for="`item-name-${index}`">Item Name: </label>
          <div class="flex items-center">
            <BaseInput v-if="isEditing" v-model="item.name" required />
            <p v-else class="py-4 px-4">{{ item.name }}</p>
          </div>
        </div>
        <div>
          <label :for="`item-manufacturer-${index}`">Manufacturer: </label>
          <div class="flex items-center">
            <BaseInput v-if="isEditing" :id="`item-manufacturer-${index}`" v-model="item.manufacturer" required />
            <p v-else class="py-4 px-4">{{ item.manufacturer }}</p>
          </div>
        </div>
        <div>
          <label :for="`item-count-${index}`">Count: </label>
          <div class="flex items-center">
            <BaseInputNumber v-if="isEditing" :id="`item-count-${index}`" v-model.number="item.count" required />
            <p v-else class="py-4 px-4">{{ item.count }}</p>
          </div>
        </div>
        <div>
          <label :for="`item-unit-${index}`">Unit: </label>
          <div class="flex items-center">
            <BaseInput v-if="isEditing" :id="`item-unit-${index}`" v-model="item.unit" required />
            <p v-else class="py-4 px-4">{{ item.unit }}</p>
          </div>
        </div>
        <div v-if="isEditing">
          <BaseButton @click="removeItem(index)" textbutton="Убрать" />
        </div>
      </div>
      <div v-if="isEditing">
        <BaseButton @click="addItem" textbutton="Добавить" />
      </div>
      <div class ="flex justify-center content-center px-4 py-4">
        <BaseButton @click="cancelEdit" textbutton="Отменить" />
        <BaseButton @click="saveDocument" textbutton="Сохранить" />
        <BaseButton @click="goToHome" textbutton="На главную" />
      </div>
    </form>
    <div v-if="!isEdit">
      <DocumentCard :document="document" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDocumentStore } from '@/stores/Document';
import DocumentCard from '@/components/DocumentCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseInputNumber from '@/components/BaseInputNumber.vue';

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

const router = useRouter();
const route = useRoute();
const documentStore = useDocumentStore();

const isEdit = computed(() => !!route.params.id);
const isEditing = ref(false);

const document = ref<Document>({
  id: 0,
  name: '',
  items: [
    { id: 0, name: '', manufacturer: '', count: 0, unit: '' },
  ],
});

watch(
  () => route.params.id,
  (id) => {
    if (id) {
      const existingDocument = documentStore.documents.find(
        (doc) => doc.id === Number(id)
      );
      if (existingDocument) {
        document.value = { ...existingDocument };
      }
    } else {
      document.value = {
        id: 0,
        name: '',
        items: [
          { id: 0, name: '', manufacturer: '', count: 0, unit: '' },
        ],
      };
    }
    isEditing.value = false;
  },
  { immediate: true }
);

const addItem = () => {
  document.value.items.push({
    id: document.value.items.length + 1,
    name: '',
    manufacturer: '',
    count: 0,
    unit: '',
  });
};

const removeItem = (index: number) => {
  document.value.items.splice(index, 1);
};

const saveDocument = () => {
  if (isEdit.value) {
    documentStore.updateDocument(document.value);
  } else {
    documentStore.addDocument(document.value);
  }
  router.push('/');
};

const goToHome = () => {
  router.push('/');
};


const originalDocument = ref<Document>({
    id: 0,
    name: '',
    items: [
      { id: 0, name: '', manufacturer: '', count: 0, unit: '' },
    ],
  });

  watch(
    () => route.params.id,
    (id) => {
      if (id) {
        const existingDocument = documentStore.documents.find(
          (doc) => doc.id === Number(id)
        );
        if (existingDocument) {
          document.value = { ...existingDocument };
          originalDocument.value = { ...existingDocument };
        }
      } else {
        document.value = {
          id: 0,
          name: '',
          items: [
            { id: 0, name: '', manufacturer: '', count: 0, unit: '' },
          ],
        };
        originalDocument.value = { ...document.value };
      }
      isEditing.value = false;
    },
    { immediate: true }
  );

  const cancelEdit = () => {
    document.value = { ...originalDocument.value };
    isEditing.value = false;
  };
</script>