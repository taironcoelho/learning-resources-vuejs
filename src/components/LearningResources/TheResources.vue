<template>
    <base-card>
        <base-button 
            id="stored-resources"
            @click="setSelectedTab('stored-resources')"
            :mode="storedResButtonMode">
            Stored Resources
        </base-button>
        <base-button 
            id="add-resource"
            @click="setSelectedTab('add-resource')"
            :mode="addResButtonMode">
            Add Resource
        </base-button>
        <keep-alive>
            <component :is="selectedTab"></component>
        </keep-alive>
    </base-card>
</template>

<script>
import StoredResources from './StoredResources.vue';
import AddResource from './AddResource.vue';

export default {
    components: { 
      StoredResources,
      AddResource 
    },
    computed: {
        storedResButtonMode() {
            return this.selectedTab === 'stored-resources' ? null : 'flat'
        },
        addResButtonMode() {
            return this.selectedTab === 'add-resource' ? null : 'flat'
        }
    },
    data() {
        return {
            selectedTab: 'stored-resources',
            storedResources : [
                {
                    id: 'official-guide',
                    title: 'Official Guide',
                    description: 'The official Vuejs documentation',
                    link: 'https://vuejs.org'
                },
                {
                    id: 'google',
                    title: 'Google',
                    description: 'Google',
                    link: 'https://google.com'
                }
            ]
        };
    },
    provide() {
        return {
            resources: this.storedResources,
            addResource: this.addResource,
            removeResource: this.removeResource
        }
    },
    methods: {
        setSelectedTab(tab) {
            this.selectedTab = tab;
        },
        addResource(title, description, link) {
            const newResource = {
                id: new Date().toISOString(),
                title: title,
                description: description,
                link: link
            };

            this.storedResources.unshift(newResource);
            this.selectedTab = 'stored-resources';
        },
        removeResource(id) {
            const index = this.storedResources.findIndex(res => res.id === id);
            this.storedResources.splice(index, 1);
        }
    }
}
</script>