Visualizer = function() {
    this.viewer = d3.select('#visual_view');
    this.data = [10,30,40,50];
    this.timeline_angle = 40.0;

    this.render  = function() {
        this.draw_timelines();
    }

    this.draw_timelines = function() {
        var angle = this.timeline_angle
        this.viewer.selectAll("line").data(this.left_marker_dimensions())
            .enter().append("line")
            .attr("x1", function(d) {return d[0]})
            .attr("y1", function(d) {return d[1]})
            .attr("x2", function(d) {return d[2]})
            .attr("y2", function(d) {return d[3]});
    }

    this.left_marker_dimensions = function() {
        var x1, x2, y1, y2,
            dimensions = [],
            start = 0,
            end = 400,
            top = 200,
            interleave = 100,
            height = 350,
            top_angle = 25,
            bottom_angle = 45;

        for(var i=start; i <= end; i=i+interleave) {
            x1 = i;
            y1 = top - (this.sine(top_angle) * x1 / this.sine(90 - top_angle));
            x2 = i;
            y2 = (top + height) - (Math.sin(90 - bottom_angle) * x2 / Math.sin(bottom_angle));
            console.log((this.sine(bottom_angle) * x2 / this.sine(90 - bottom_angle)));
            dimensions.push([x1,y1,x2,y2]);
        }
        return dimensions;
    }

    this.sine = function(degree) {
        var radian = degree * (Math.PI / 180);
        return Math.sin(radian);
    }
}