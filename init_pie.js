import { Pie } from './pie.js'
import { data } from './data.js'

//TEXT ELEMENTS
const housingText = document.querySelector('#pie_one p');
const satisfactionText = document.querySelector('#pie_two p');
const neighborhoodText = document.querySelector('#pie_three p');
const happyText = document.querySelector('#pie_four p');

const faithText = document.querySelector('#pie_five p');
const onePersonText = document.querySelector('#pie_six p');
const jobText = document.querySelector('#pie_seven p');
const appartmentsText = document.querySelector('#pie_eight p');

//DATA SELECT
const citySelect = document.getElementById('city_select');
//POPULATE SELECT FROM DATASET
data.forEach(obj => {
    citySelect.options[citySelect.options.length] = new Option(obj.city, JSON.stringify(obj.stats));
});
//STORE DATA OBJECT
const initialSelectValue = JSON.parse(citySelect.value);

//INSTANTIATE PIES
const housing = new Pie(initialSelectValue.housing, '#pie_one');
const satisfaction = new Pie(initialSelectValue.satisfaction, '#pie_two');
const neighborhood = new Pie(initialSelectValue.neighborhood, '#pie_three');
const happy = new Pie(initialSelectValue.happy, '#pie_four');
const faith = new Pie(initialSelectValue.faith, '#pie_five');
const onePerson = new Pie(initialSelectValue.onePerson, '#pie_six');
const job = new Pie(initialSelectValue.job, '#pie_seven');
const appartments = new Pie(initialSelectValue.appartments, '#pie_eight');



housing.createPie();
satisfaction.createPie();
neighborhood.createPie();
happy.createPie();

faith.createPie();
onePerson.createPie();
job.createPie();
appartments.createPie();



const updatePieCharts = (value) => {
    housing.updatePie([value.housing, 100 - value.housing]);
    satisfaction.updatePie([value.satisfaction, 100 - value.satisfaction]);
    neighborhood.updatePie([value.neighborhood, 100 - value.neighborhood]);
    happy.updatePie([value.happy, 100 - value.happy]);

    faith.updatePie([value.faith, 100 - value.faith]);
    onePerson.updatePie([value.onePerson, 100 - value.onePerson]);
    job.updatePie([value.job, 100 - value.job]);
    appartments.updatePie([value.appartments, 100 - value.appartments]);
}



const updatePieText = (value) => {
    housingText.dataset.value = value.housing;
    satisfactionText.dataset.value = value.satisfaction;
    neighborhoodText.dataset.value = value.neighborhood;
    happyText.dataset.value = value.happy;
    
    faithText.dataset.value = value.faith;
    onePersonText.dataset.value = value.onePerson;
    jobText.dataset.value = value.job;
    appartmentsText.dataset.value = value.appartments;
} 


updatePieText(initialSelectValue)



//UPDATE CHARTS ON SELECT CHANGE
citySelect.addEventListener('change', (e) => {
    const value = JSON.parse(e.target.value);
    updatePieCharts(value);
    updatePieText(value);
    updatePercent();
    setPieCenterText(value);
})



const setPercent = (value) => {
    housingText.querySelector('span').innerHTML = value.housing;
    satisfactionText.querySelector('span').innerHTML = value.satisfaction;
    neighborhoodText.querySelector('span').innerHTML = value.neighborhood;
    happyText.querySelector('span').innerHTML = value.happy;

    faithText.querySelector('span').innerHTML = value.faith;
    onePersonText.querySelector('span').innerHTML = value.onePerson;
    jobText.querySelector('span').innerHTML = value.job;
    appartmentsText.querySelector('span').innerHTML = value.appartments;
}
setPercent(initialSelectValue)


const percentCountText = document.querySelectorAll('.percent');
const speed = 500;


const timer = ms => new Promise(res => setTimeout(res, ms))

const updatePercent = () => {
    percentCountText.forEach(async count => {
        const span = count.querySelector('span');

        const target = +count.dataset.value;
        const original = +span.innerHTML;
        let current = +span.innerHTML;

        if(current > target) {
            while(current > target) {
                span.innerHTML = Math.ceil(current - 1);
                current -= 1;
                await timer(speed / (original - target));
            }
            span.innerHTML = target;
        }
        if(current < target) { 
            while(current < target) {
                span.innerHTML = Math.ceil(current + 1);
                current += 1;
                await timer(speed / (target - original));
            }
            span.innerHTML = target;
        } 
    })
}

const pieCenter = document.querySelector('.pie-center');

pieCenter.style.height = `${pieCenter.clientWidth}px`

const setPieCenterText = (value) => {
    pieCenter.querySelector('h2').innerHTML = citySelect.options[citySelect.selectedIndex].text;
    pieCenter.querySelector('h3 span').innerHTML = value.population;
}
setPieCenterText(initialSelectValue);

const pieText = document.querySelectorAll('.pie h2');




const pieContainer = document.querySelector('.pie-container');
pieText.forEach(text => {
    text.style.fontSize = `${(pieContainer.clientWidth) / 48}px`
})
percentCountText.forEach(text => {
    text.style.fontSize = `${(pieContainer.clientWidth) / 35}px`
})



const pieCenterTitle = document.getElementById('pie-center-title'); 
const pieCenterText = document.getElementById('pie-center-text'); 

pieCenterTitle.style.fontSize = `${(pieContainer.clientWidth) / 25}px`
pieCenterText.style.fontSize = `${(pieContainer.clientWidth) / 40}px`




window.addEventListener('resize', () => {
    housing.updateSize();
    satisfaction.updateSize();
    neighborhood.updateSize();
    happy.updateSize();

    faith.updateSize();
    onePerson.updateSize();
    job.updateSize();
    appartments.updateSize();

    pieText.forEach(text => {
        text.style.fontSize = `${(pieContainer.clientWidth) / 48}px`
    })
    percentCountText.forEach(text => {
        text.style.fontSize = `${(pieContainer.clientWidth) / 35}px`
    })
    pieCenter.style.height = `${pieCenter.clientWidth}px`;

    pieCenterTitle.style.fontSize = `${(pieContainer.clientWidth) / 25}px`;
    pieCenterText.style.fontSize = `${(pieContainer.clientWidth) / 40}px`;

    const centerArrows = document.querySelectorAll('.center-arrow');

})



//center line

const angles = [17, 184, 321];


for(let i = 0; i < 3; i++) {
    const centerSVG = d3.select('.pie-container').append('svg')
                    .attr('width', pieContainer.clientWidth/5)
                    .attr('height', pieContainer.clientHeight/10)
                    .attr('class', 'center-arrow')
                    .style('background', 'transparent')
                    .style('position', 'absolute')
                    .style('top', '50%')
                    .style('left', '50%')
                    .style('transform', 'translateY(-50%) rotate(' + angles[i] + 'deg)')
                    .style('transform-origin', 'left')
                    .style('z-index', '-1');

    centerSVG.append('circle')
    .attr('cx', '90%')
    .attr('cy', '50%')
    .attr('r', '4%')
    // .attr('stroke', 'black')
    .attr('fill', '#ffeb00');

    centerSVG.append('rect')
    .attr('x', '0')
    .attr('y', '50%')
    .style('transform', 'translateY(-' + pieContainer.clientHeight / 180 + '%)')
    .attr('width', '90%')
    .attr('height', '7%')
    .attr('fill', '#ffeb00');

}



