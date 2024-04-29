import { POSITION, type PluginOptions } from "vue-toastification";

const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 4500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

export default toastOptions;