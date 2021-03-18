import { shallowMount } from '@vue/test-utils';
import TheHeader from '@/components/Layouts/TheHeader.vue';

describe('The Header', () => {
    it('Should receive title as prop and render into h1', () => {
        const wrapper = shallowMount(TheHeader, {
            propsData: {
                title: 'Fake title'
            }
        });

        expect(wrapper.find('h1').text()).toBe('Fake title');
    });
});