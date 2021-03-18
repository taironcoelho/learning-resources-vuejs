<template>
    <base-dialog v-if="inputIsInvalid" title="Invalid Input" @close="confirmError">
      <template #default>
        <p>Unfortunately, at least one input is invalid.</p>
        <p>Please check all inputs and make sure you enter at least a few characters into each input field.</p>
      </template>
      <template #actions>
        <base-button @click="confirmError">Ok</base-button>
      </template>
    </base-dialog>
    <base-card>
        <form @submit.prevent="submitData">
            <div class="form-control">
                <label for="title">Title</label>
                <input v-model="title" id="title" name="title" type="text"/>
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea v-model="description" id="description" name="description" rows="3"/>
            </div>
            <div class="form-control">
                <label for="link">Link</label>
                <input v-model="link" id="link" name="link" type="url"/>
            </div>
            <div>
                <base-button id="add-resource-btn" type="submit">Add Resource</base-button>
            </div>
        </form>
    </base-card>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';

export default {
  components: { BaseButton },
  inject: [
    'addResource'
  ],
  data() {
    return {
      title: '',
      description: '',
      link: '',
      inputIsInvalid: false
    }
  },
  methods: {
    submitData() {
      if(this.title.trim() === '' || this.description.trim() === '' || this.link.trim() === '') {
        this.inputIsInvalid = true;
        return;
      }
      this.addResource(this.title, this.description, this.link);
      this.resetFields();
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
    resetFields(){
      this.title = '';
      this.description = '';
      this.link = '';
    }
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>