import './scss/main.scss';
import {Datepicker} from './js/components/datepickers';
import {BuildCalendar} from './js/components/calendar';
import 'simplepicker/dist/simplepicker.css';
import {labels} from './js/components/labels';
import {navigations} from './js/components/nav';
import { Todo } from './js/components/todo';
import EventActions from "./js/services/actions";
import { getClosestEvents } from './js/components/close-events-cards';
import {BuildCharts} from './js/components/charts'

window.addEventListener('DOMContentLoaded', () => {
    labels();
    navigations();
    
    getClosestEvents();
    BuildCalendar();
    BuildCharts()
});



