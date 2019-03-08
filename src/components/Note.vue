<template>
  <b-card
    :title="note.title"
    :img-src="note.img"
    img-alt
    img-top
    class="mb-2 text-left"
    @click="cardClicked"
  >
    <b-card-text class="truncate" v-html="parsedText"></b-card-text>
    <b-button id="edit" variant="primary" @click="edit">edit</b-button>
    <div class="float-right">
      <b-button id="delete" v-if="!deleting" variant="danger" @click="confirmDelete">delete</b-button>
      <template v-else>
        <b-button id="cancel-delete" title="Cancel delete" @click="cancelDelete">&times;</b-button>
        <b-button id="confirm-delete" title="Confirm delete" variant="danger" @click="remove">&check;</b-button>
      </template>
    </div>
  </b-card>
</template>

<script>
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
      deleting: false
    }
  },
  computed: {
    parsedText () {
      return this.note.text ? this.note.text.replace(/\n/g, '<br />') : ''
    }
  },
  methods: {
    cancelDelete () {
      this.deleting = false
    },
    cardClicked (e) {
      if (e.target.tagName !== 'BUTTON') {
        e.target.closest('.card').querySelector('.card-text').classList.toggle('truncate')
      }
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

<style scoped>
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
