import { shallowMount } from '@vue/test-utils';
import AddResource from '@/components/LearningResources/AddResource.vue';

describe('Add Resource', () => {
    
    it('Should be able to add resource', async () => {
        const mockAddResourceFn = jest.fn();
        const wrapper = shallowMount(AddResource, {
            global: {
                provide: {
                    addResource: mockAddResourceFn
                }
            }
       });
       
       const titleInput = wrapper.find('input[id="title"]');
       const descriptionInput = wrapper.find('textarea[id="description"]');
       const linkInput = wrapper.find('input[id="link"]');

       await titleInput.setValue('fake title');
       await descriptionInput.setValue('fake description');
       await linkInput.setValue('http://localhost');
       await wrapper.find("form").trigger("submit.prevent");

       expect(mockAddResourceFn).toHaveBeenCalledTimes(1);
       expect(titleInput.text()).toBe('');
       expect(descriptionInput.text()).toBe('');
       expect(linkInput.text()).toBe('');
    });

    it('Should set invalid flag if there`s form validation errors', async () => {
        const mockAddResourceFn = jest.fn();
        const wrapper = shallowMount(AddResource, {
            global: {
                provide: {
                    addResource: mockAddResourceFn
                }
            }
       });

       await wrapper.find("form").trigger("submit.prevent");
       expect(wrapper.vm.$data.inputIsInvalid).toBeTruthy();
       expect(mockAddResourceFn).not.toHaveBeenCalled();
    });
});