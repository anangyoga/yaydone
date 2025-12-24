<script setup lang="ts">
import { ref, watch } from "vue";
import { getChecklist, saveLists } from "@/service/checklist";
interface Lists {
  id: number;
  name: string;
  isDone: boolean;
}
const data: Lists[] = getChecklist();
const lists = ref(data);
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
          :name="list.name"
          :value="list.name"
          :id="list.id.toString()"
          v-model="list.isDone"
        />
        <label
          :for="list.id.toString()"
          :class="[list.isDone === true ? 'line-through text-red-600' : '']"
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
