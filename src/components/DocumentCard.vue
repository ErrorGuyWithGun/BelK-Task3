<template>
  <div class="flex justify-center content-center ">
    <div class=" px-4 py-4  mb-4 cursor-pointer bg-teal-200 shadow-xl" @click="toggleExpand">
      <h2>{{ document.name }}</h2>
      <ul>
        <p>Всего товаров:</p>
        <li v-for="(count, unit) in getSummaryByUnit(document.items)" :key="unit">
          {{ count }} {{ unit }}
        </li>
      </ul>
    </div>
    <div class=" px-4 py-4  mb-4 cursor-pointer bg-teal-200 shadow-xl " v-if="isExpanded">
      <ul>
        <li v-for="item in document.items" :key="item.name">
          {{ item.count }} {{ item.unit }} - {{ item.name }} ({{ item.manufacturer }})
        </li>
      </ul>
    </div>
      <div class="py-4 object-center">
        <BaseButton @click="editDocument" textbutton="Редактировать" />
        <BaseButton @click="removeDocument" textbutton="Удалить" />
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useDocumentStore } from '@/stores/Document';
import BaseButton from '@/components/BaseButton.vue';

interface Document {
  id: number;
  name: string;
  items: Item[];
}

interface Item {
  name: string;
  manufacturer: string;
  count: number;
  unit: string;
}

const props = defineProps<{ document: Document }>();
const router = useRouter();
const documentStore = useDocumentStore();
const isExpanded = ref(false);

const getSummaryByUnit = (items: Item[]) => {
  return items.reduce((summary, item) => {
    summary[item.unit] = (summary[item.unit] || 0) + item.count;
    return summary;
  }, {} as Record<string, number>);
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const editDocument = () => {
  router.push(`/document/${props.document.id}`);
};



const removeDocument = () => {
  documentStore.removeDocument(props.document.id);
};
</script>