import { createApp } from "vue";
import DonuttelloLogo from "./components/svg/DonuttelloLogo.vue";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DropDown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Card from 'primevue/card';
import Inplace from 'primevue/inplace';
import TextInput from 'primevue/inputtext';
import NumberInput from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "./style.css";
import "./style_button.css";
import "./style_input.css";
import "./style_prime_override.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);
app.component("font-awesome-icon", FontAwesomeIcon);

// PrimeVue
app.use(PrimeVue);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dropdown', DropDown);
app.component('MultiSelect', MultiSelect);
app.component('Dialog', Dialog);
app.component('Avatar', Avatar);
app.component('DonuttelloLogo', DonuttelloLogo);
app.component('Menu', Menu);
app.component('Card', Card);
app.component('Inplace', Inplace);
app.component('TextInput', TextInput);
app.component('NumberInput', NumberInput);
app.component('Calendar', Calendar);

app.use(router);

app.mount("#app");
