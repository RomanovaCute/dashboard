import ApiService from "../../services/api";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const polar = new Chart(document.getElementById('roundChart'), {
  type: 'polarArea',
  data: {
    labels: [
        'Запланировано',
        'Завершено'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [1, 1],
        backgroundColor: [
          'rgb(75, 192, 192)',  
          'rgb(255, 99, 132)'
        ]
    }]
    }
})

const round = new Chart(document.getElementById('polarChart'), {
    type: 'doughnut',
    data: {
        labels: [
            'Работа',
            'Учеба',
            'Отдых',
            'Спорт',
            'Важное'
          ],
          datasets: [{
            data: [1, 1, 1, 1, 1],
            backgroundColor: [
              '#7BAFFC',
              '#F0A7C4',
              '#85CF6B',
              '#FFA0A3',
              '#FD4B33',
            ],
            hoverOffset: 4
          }]
        }
    }
)

function BuildCharts(){
    function getToDoData(){
        ApiService.send({
            url: 'event',
            method: 'GET',
            data: {
                isExpired: true
            }
        }).then(res => {
            let expiredArr = [];
            let notExpiredArr = [];

            res.data.map(task => {
                task.isExpired ? expiredArr.push(task) : notExpiredArr.push(task)
                polar.data.datasets[0].data = [notExpiredArr.length, expiredArr.length];
            });
            polar.update();
        })
    }

    const today = new Date();
    function getToDoLables(){
    ApiService.send({
        url: 'event',
        method: 'GET',
        data: {
            day: today.getTime()
        }
    }).then(res => {
        console.log(res.data);
        let lables = {
            workArr: [],
            studyArr: [],
            restArr: [],
            sportArr: [],
            importantArr: []
        }

        let commonArr = [];
        res.data.map(task => {
            commonArr.push(task.mark.id)
            
            commonArr.map(elem => {
                elem === 1 ? lables.workArr.push(elem) :
                elem === 2 ? lables.studyArr.push(elem) :
                elem === 3 ? lables.restArr.push(elem) :
                elem === 4 ? lables.sportArr.push(elem) :
                elem === 5 ? lables.importantArr.push(elem) : ''
            })

            round.data.datasets[0].data = [lables.workArr.length, lables.studyArr.length, lables.restArr.length, lables.sportArr.length, lables.importantArr.length]
        });
        console.log(commonArr);
        round.update();
    })
    }

    getToDoData()
    getToDoLables()
}

export { BuildCharts };