<template>
    <div>
    <p>Товары:</p>
    <ul>
      <li v-for="item in document.items" :key="item.name">
        {{ item.count }} {{ item.unit }} - {{ item.name }} ({{ item.manufacturer }})
      </li>
    </ul>
    </div>
</template>

<script setup lang="ts">


defineProps<{ document: Document }>();

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


</script>