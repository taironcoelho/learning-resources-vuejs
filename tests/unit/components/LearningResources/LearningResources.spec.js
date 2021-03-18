import { shallowMount } from '@vue/test-utils';
import LearningResources from '@/components/LearningResources/LearningResources.vue';

describe('Learning Resources', () => {
    
    it('Should render when provided props', () => {
        const wrapper = shallowMount(LearningResources, {
            propsData: {
                id: 'fake-id',
                title: 'fake title',
                description: 'fake description',
                link: 'http://localhost'
            }
        });

        const wrapperText = wrapper.text();

        expect(wrapperText).toContain('fake title');
        expect(wrapperText).toContain('fake description');
        expect(wrapper.find('a').attributes('href')).toBe('http://localhost');
    });

    it('Should call removeResource injected function when click on delete button', async () => {
        const mockRemoveResource = jest.fn();
        const wrapper = shallowMount(LearningResources, {
            global: {
               provide: {
                    removeResource: mockRemoveResource
                } 
            }
        });
        const deleteBtn = wrapper.find('#delete-btn');
        
        await deleteBtn.trigger('click');

        expect(mockRemoveResource).toHaveBeenCalledTimes(1);
    });
});