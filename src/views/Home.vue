<template>
  <div class="home container-fluid">
    <navigation></navigation>
    <div class="row">
      <div id="swal-target" class="col-6 bg-secondary">
        <img class="card-img" alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="col-6 bg-warning">
        <button class="btn btn-info" @click="$store.dispatch('swalTest')">click</button>
      </div>
    </div>

  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  name: 'home',
  components: {
    Navigation
  }
}
</script>
