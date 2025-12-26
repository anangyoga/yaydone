<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  addChecklist,
  getChecklist,
  deleteChecklist,
} from "@/service/checklist";

interface Lists {
  id: number;
  name: string;
  isDone: boolean;
}

const router = useRouter();
const taskName = ref("");
const lists = ref<Lists[]>(getChecklist());

const handleCreate = () => {
  if (!taskName.value.trim()) return;

  const updatedData = addChecklist(taskName.value);
  lists.value = updatedData;

  taskName.value = "";
};

const handleDelete = (id: number) => {
  const remainingData = deleteChecklist(id);
  lists.value = remainingData;
};

const toDashboard = () => {
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-yellow-50 p-6">
    <!-- Header -->
    <h1 class="text-3xl font-extrabold text-yellow-700 mb-6 text-center">
      Tambah Checklist ✏️
    </h1>

    <!-- Input -->
    <div class="mb-6">
      <input
        v-model="taskName"
        type="text"
        placeholder="Contoh: Minum vitamin pagi"
        class="w-full rounded-2xl border border-yellow-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        @keyup.enter="handleCreate"
      />

      <button
        @click="handleCreate"
        class="mt-3 w-full rounded-2xl bg-yellow-400 py-3 text-lg font-bold text-white shadow hover:bg-yellow-500 active:scale-95"
      >
        ➕ Tambah Checklist
      </button>
    </div>

    <!-- List -->
    <div v-if="lists.length" class="space-y-3">
      <div
        v-for="list in lists"
        :key="list.id"
        class="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
      >
        <p class="font-medium text-gray-800">
          {{ list.name }}
        </p>

        <button
          @click="handleDelete(list.id)"
          class="rounded-lg border border-red-300 px-3 py-1 text-sm font-semibold text-red-500 hover:bg-red-50 cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      Belum ada checklist 🌈
    </div>

    <!-- Footer -->
    <div class="mt-8">
      <button
        @click="toDashboard"
        class="w-full rounded-2xl border-2 border-yellow-600 py-3 font-bold text-yellow-700 hover:bg-yellow-100"
      >
        ✅ Selesai
      </button>
    </div>
  </div>
</template>
