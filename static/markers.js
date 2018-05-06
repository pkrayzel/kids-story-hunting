  var infoWindow;
  var markers = []

  function setMarkers(map, tasks) {
    infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < tasks.length; i++) {
        task = tasks[i]

        var imagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        var coordinates = {lat: task["coordinates"]["latitude"], lng: task["coordinates"]["longitude"]}

        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            label: task["title"],
            zIndex: 1
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function(marker, task) {
            return function() {
                open_info_window(marker, task);
            }
            }(marker, task));

        console.log('setMarkers done');
    }
  }

  function open_info_window(marker, task) {
        infoWindow.setContent("<h3>"+task['question']+"</h3><span>"+task['options']+"</span>");
        infoWindow.open(map, marker);
  }

  function precisionRound(number, precision) {
      var factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    }

  function checkDistanceFromMarkers(currentLat, currentLon, tasks) {
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      lat = task["coordinates"]["latitude"]
      lng = task["coordinates"]["longitude"]

      distance = getDistance(currentLat, currentLon, lat, lng)

      if (distance <= 0.1) {
         console.log('distance of task: '+ task['title'] + ' is very close')
//         open_info_window(infoWindow, markers[i], task);
         infoWindow.setContent("<h3>"+task['question']+"</h3><span>"+task['options']+"</span>");
         infoWindow.open(map, markers[i]);
      }

      console.log('distance between current position and marker: '+distance)

      $('#content').append("Distance from "+task["title"]+" is "+precisionRound(distance, 2)+" km<br/>");
    }
  }

  function getDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    return dist
   }