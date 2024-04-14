// plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' 

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
});

export default vuetify