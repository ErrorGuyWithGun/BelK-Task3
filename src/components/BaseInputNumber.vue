<template>
    <div>
        <input
            
            :value="modelValue"
            @input="handleInput"
            :class="style"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
defineProps({
  type: {
    type:Number,
  },
  modelValue: {
    type:Number,
  },
  placeholder: {
    type:String,
  },
  style:{
    type: String,
    default:'mb-4 py-2 px-4 mx-4 rounded-md  rounded-md bg-teal-200 shadow-xl transition delay-150 duration-300 ease-in-out',
  },
});


const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>