<template>
  <b-card :img-src="note.img" img-alt img-top class="mb-2 text-left" @click="cardClicked" no-body>
    <b-card-body :style="{ backgroundColor: bgColor }">
      <b-card-title>
        {{ note.title }}
        <swatches
          class="float-right border-primary"
          popover-to="left"
          :colors="allowedColors"
          show-border
          @input="changeColor"
        />
      </b-card-title>
      <b-card-text class="truncate" v-html="parsedText"></b-card-text>
      <b-button id="edit" variant="primary" @click="edit">edit</b-button>
      <div class="float-right">
        <b-button id="delete" v-if="!deleting" variant="danger" @click="confirmDelete">delete</b-button>
        <template v-else>
          <b-button id="cancel-delete" title="Cancel delete" @click="cancelDelete">&times;</b-button>
          <b-button
            id="confirm-delete"
            title="Confirm delete"
            variant="danger"
            @click="remove"
          >&check;</b-button>
        </template>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'

export default {
  name: 'BbNote',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      allowedColors: ['#ffccd5', '#e8deff', '#dcfaf8', '#ffedd1', 'burlywood', ''],
      deleting: false
    }
  },
  computed: {
    bgColor () {
      return this.note.color || 'inherit'
    },
    parsedText () {
      return this.note.text ? this.note.text.replace(/\n/g, '<br />') : ''
    }
  },
  components: {
    Swatches
  },
  methods: {
    cancelDelete () {
      this.deleting = false
    },
    cardClicked (e) {
      if (e.target.tagName !== 'BUTTON') {
        e.target
          .closest('.card')
          .querySelector('.card-text')
          .classList.toggle('truncate')
      }
    },
    changeColor (color) {
      this.$emit('changeColor', color)
    },
    confirmDelete () {
      this.deleting = true
    },
    edit () {
      this.$emit('edit', this.note)
    },
    remove () {
      this.$emit('delete', this.note)
    }
  }
}
</script>

<style>
.vue-swatches__trigger {
  width: 20px!important;
  height: 20px!important;
}
.truncate {
  display: block;
  display: -webkit-box;
  max-width: 400px;
  max-height: 75px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
