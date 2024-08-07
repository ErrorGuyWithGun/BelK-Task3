<template>
    <div>
      <h1 class="font-bold text-center px-4 py-4 ">Отчетные документы</h1>
      <DocumentCard
        v-for="document in documents"
        :key="document.id"
        :document="document"
      />
      <BaseButton 
        @click="createDocument"
        textbutton="Добавить документ"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useDocumentStore } from '@/stores/Document';
  import { useRouter } from 'vue-router';
  import DocumentCard from '@/components/DocumentCard.vue';
  import BaseButton from '@/components/BaseButton.vue';
  
  
  const documentStore = useDocumentStore();
  const router = useRouter();
  
  const documents = documentStore.documents;
  
  const createDocument = () => {
    router.push('/document/new');
  };
  </script>
  