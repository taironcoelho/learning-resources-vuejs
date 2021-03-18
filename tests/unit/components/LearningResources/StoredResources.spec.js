import { mount } from '@vue/test-utils';
import StoredResources from '@/components/LearningResources/StoredResources.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseCard from '@/components/UI/BaseCard.vue';

describe('Stored Resources', () => {
    it('Should render render-resources', () => {
        const wrapper = mount(StoredResources, {
            global: {
                stubs: {
                    BaseButton,
                    BaseDialog,
                    BaseCard
                },
                provide: {
                    resources:[
                        {
                            id: 'official-guide',
                            title: 'Official Guide',
                            description: 'The official Vuejs documentation',
                            link: 'https://vuejs.org'
                        },
                        {
                            id: 'fake-id',
                            title: 'Fake title',
                            description: 'Fake description',
                            link: 'https://google.com'
                        }
                    ]
                }
            },
        });
        const wrapperText = wrapper.text();

        expect(wrapperText).toContain('Official Guide');
        expect(wrapperText).toContain('The official Vuejs documentation');
        expect(wrapperText).toContain('Fake title');
        expect(wrapperText).toContain('Fake description');
        expect(wrapper.findAll('a')[0].attributes('href')).toBe('https://vuejs.org');
        expect(wrapper.findAll('a')[1].attributes('href')).toBe('https://google.com');
    });
});
