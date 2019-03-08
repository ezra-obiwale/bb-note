import { createLocalVue, mount } from '@vue/test-utils'
import Home from '@/views/Home'
import store from '@/store'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Views/Home', () => {
  const wrapper = mount(Home, {
    localVue,
    store
  })
  const createBtn = wrapper.find('#create')
  const modal = wrapper.find('.modal')
  const saveBtn = wrapper.find('.modal .btn-primary')
  const grid = wrapper.find('#grid')

  it('renders a create button', () => {
    expect(createBtn.exists()).toBe(true)
  })

  it('not showing any note', () => {
    expect(wrapper.findAll('.grid-item').length).toBe(0)
  })

  it('shows empty note message', () => {
    expect(wrapper.find('#empty-notes').exists()).toBe(true)
  })

  it('has a modal on the page but hidden', () => {
    expect(modal.exists()).toBe(true)
    expect(modal.isVisible()).toBe(false)
  })

  describe('actions', () => {
    describe('creating', () => {
      it('should show the modal when the create button is clicked', done => {
        createBtn.trigger('click')

        wrapper.vm.$nextTick(() => {
          expect(modal.isVisible()).toBe(true)
          done()
        })
      })

      it('ensures save button is disabled by default', () => {
        expect(saveBtn.attributes('disabled')).toBeTruthy()
      })

      it('ensure save button is not disabled when values are provided', () => {
        wrapper.find('.modal #title').setValue('This is the title')
        wrapper.find('.modal #text').setValue('This is the text content')

        expect(saveBtn.attributes('disabled')).toBeFalsy()
      })

      describe('when save button is clicked', () => {
        it('does not show empty note message', done => {
          saveBtn.trigger('click')
          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('#empty-notes').exists()).toBe(false)
            done()
          })
        })

        it('hides modal after saving', () => {
          expect(modal.isVisible()).toBe(false)
        })

        it('shows the saved note', () => {
          expect(wrapper.vm.notes.length).toEqual(1)
          expect(grid.findAll('.grid-item').length).toEqual(1)
          expect(grid.find('.grid-item').text()).toContain('This is the text content')
        })
      })
    })
  })
})
