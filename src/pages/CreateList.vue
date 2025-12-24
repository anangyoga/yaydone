<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addChecklist } from "@/service/checklist";

const router = useRouter();
const taskName = ref("");

const handleCreate = () => {
  if (!taskName.value.trim()) return;

  addChecklist(taskName.value);
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
      Simpan Checklist
    </button>
  </div>
</template>
