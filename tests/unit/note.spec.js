import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import Note from '@/components/Note.vue'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Components/Note.vue', () => {
  let note = {
    id: 1,
    title: 'Test Note',
    text: 'This is the text of the note',
    img: 'https://picsum.photos/600/300/?image=25'
  }

  const wrapper = mount(Note, {
    propsData: {
      note
    },
    localVue
  })
  const delBtn = wrapper.find('#delete')

  describe(':props', () => {
    it('renders title correctly', () => {
      expect(wrapper.find('.card-title').text()).toMatch(note.title)
    })

    it('renders text correctly', () => {
      expect(wrapper.find('.card-text').text()).toMatch(note.text)
    })

    it('renders image correctly', () => {
      expect(wrapper.find('.card-img-top').attributes().src).toMatch(note.img)
    })

    it('renders edit button', () => {
      expect(wrapper.find('#edit').exists()).toBe(true)
    })

    it('renders delete button', () => {
      expect(wrapper.find('#delete').exists()).toBe(true)
    })
  })

  describe(':events', () => {
    it('emits edit event when edit button is clicked', () => {
      const editBtn = wrapper.find('#edit')
      editBtn.trigger('click')

      expect(wrapper.emitted('edit')).toBeTruthy()
      expect(wrapper.emitted('edit').length).toBe(1)
      expect(wrapper.emitted('edit')[0]).toEqual([note])
    })

    describe('delete', () => {
      it('shows cancel-delete button and hides delete button when delete button is clicked', () => {
        delBtn.trigger('click')

        expect(wrapper.find('#delete').exists()).toBe(false)
        expect(wrapper.find('#cancel-delete').exists()).toBe(true)
      })
      it('shows delete button and hides cancel-delete button when cancel-delete button is clicked', () => {
        wrapper.find('#cancel-delete').trigger('click')

        expect(wrapper.find('#delete').exists()).toBe(true)
        expect(wrapper.find('#cancel-delete').exists()).toBe(false)
      })
      it('shows confirm-delete button and hides delete button when delete button is clicked', () => {
        delBtn.trigger('click')

        expect(wrapper.find('#delete').exists()).toBe(false)
        expect(wrapper.find('#confirm-delete').exists()).toBe(true)
      })
      it('emits delete event when confirm-delete button is clicked', () => {
        wrapper.find('#confirm-delete').trigger('click')

        expect(wrapper.emitted('delete')).toBeTruthy()
        expect(wrapper.emitted('delete').length).toBe(1)
        expect(wrapper.emitted('delete')[0]).toEqual([note])
      })
    })
  })
})
