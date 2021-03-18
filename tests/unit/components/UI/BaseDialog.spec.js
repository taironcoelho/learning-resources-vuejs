import { mount, shallowMount } from '@vue/test-utils';
import BaseDialog from '@/components/UI/BaseDialog.vue';

describe('Base button', () => {
    describe('When provided slots', () => {
        it('Should render slots content', () => {
            const fakeHeaderSlot = '<h2>Fake header</h2>';
            const fakeDefaultSlot = '<div>Fake default</div>';
            const fakeActionsSlot = '<button>Fake action</button>';

            const wrapper = mount(BaseDialog, {
                stubs: ['base-button'],
                slots: {
                    default: fakeDefaultSlot,
                    header: fakeHeaderSlot,
                    actions: fakeActionsSlot
                }
            });

            expect(wrapper.find('h2').text()).toBe('Fake header');
            expect(wrapper.find('section div').text()).toBe('Fake default');
            expect(wrapper.find('button').text()).toBe('Fake action');
        });
    });

    describe('When not provided slots', () => {
        it('Should render fallback title if passed as props and no header slot is defined', () => {
            const fakeTitle = 'Fake title';
            const wrapper = shallowMount(BaseDialog, {
                propsData: {
                    title: fakeTitle
                }
            });
            expect(wrapper.find('h2').text()).toBe(fakeTitle);
        });

        it('Should render fallback base-button in actions slot', () => {
            const wrapper = shallowMount(BaseDialog);
            expect(wrapper.find('base-button').text()).toBe('Close');
        });
    });

    describe('$emits', () => {
        it('Should $emit close event when use click on the div around', () => {
            const wrapper = shallowMount(BaseDialog, {
                propsData: {
                    title: 'Fake title'
                }
            });

            const div = wrapper.find('div');
            div.trigger('click');
            expect(wrapper.emitted('close')).toBeTruthy();
            expect(wrapper.emitted('close').length).toBe(1)
        });

        it('Should $emit close event when user click in the fallback button', () => {
            const wrapper = shallowMount(BaseDialog, {
                propsData: {
                    title: 'Fake title'
                }
            });

            const div = wrapper.find('base-button');
            div.trigger('click');
            expect(wrapper.emitted('close')).toBeTruthy();
            expect(wrapper.emitted('close').length).toBe(1)
        });
    });
});