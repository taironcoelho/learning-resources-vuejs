import { mount } from '@vue/test-utils';
import BaseButton from '@/components/UI/BaseButton.vue';

describe('Base button', () => {
    it('Should receive class as props and set it into the button', () => {
        const wrapper = mount(BaseButton, {
            propsData: {
                class: 'fake-css-class'
            }
        });

        expect(wrapper.find('button').classes()).toContain('fake-css-class');
    });

    it('Should render default slot', () => {
        const fakeSlot = '<div>Fake slot content</div>';
        const wrapper = mount(BaseButton, {
            propsData: {
                class: 'fake-css-class',
               
            }, 
            slots: {
                default: fakeSlot
            }
        });

        expect(wrapper.find('div').text()).toBe('Fake slot content');
    });
});