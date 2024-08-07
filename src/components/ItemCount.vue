<template>
    <div>
    <p>Всего товаров:</p>
    <ul>
      <li v-for="(count, unit) in getSummaryByUnit(document.items)" :key="unit">
        {{ count }} {{ unit }}
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

const getSummaryByUnit = (items: Item[]) => {
  return items.reduce((summary, item) => {
    summary[item.unit] = (summary[item.unit] || 0) + item.count;
    return summary;
  }, {} as Record<string, number>);
};

</script>