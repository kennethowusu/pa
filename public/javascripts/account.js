import * as $ from 'jquery';
import 'datatables';

export default (function () {
  $('#dataTable').DataTable();
}());
;import * as $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

export default (function () {
  $('.start-date').datepicker();
  $('.end-date').datepicker();
}())
;import * as $ from 'jquery';

export default (function () {
  $('.email-side-toggle').on('click', e => {
    $('.email-app').toggleClass('side-active');
    e.preventDefault();
  });

  $('.email-list-item, .back-to-mailbox').on('click', e => {
    $('.email-content').toggleClass('open');
    e.preventDefault();
  });
}())
;import * as $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.min.js';
import 'fullcalendar/dist/fullcalendar.min.css';

export default (function () {
  const date = new Date();
  const d    = date.getDate();
  const m    = date.getMonth();
  const y    = date.getFullYear();

  const events = [{
    title  : 'All Day Event',
    start  : new Date(y, m, 1),
    desc   : 'Meetings',
    bullet : 'success',
  }, {
    title  : 'Long Event',
    start  : new Date(y, m, d - 5),
    end    : new Date(y, m, d - 2),
    desc   : 'Hangouts',
    bullet : 'success',
  }, {
    title  : 'Repeating Event',
    start  : new Date(y, m, d - 3, 16, 0),
    allDay : false,
    desc   : 'Product Checkup',
    bullet : 'warning',
  }, {
    title  : 'Repeating Event',
    start  : new Date(y, m, d + 4, 16, 0),
    allDay : false,
    desc   : 'Conference',
    bullet : 'danger',
  }, {
    title  : 'Birthday Party',
    start  : new Date(y, m, d + 1, 19, 0),
    end    : new Date(y, m, d + 1, 22, 30),
    allDay : false,
    desc   : 'Gathering',
  }, {
    title  : 'Click for Google',
    start  : new Date(y, m, 28),
    end    : new Date(y, m, 29),
    url    : 'http ://google.com/',
    desc   : 'Google',
    bullet : 'success',
  }];

  $('#full-calendar').fullCalendar({
    events,
    height   : 800,
    editable : true,
    header: {
      left   : 'month,agendaWeek,agendaDay',
      center : 'title',
      right  : 'today prev,next',
    },
  });
}())
;import * as $ from 'jquery';
import loadGoogleMapsAPI  from 'load-google-maps-api';

export default (function () {
  if ($('#google-map').length > 0) {
    loadGoogleMapsAPI({
      key: 'AIzaSyDW8td30_gj6sGXjiMU0ALeMu1SDEwUnEA',
    }).then(() => {
      const latitude  = 26.8206;
      const longitude = 30.8025;
      const mapZoom   = 5;
      const { google }    = window;

      const mapOptions = {
        center    : new google.maps.LatLng(latitude, longitude),
        zoom      : mapZoom,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        styles: [{
          'featureType': 'landscape',
          'stylers': [
            { 'hue'        : '#FFBB00' },
            { 'saturation' : 43.400000000000006 },
            { 'lightness'  : 37.599999999999994 },
            { 'gamma'      : 1 },
          ],
        }, {
          'featureType': 'road.highway',
          'stylers': [
            { 'hue'        : '#FFC200' },
            { 'saturation' : -61.8 },
            { 'lightness'  : 45.599999999999994 },
            { 'gamma'      : 1 },
          ],
        }, {
          'featureType': 'road.arterial',
          'stylers': [
            { 'hue'        : '#FF0300' },
            { 'saturation' : -100 },
            { 'lightness'  : 51.19999999999999 },
            { 'gamma'      : 1 },
          ],
        }, {
          'featureType': 'road.local',
          'stylers': [
            { 'hue'        : '#FF0300' },
            { 'saturation' : -100 },
            { 'lightness'  : 52 },
            { 'gamma'      : 1 },
          ],
        }, {
          'featureType': 'water',
          'stylers': [
            { 'hue'        : '#0078FF' },
            { 'saturation' : -13.200000000000003 },
            { 'lightness'  : 2.4000000000000057 },
            { 'gamma'      : 1 },
          ],
        }, {
          'featureType': 'poi',
          'stylers': [
            { 'hue'        : '#00FF6A' },
            { 'saturation' : -1.0989010989011234 },
            { 'lightness'  : 11.200000000000017 },
            { 'gamma'      : 1 },
          ],
        }],
      };

      const map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

      new google.maps.Marker({
        map,
        position : new google.maps.LatLng(latitude, longitude),
        visible  : true,
      });
    });
  }
}())
;import * as $ from 'jquery';
import Masonry from 'masonry-layout';

export default (function () {
  window.addEventListener('load', () => {
    if ($('.masonry').length > 0) {
      new Masonry('.masonry', {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        percentPosition: true,
      });
    } 
  });
}());
;import * as $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';

export default (function () {
  const scrollables = $('.scrollable');
  if (scrollables.length > 0) {
    scrollables.each((index, el) => {
      new PerfectScrollbar(el);
    });
  }
}());
;import * as $ from 'jquery';

export default (function () {
  $('.search-toggle').on('click', e => {
    $('.search-box, .search-input').toggleClass('active');
    $('.search-input input').focus();
    e.preventDefault();
  });
}());
;import * as $ from 'jquery';

export default (function () {
  // Sidebar links
  $('.sidebar .sidebar-menu li a').on('click', function () {
    const $this = $(this);

    if ($this.parent().hasClass('open')) {
      $this
        .parent()
        .children('.dropdown-menu')
        .slideUp(200, () => {
          $this.parent().removeClass('open');
        });
    } else {
      $this
        .parent()
        .parent()
        .children('li.open')
        .children('.dropdown-menu')
        .slideUp(200);

      $this
        .parent()
        .parent()
        .children('li.open')
        .children('a')
        .removeClass('open');

      $this
        .parent()
        .parent()
        .children('li.open')
        .removeClass('open');

      $this
        .parent()
        .children('.dropdown-menu')
        .slideDown(200, () => {
          $this.parent().addClass('open');
        });
    }
  });

  // Sidebar Activity Class
  const sidebarLinks = $('.sidebar').find('.sidebar-link');

  sidebarLinks
    .each((index, el) => {
      $(el).removeClass('active');
    })
    .filter(function () {
      const href = $(this).attr('href');
      const pattern = href[0] === '/' ? href.substr(1) : href;
      return pattern === (window.location.pathname).substr(1);
    })
    .addClass('active');

  // ٍSidebar Toggle
  $('.sidebar-toggle').on('click', e => {
    $('.app').toggleClass('is-collapsed');
    e.preventDefault();
  });

  /**
   * Wait untill sidebar fully toggled (animated in/out)
   * then trigger window resize event in order to recalculate
   * masonry layout widths and gutters.
   */
  $('#sidebar-toggle').click(e => {
    e.preventDefault();
    setTimeout(() => {
      window.dispatchEvent(window.EVENT);
    }, 300);
  });
}());
;import SkyconsInit from 'skycons';

const Skycons = SkyconsInit(window);

export default (function () {
  const icons = new Skycons({ 'color': '#ff6849' });
  const list  = [
    'clear-day',
    'clear-night',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'cloudy',
    'rain',
    'sleet',
    'snow',
    'wind',
    'fog',
  ];
  let i = list.length;

  while (i--) {
    const
      weatherType = list[i],
      elements    = document.getElementsByClassName(weatherType);
    let j = elements.length;

    while (j--) {
      icons.set(elements[j], weatherType);
    }
  }

  icons.play();
}());
;import * as $ from 'jquery';

export default (function () {
  // ------------------------------------------------------
  // @Window Resize
  // ------------------------------------------------------

  /**
   * NOTE: Register resize event for Masonry layout
   */
  const EVENT = document.createEvent('UIEvents');
  window.EVENT = EVENT;
  EVENT.initUIEvent('resize', true, false, window, 0);


  window.addEventListener('load', () => {
    /**
     * Trigger window resize event after page load
     * for recalculation of masonry layout.
     */
    window.dispatchEvent(EVENT);
  });

  // ------------------------------------------------------
  // @External Links
  // ------------------------------------------------------

  // Open external links in new window
  $('a')
    .filter('[href^="http"], [href^="//"]')
    .not(`[href*="${window.location.host}"]`)
    .attr('rel', 'noopener noreferrer')
    .attr('target', '_blank');

  // ------------------------------------------------------
  // @Resize Trigger
  // ------------------------------------------------------

  // Trigger resize on any element click
  document.addEventListener('click', () => {
    window.dispatchEvent(window.EVENT);
  });
}());
;import * as $ from 'jquery';
import 'jvectormap';
import 'jvectormap/jquery-jvectormap.css';
import './jquery-jvectormap-world-mill.js';
import { debounce } from 'lodash';

export default (function () {
  const vectorMapInit = () => {
    if ($('#world-map-marker').length > 0) {
      // This is a hack, as the .empty() did not do the work
      $('#vmap').remove();

      // we recreate (after removing it) the container div, to reset all the data of the map
      $('#world-map-marker').append(`
        <div
          id="vmap"
          style="
            height: 490px;
            position: relative;
            overflow: hidden;
            background-color: transparent;
          "
        >
        </div>
      `);

      $('#vmap').vectorMap({
        map: 'world_mill',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderOpacity: 0.25,
        borderWidth: 0,
        color: '#e6e6e6',
        regionStyle : {
          initial : {
            fill : '#e4ecef',
          },
        },

        markerStyle: {
          initial: {
            r: 7,
            'fill': '#fff',
            'fill-opacity':1,
            'stroke': '#000',
            'stroke-width' : 2,
            'stroke-opacity': 0.4,
          },
        },

        markers : [{
          latLng : [21.00, 78.00],
          name : 'INDIA : 350',
        }, {
          latLng : [-33.00, 151.00],
          name : 'Australia : 250',
        }, {
          latLng : [36.77, -119.41],
          name : 'USA : 250',
        }, {
          latLng : [55.37, -3.41],
          name : 'UK   : 250',
        }, {
          latLng : [25.20, 55.27],
          name : 'UAE : 250',
        }],
        series: {
          regions: [{
            values: {
              'US': 298,
              'SA': 200,
              'AU': 760,
              'IN': 200,
              'GB': 120,
            },
            scale: ['#03a9f3', '#02a7f1'],
            normalizeFunction: 'polynomial',
          }],
        },
        hoverOpacity: null,
        normalizeFunction: 'linear',
        zoomOnScroll: false,
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#c9dfaf',
        selectedRegions: [],
        enableZoom: false,
        hoverColor: '#fff',
      });
    }
  };

  vectorMapInit();
  $(window).resize(debounce(vectorMapInit, 150));
})();
