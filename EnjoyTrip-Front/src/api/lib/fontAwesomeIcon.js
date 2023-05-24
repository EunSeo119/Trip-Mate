import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faCalendar, faEye, faUser, faTrashCan } from "@fortawesome/free-regular-svg-icons";

library.add(fasHeart, farHeart, faCalendar, faEye, faUser, faTrashCan);

Vue.component("font-awesome-icon", FontAwesomeIcon);
