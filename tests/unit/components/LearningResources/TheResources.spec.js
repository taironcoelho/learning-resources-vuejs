import { mount, shallowMount } from '@vue/test-utils';
import TheResources from '@/components/LearningResources/TheResources.vue';

describe('The Resources', () => {
    describe('Tabs buttons', () => {
        it('Should set :mode and select component accordingly if add-resource is selected', async () => {
            const wrapper = shallowMount(TheResources);
            const addResourceBtn = wrapper.find('#add-resource'); //Would be better set a ref in the component, but I wasn`t able to retrieve the component here
            const storedResourceBtn = wrapper.find('#stored-resources');

            assertTabBtnMode(addResourceBtn, storedResourceBtn);

            await addResourceBtn.trigger('click');
            
            expect(wrapper.vm.$data.selectedTab).toBe('add-resource');
            assertTabBtnMode(storedResourceBtn, addResourceBtn);
        });

        it('Should set :mode and select component accordingly if stored-resources is selected', async () => {
            const wrapper = shallowMount(TheResources);
            const addResourceBtn = wrapper.find('#add-resource'); //Would be better set a ref in the component, but I wasn`t able to retrieve the component here
            const storedResourceBtn = wrapper.find('#stored-resources');
            
            assertTabBtnMode(addResourceBtn, storedResourceBtn);
            
            await storedResourceBtn.trigger('click');
            
            expect(wrapper.vm.$data.selectedTab).toBe('stored-resources');
            assertTabBtnMode(addResourceBtn, storedResourceBtn);
        });
    });

    describe('Conditional component rendering', () => {
        it('Should render add-resource component if add-resource tab is selected', () => {
            const wrapper = shallowMount(TheResources);
            wrapper.setData({ selectedTab: 'add-resource' });
            expect(wrapper.find('form')).toBeTruthy();
        });

        it('Should render stored-resources component if stored-resources tab is selected', () => {
            const wrapper = mount(TheResources);
            wrapper.setData({ 
                selectedTab: 'stored-resources',
                storedResources: [
                    {
                    id: 'official-guide',
                    title: 'Official Guide',
                    description: 'The official Vuejs documentation',
                    link: 'https://vuejs.org'
                    }
                ] 
            });
            expect(wrapper.text()).toContain('Official Guide');
        });
    });
});

function assertTabBtnMode(modeFlat, modeUndefined) {
    expect(modeFlat.attributes('mode')).toBe('flat');
    expect(modeUndefined.attributes('mode')).toBeUndefined();
}
