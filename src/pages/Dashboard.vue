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
  <div class="min-h-screen bg-linear-to-b from-blue-50 to-white p-6">
    <!-- Header -->
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-extrabold text-blue-700">Checklist Hari Ini</h1>
      <p
        class="mt-1 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700"
      >
        {{ today }}
      </p>
    </div>

    <!-- Content -->
    <div v-if="lists.length" class="space-y-3">
      <p class="text-center text-gray-600 mb-4">
        Jangan sampe lupa checklist ini 👇
      </p>

      <div
        v-for="list in lists"
        :key="list.id"
        class="flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition"
        :class="
          list.isDone
            ? 'bg-gray-100 border-gray-200'
            : 'bg-white border-blue-100 hover:shadow-md cursor-pointer'
        "
      >
        <!-- Checkbox -->
        <input
          type="checkbox"
          :id="list.id.toString()"
          v-model="list.isDone"
          :disabled="list.isDone"
          :class="[
            list.isDone
              ? 'h-6 w-6 cursor-not-allowed opacity-60'
              : 'h-6 w-6 rounded-lg accent-blue-500 cursor-pointer',
          ]"
        />

        <!-- Label -->
        <label
          :for="list.id.toString()"
          class="flex-1 text-lg font-medium"
          :class="
            list.isDone
              ? 'text-gray-400 line-through pointer-events-none'
              : 'text-gray-800  cursor-pointer'
          "
        >
          {{ list.name }}
        </label>

        <!-- Done badge -->
        <span
          v-if="list.isDone"
          class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600"
        >
          DONE ✅
        </span>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="text-center text-gray-500 mt-10">
      Belum ada checklist hari ini 🌱
    </div>
  </div>
</template>
