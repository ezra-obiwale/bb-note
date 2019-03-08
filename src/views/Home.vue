<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h3>
          <b-link target="_blank" v-b-tooltip.hover.right="'See on GitHub'" class="link" href="https://github.com/ezra-obiwale/bb-note">BrandBoom Notes</b-link>
          <b-button class="float-right" id="create" @click="add" variant="primary">&plus; New Note</b-button>
        </h3>
        <hr>
      </b-col>
    </b-row>
    <b-row id="grid">
      <!-- <masonry selector="#grid" :data="notes" :options="masonryOptions">
        <b-col slot-scope="{ current }" xs="12" md="6" lg="4" class="grid-item">
          <bb-note :note="current" @edit="edit" @delete="remove" />
        </b-col>
      </masonry>-->
      <b-col v-for="note in notes" :key="note.id" xs="12" md="6" lg="4" class="grid-item">
        <bb-note
          :note="note"
          @edit="edit"
          @delete="remove"
          @changeColor="changeCardColor(note, $event)"
        />
      </b-col>
      <b-col cols="12" id="empty-notes" class="text-center" v-if="!notes.length">You have no notes</b-col>
    </b-row>
    <b-modal
      ref="modal"
      :title="modalTitle"
      ok-title="Save"
      :busy="working"
      :ok-disabled="!canSave"
      @ok="save"
    >
      <b-form-group>
        <b-col cols="12">
          <b-form-input id="title" type="text" v-model="note.title" required placeholder="Title"/>
        </b-col>
      </b-form-group>
      <b-form-group>
        <b-col cols="12">
          <b-form-textarea
            id="text"
            v-model="note.text"
            required
            placeholder="Content"
            no-resize
            max-rows="10"
          />
        </b-col>
      </b-form-group>
      <b-form-group>
        <b-col cols="12">
          <div class="img-container" v-if="note.img">
            <b-button v-b-tooltip.hover.left="'Remove image'" class="img-button" variant="danger" @click="resetImage">&times;</b-button>
            <b-img :src="note.img" alt fluid-grow/>
          </div>
          <b-form-file
            v-show="!note.img"
            @input="imageChanged"
            v-model="imageFile"
            accept=".png, .jpg, .jpeg"
            ref="formImg"
            placeholder="Drag and drop an image here"
            drop-placeholder="Drop here"
            browse-text="Or select one"
          />
        </b-col>
      </b-form-group>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomePage',
  data () {
    return {
      deleting: null,
      imageFile: null,
      masonryOptions: {
        itemSelector: '.grid-item'
      },
      modalTitle: 'New Note',
      note: {
        color: ''
      },
      working: false
    }
  },
  computed: {
    ...mapState(['notes']),
    canSave () {
      return this.note.title || this.note.text || this.note.img
    }
  },
  components: {
    BbNote: () => import('@/components/Note')
  },
  methods: {
    ...mapActions(['saveNote', 'deleteNote']),
    add () {
      this.modalTitle = 'New Note'
      if (this.note.id) {
        this.note = {
          color: ''
        }
      }
      this.imageFile = null
      this.$refs.modal.show()
    },
    changeCardColor (note, color) {
      note.color = color
      this.saveNote(note)
    },
    edit (note) {
      this.modalTitle = 'Edit Note'
      this.note = { ...note }
      this.imageFile = null
      this.$refs.modal.show()
    },
    imageChanged (file) {
      if (!file) {
        return
      }
      const reader = new FileReader()
      const self = this

      reader.onload = function (e) {
        // get loaded data and render thumbnail.
        self.$set(self.note, 'img', e.target.result)
      }

      // read the file as a data URL.
      reader.readAsDataURL(file)
    },
    remove (note) {
      this.deleteNote(note)
      this.deleting = null
    },
    resetImage () {
      this.note.img = null
      this.imageFile = null
    },
    save () {
      if (!this.canSave) {
        return
      }
      this.saveNote(this.note)
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 20px 0;
}
.img-container {
  position: relative;
}
.img-button {
  position: absolute;
  right: 5px;
  top: 5px;
}
.link {
  text-decoration: none;
}
</style>
