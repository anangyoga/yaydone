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
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tambah Checklist Baru</h1>
    <input
      v-model="taskName"
      type="text"
      placeholder="Checklist harian..."
      class="border p-2 w-full mb-4"
      @keyup.enter="handleCreate"
    />
    <button
      @click="handleCreate"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Tambah Checklist
    </button>
  </div>
  <div v-if="lists.length" class="px-6">
    <div v-for="list in lists" :key="list.id">
      <div class="flex mb-2 items-center justify-between">
        <p>{{ list.name }}</p>
        <button
          @click="handleDelete(list.id)"
          class="border rounded-md border-red-400 px-1.5 text-red-400"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-gray-600 mb-4">Belum ada checklists untuk hari ini.</p>
  </div>
  <div class="px-6">
    <button
      @click="toDashboard"
      class="border border-black px-4 w-full cursor-pointer"
    >
      Selesai
    </button>
  </div>
</template>
