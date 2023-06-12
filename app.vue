<template>
  <div class="list-task" style="padding-left: 20px;">
    <h1>Todo List</h1>
    <p v-if="tasks.length === 0">Belum ada task</p>
    <div v-if="!isCreating || tasks.length > 0">
      <div v-for="item of tasks" :key="item.title" :class="[ 'item-task', getTaskClass(item) ]" style="display: flex; align-items: start; border-bottom: 1px solid; padding-top: 3px; padding-bottom: 4px;">

        <input
          type="checkbox"
          name="status"
          id="task"
          class="me-2 mt-2"
          :checked="item.isDone"
          @change="toggleTaskStatus(item)"
        >
        <div class="d-flex flex-column">
          <div class="title-task mb-1">
            {{ item.title }}
          </div>
          <div class="description-task small text-muted">
            {{ item.description }}
          </div>
          <a href="#" class="add-button" @click="deleteTask(item)">Delete</a>
        </div>
      </div>
    </div>
    <div class="action py-2">
      <a href="#" class="add-button" v-if="!isCreating" @click="isCreating = !isCreating">Add Task</a>
      <div class="add-card" v-else>
        <div class="card mb-2">
          <div class="card-body d-flex flex-column p-0">
            <input class="form-control border-0 mb-2" placeholder="Title" type="text" v-model="newTask.title">
            <textarea class="form-control border-0 small" placeholder="Description" rows="3" v-model="newTask.description"></textarea>
          </div>
        </div>
        <div class="button-wrapper d-flex">
          <button class="btn btn-primary me-2" @click="saveTask">Save</button>
          <button class="btn btn-outline-secondary" @click="cancelTask">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tasks: [] as { title: string; description: string; isDone: boolean }[],
      isCreating: false,
      newTask: {
        title: '',
        description: ''
      } as { title: string; description: string }
    }
  },
  methods: {
    saveTask() {
      this.tasks.push({
        title: this.newTask.title,
        description: this.newTask.description,
        isDone: false
      });
      this.newTask.title = '';
      this.newTask.description = '';
      this.isCreating = false; // Menyembunyikan formulir setelah menyimpan
    },
    cancelTask() {
      this.newTask.title = '';
      this.newTask.description = '';
      this.isCreating = false; // Menyembunyikan formulir saat dibatalkan
    },
    deleteTask(task: { title: string; description: string; isDone: boolean }) {
      const index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    },
    toggleTaskStatus(task: { title: string; description: string; isDone: boolean }) {
      task.isDone = !task.isDone;
    }
  },
  computed: {
    getTaskClass() {
      return function(task: { title: string; description: string; isDone: boolean }) {
        return task.isDone ? 'completed' : '';
      }
    }
  }
}
</script>

<style>
.item-task.completed .title-task {
  text-decoration: line-through;
}
</style>
