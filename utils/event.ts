import mitt from 'mitt'

type Events = {
  shouldLogout: boolean
}

export default mitt<Events>()
