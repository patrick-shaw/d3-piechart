export class Pie {
    constructor(data, container) {
        this.data = data;
        this.container = container;

        this.width = "100%";
        this.height = "100%";

        const parentWidth = Math.min(document.querySelector(this.container).clientWidth);

        // this.radius = Math.min(parentWidth, parentWidth) / 2;
        
        this.svg = d3.select(this.container)
                .append('svg')
                .attr('width', this.width)
                .attr('height', parentWidth)
                .append('g')
                .attr('transform', 'translate(' + parentWidth / 2 + ',' + parentWidth / 2 + ')');
                this.pie = d3.pie()
                .sort(null)
              
    }

    createPie() {
        this.svg.append('g').attr('class', 'slices')
        
        this.updatePie([this.data, (100 - this.data)]);
    }

    updatePie(data) {
        const color = d3.scaleOrdinal(['#ffeb00', '#e9ebee']);

        const parentWidth = document.querySelector(this.container).clientWidth;
        const radius = Math.min(parentWidth, parentWidth) / 2;

        const newArc = d3.arc()
                .outerRadius(radius)
                .innerRadius(0);

        const duration = 500;

        let oldData = this.svg.select(".slices")
            .selectAll("path")
            .data().map(function(d) { return d.data });

        if (oldData.length == 0) oldData = data;

        let slice = this.svg.select(".slices")
            .selectAll("path")
            .data(this.pie(oldData));

        slice.enter()
            .insert("path")
            .attr("class", "slice")
            .style("fill", (d,i) => color(i))
            .attr("stroke", "#d5d6d6")
            .style("stroke-width", "1")
          
            .each(function(d) {
                this._current = d;
                });

        slice = this.svg.select(".slices")
            .selectAll("path")
            .data(this.pie(data));

        slice.transition()
            .duration(duration)
            .attrTween("d", function(d) {
                const interpolate = d3.interpolate(this._current, d);
                const _this = this;
                return function(t) {
                    _this._current = interpolate(t);
                    return newArc(_this._current);
                    };
                });
        
        slice = this.svg.select(".slices")
            .selectAll("path")
            .data(this.pie(data));

        slice.exit()
            .transition()
            .delay(duration)
            .duration(0)
            .remove();
    };

    updateSize() {
        
        const parentWidth = document.querySelector(this.container).clientWidth;

        const radius = Math.min(parentWidth, parentWidth) / 2;
        const newArc = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        d3.select(`${this.container} svg`).attr('height', parentWidth);

        this.svg.attr('transform', 'translate(' + parentWidth / 2 + ',' + parentWidth / 2 + ')');
            
        let oldData = this.svg.select(".slices")
        .selectAll("path")
        .data().map(function(d) { return d.data });


    let slice = this.svg.select(".slices")
        .selectAll("path")
        .data(this.pie(oldData));
       
    slice.attr('d', newArc);
        
    }
}

       


