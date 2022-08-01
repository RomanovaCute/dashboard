import './scss/main.scss';
import {Datepicker} from './js/components/datepickers';
import {BuildCalendar} from './js/components/calendar';
import 'simplepicker/dist/simplepicker.css';
import {labels} from './js/components/labels';
import {navigations} from './js/components/nav';
import ApiService from "./js/services/api";
import { Todo } from './js/components/todo';
import EventActions from "./js/services/actions";

window.addEventListener('DOMContentLoaded', () => {
    let todoDate = 0;
    // Datepicker для создания событий
    const timePickerObj = new Datepicker({
        el: '.timeDatepicker',
        input: '.timeDatepicker__input',
        onSubmit: (value) => {
            todoDate = value.getTime();
        }
    });

    //Datepicker для отображения событий
    new Datepicker({
        el: '.theDatepicker',
        input: '.theDatepicker__input',
        options: {
            disableTimeSection: true
        },
        onSubmit: (value) => {
            EventActions.getDayList(value)
        }
    });

    labels();
    navigations();

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        BuildCalendar();
    }

    const saveTodo = document.querySelector('#todoSave'),
        todoTextArea = document.querySelector('.todoTextArea'),
        todoMarkSelect = document.querySelector('.todoMarkSelect .select__input');

    if (saveTodo && todoTextArea && todoMarkSelect) {
        saveTodo.addEventListener('click', () => {
            const data = {
                text: todoTextArea.value,
                completeDate: todoDate
            }

            if (todoMarkSelect.dataset.value) {
                data.markId = todoMarkSelect.dataset.value;
            }
            Todo.create(data)
                .then(isSuccess => {
                    if (isSuccess) {
                        todoTextArea.value = '';
                        todoDate = 0;
                        timePickerObj.reset();
                    }
                })
        });
    }

    // Передать id выбранной метки
    //document.querySelector('button').addEventListener('click', () => console.log(document.querySelector('.select__input').dataset.value));
});



