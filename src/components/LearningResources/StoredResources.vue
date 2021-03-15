<template>
    <ul>
        <learning-resources 
            v-for="resource in resources" 
            :key="resource.id"
            :="resource"
        >
        </learning-resources>
    </ul>
</template>

<script>
import LearningResources from './LearningResources.vue';

export default {
    components: {
        LearningResources
    },
    inject:['resources']
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}
</style>
