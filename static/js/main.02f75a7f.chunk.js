(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,a){e.exports=a(27)},27:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a(3),l=a(4),r=a(7),s=a(5),h=a(8),o=a(0),p=a.n(o),c=a(10),d=a.n(c),u=a(25),g=a.n(u),m=a(6),b=a.n(m),y=(a(73),function(e){function t(){return Object(i.a)(this,t),Object(r.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return p.a.createElement("div",{className:"circle tooltip",style:{height:this.props.diameter,width:this.props.diameter,background:this.props.color,border:"1px solid "+this.props.borderColor}},p.a.createElement("span",{className:"tooltiptext"},this.props.text))}}]),t}(p.a.Component)),C=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).handleDateChange=a.handleDateChange.bind(Object(n.a)(Object(n.a)(a))),a.handleCapChange=a.handleCapChange.bind(Object(n.a)(Object(n.a)(a))),a.handleFilterChange=a.handleFilterChange.bind(Object(n.a)(Object(n.a)(a))),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"handleDateChange",value:function(e){this.props.onDateChange(parseInt(e.target.value))}},{key:"handleCapChange",value:function(e){this.props.onCapChange(parseInt(e.target.value))}},{key:"handleFilterChange",value:function(e){this.props.onFilterChange(parseInt(e.target.value))}},{key:"render",value:function(){return p.a.createElement("div",{className:"options"},p.a.createElement("h1",null,"Yenergi"),p.a.createElement("div",null,"Explore energy consumption at Yale University. Use the following filters to visualize data across many different dimensions."),p.a.createElement("h3",null,"Options:"),p.a.createElement("div",{className:"date"},p.a.createElement("div",null,this.props.currDate.month," ",this.props.currDate.year),p.a.createElement("input",{type:"range",min:0,max:181,defaultValue:181,onChange:this.handleDateChange,list:"steplist"}),p.a.createElement("datalist",{id:"steplist"},p.a.createElement("option",null,"0"),p.a.createElement("option",null,"60"),p.a.createElement("option",null,"120"),p.a.createElement("option",null,"180"))),p.a.createElement("div",{className:"temp"},"Avg. temp (F): ",this.props.temp),p.a.createElement("div",{className:"cap"},p.a.createElement("div",null,"Max energy usage to display:"),p.a.createElement("input",{type:"radio",name:"energy-cap",value:1e5,checked:1e5===this.props.cap,onChange:this.handleCapChange,disabled:2===this.props.displayFilter}),"100,000",p.a.createElement("br",null),p.a.createElement("input",{type:"radio",name:"energy-cap",value:1e4,checked:1e4===this.props.cap,onChange:this.handleCapChange,disabled:2===this.props.displayFilter}),"10,000",p.a.createElement("br",null),p.a.createElement("input",{type:"radio",name:"energy-cap",value:1e3,checked:1e3===this.props.cap,onChange:this.handleCapChange,disabled:2===this.props.displayFilter}),"1,000",p.a.createElement("br",null),p.a.createElement("input",{type:"radio",name:"energy-cap",value:100,checked:100===this.props.cap,onChange:this.handleCapChange,disabled:2===this.props.displayFilter}),"100",p.a.createElement("br",null),p.a.createElement("input",{type:"radio",name:"energy-cap",value:10,checked:10===this.props.cap,onChange:this.handleCapChange,disabled:2===this.props.displayFilter}),"10",p.a.createElement("br",null),p.a.createElement("input",{type:"radio",name:"energy-cap",value:99999999,checked:99999999===this.props.cap,onChange:this.handleCapChange,disabled:2===this.props.displayFilter}),"No cap"),p.a.createElement("br",null),p.a.createElement("div",{className:"studets-or-energy"},p.a.createElement("input",{type:"radio",name:"display-filter",value:0,checked:0===this.props.displayFilter,onChange:this.handleFilterChange}),"All buildings",p.a.createElement("br",null),p.a.createElement("input",{type:"radio",name:"display-filter",value:1,checked:1===this.props.displayFilter,onChange:this.handleFilterChange}),"Only colleges",p.a.createElement("br",null),p.a.createElement("br",null),p.a.createElement("div",null,"Display number of students per dormitory:"),p.a.createElement("input",{type:"radio",name:"display-filter",value:2,checked:2===this.props.displayFilter,onChange:this.handleFilterChange}),"Students",p.a.createElement("br",null)))}}]),t}(p.a.Component),v=function(e){function t(){return Object(i.a)(this,t),Object(r.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return p.a.createElement("div",{style:{height:"92vh",width:"100%"}},p.a.createElement(g.a,{bootstrapURLKeys:{key:"AIzaSyAfvrqHTxlg8C0nxideXF6wQS6ZhKTAEKc"},defaultCenter:this.props.center,defaultZoom:this.props.zoom,draggable:!0,onChange:this.props.onChange},this.props.circles))}}]),t}(p.a.Component),E=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={buildings:[],colleges:[],students:[],temps:[],index:180,cap:99999999,nlat:41.3187,slat:41.2991,displayFilter:0},b.a.get("https://yenergi-app-heroku.herokuapp.com/energyovertime").then(function(e){a.setState({buildings:e.data})}),b.a.get("https://yenergi-app-heroku.herokuapp.com/weather").then(function(e){a.setState({temps:e.data})}),b.a.get("https://yenergi-app-heroku.herokuapp.com/rcenergy").then(function(e){a.setState({colleges:e.data})}),b.a.get("https://yenergi-app-heroku.herokuapp.com/students").then(function(e){a.setState({students:e.data})}),a.handleDateChange=a.handleDateChange.bind(Object(n.a)(Object(n.a)(a))),a.handleCapChange=a.handleCapChange.bind(Object(n.a)(Object(n.a)(a))),a.handleFilterChange=a.handleFilterChange.bind(Object(n.a)(Object(n.a)(a))),a.handleZoomChange=a.handleZoomChange.bind(Object(n.a)(Object(n.a)(a))),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"normalize",value:function(e){return e<3&&(e=3),.125*Math.log(e)/(this.state.nlat-this.state.slat)}},{key:"getTemp",value:function(){return this.state.temps.length>0&&this.state.temps[this.state.index]?this.state.temps[this.state.index]:"Unavailable"}},{key:"getDate",value:function(){return{month:["January","February","March","April","May","June","July","August","September","October","November","December"][(this.props.initMonth+this.state.index)%12],year:this.props.initYear+Math.floor((this.props.initMonth+this.state.index)/12)}}},{key:"getUsage",value:function(){var e=this;return 2===this.state.displayFilter?this.state.students.map(function(t){return p.a.createElement(y,{key:parseInt(t.id),lat:t.lat,lng:t.lng,text:t.description,diameter:t.count*(.001/(e.state.nlat-e.state.slat)),color:"rgba(0, 255, 0, 0.25)",borderColor:"green"})}):1===this.state.displayFilter?this.state.colleges.map(function(t){return p.a.createElement(y,{key:t.id,lat:t.lat,lng:t.lng,text:t.description,diameter:e.normalize(t.usage[e.state.index]),color:"rgba(0, 0, 255, 0.25)",borderColor:"blue"})}):this.state.buildings.filter(function(t){return t.usage[e.state.index]<e.state.cap}).map(function(t){return p.a.createElement(y,{key:t.id,lat:t.lat,lng:t.lng,text:t.description,diameter:e.normalize(t.usage[e.state.index]),color:"rgba(255, 0, 0, 0.25)",borderColor:"red"})})}},{key:"handleDateChange",value:function(e){e!==this.state.index&&this.setState({index:e})}},{key:"handleCapChange",value:function(e){e!==this.state.cap&&this.setState({cap:e})}},{key:"handleFilterChange",value:function(e){e!==this.state.displayFilter&&this.setState({displayFilter:e})}},{key:"handleZoomChange",value:function(e){!this.state||e.bounds.ne.lat===this.state.nlat&&e.bounds.se.lat===this.state.slat||this.setState({nlat:e.bounds.ne.lat,slat:e.bounds.se.lat})}},{key:"render",value:function(){return p.a.createElement("div",{className:"container"},p.a.createElement(C,{onDateChange:this.handleDateChange,onCapChange:this.handleCapChange,onFilterChange:this.handleFilterChange,cap:this.state.cap,currDate:this.getDate(),temp:this.getTemp(),displayFilter:this.state.displayFilter}),p.a.createElement("div",{className:"map"},p.a.createElement(v,{center:this.props.center,zoom:this.props.zoom,circles:this.getUsage(),onChange:this.handleZoomChange})))}}]),t}(p.a.Component);E.defaultProps={center:{lat:41.3089,lng:287.0696},zoom:14.5,initMonth:6,initYear:2002},d.a.render(p.a.createElement(E,null),document.getElementById("root"))},73:function(e,t,a){}},[[26,2,1]]]);
//# sourceMappingURL=main.02f75a7f.chunk.js.map