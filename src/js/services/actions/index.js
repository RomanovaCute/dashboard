import ApiService from "../api";
class EventActions {
    static async remove(id, value){
        ApiService.send({
            method: 'DELETE', 
            data: {
                id,
                day: value
            },
            url: 'event'
        })
        .then(() => {this.getDayList(value)})
    }
    
    static async getDayList(value){
        ApiService.send({
            method: 'GET',
            data: {
                day: value.getTime()
            },
            url: 'event'
        })
        .then(function(resp){
            let tasksArr = resp.data,
                plansContainer = document.querySelector('.plans'),
                plansList = document.querySelector('.business-today'),
                box = document.querySelector('.business-today_list');
            box.innerHTML = ''

            tasksArr.sort((elem1, elem2) => elem1.completeDate > elem2.completeDate ? 1 : -1);
            tasksArr.forEach(elem => {
                const time = new Date(elem.completeDate);
                let hours, minutes, correctTime;

                function formatTime (time){
                    hours = String(time.getHours()).padStart(2,0),
                    minutes = String(time.getMinutes()).padStart(2,0)
                    correctTime = `${hours}:${minutes}`;
                }
                
                formatTime(time);
            
                const details = document.createElement('div');
                details.setAttribute('class', 'details');

                const label = document.createElement('label'),
                      textAndMarkBox = document.createElement('div'),
                      markColor = document.createElement('span'),
                      textItem = document.createElement('p'),
                      closeBtn = document.createElement('div'),
                      closePic = document.createElement('svg');
                
                label.setAttribute('class', 'details_time det-text-opacity');
                label.innerHTML = `${correctTime}`;

                textAndMarkBox.setAttribute('class', 'details-label-string');

                markColor.style.backgroundColor = elem.mark.color,
                markColor.setAttribute('class','dot dot-color');

                textItem.innerHTML = elem.text;
                textItem.setAttribute('class', 'det-text-opacity');

                if(elem.isExpired){
                    textItem.style.color = 'gray';
                    label.style.color = 'gray';
                } else {
                    textItem.style.color = '#000000d4';
                    label.style.color = '#000000d4';
                }
                    
                closeBtn.setAttribute('data-id', `${elem.id}`);
                closeBtn.setAttribute('class', 'pic-close');
                closeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.78125 17.5312L0.46875 16.2187L7.6875 9L0.46875 1.78125L1.78125 0.46875L9 7.6875L16.2187 0.46875L17.5312 1.78125L10.3125 9L17.5312 16.2187L16.2187 17.5312L9 10.3125L1.78125 17.5312Z" fill="#FD4B33" />
                    </svg>
                `
                
                textAndMarkBox.append(markColor, textItem);
                closePic.append(closeBtn);
                
                details.append(label, textAndMarkBox, closeBtn, closePic);
                box.append(details)
                plansList.append(box);
                plansContainer.append(plansList);
            });

            const deleteBtn = document.querySelectorAll('.pic-close');
            
            deleteBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                let target = e.currentTarget
                let id = target.getAttribute('data-id')
                EventActions.remove(id, value)
                })
            })
        })
    }
}


export default EventActions;