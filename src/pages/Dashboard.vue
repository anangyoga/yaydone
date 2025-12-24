<script setup lang="ts">
import { ref, watch } from "vue";
import { getChecklist, saveLists } from "@/service/checklist";
interface Lists {
  id: number;
  name: string;
  isDone: boolean;
}

const lists = ref<Lists[]>(getChecklist());
const today = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "2-digit",
});

watch(
  lists,
  (newLists) => {
    saveLists(newLists);
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Today Checklist: {{ today }}</h1>
    <div v-if="lists.length">
      <p class="text-gray-600">Checklist harian kamu hari ini 👇</p>

      <div v-for="list in lists" :key="list.id" class="flex gap-x-1.5">
        <input
          type="checkbox"
          :id="list.id.toString()"
          v-model="list.isDone"
          :disabled="list.isDone"
          :class="[
            list.isDone ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          ]"
        />
        <label
          :for="list.id.toString()"
          :class="[
            list.isDone
              ? 'pointer-events-none text-gray-400 line-through'
              : 'cursor-pointer',
          ]"
        >
          {{ list.name }}
        </label>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600 mb-4">Belum ada checklists untuk hari ini.</p>
    </div>
  </div>
</template>
