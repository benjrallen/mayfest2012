#!/bin/bash

directory=$1

inotifywait -q -m --format '%f' -e modify -e move -e create -e delete ${directory} | while read line

do
    #echo "doing something with: $line";

    # for example:
    java -jar compiler.jar --js=app.js --js=app/model/Attraction.js --js=app/model/Category.js --js=app/model/Event.js --js=app/model/Location.js --js=app/store/Attractions.js --js=app/store/Categories.js --js=app/store/CategoryAttractions.js --js=app/store/CategoryEvents.js --js=app/store/Events.js --js=app/store/EventList.js --js=app/store/Locations.js --js=app/view/AttractionLeaf.js --js=app/view/Attractions.js --js=app/view/Categories.js --js=app/view/Map.js --js=app/view/Home.js --js=app/view/EventTabs.js --js=app/view/Events.js --js=app/view/EventCategories.js --js=app/view/MainUI.js --js=app/view/Viewport.js --js=app/controller/Main.js --js=app/controller/Attraction.js --js=app/controller/Event.js --js=app/controller/Map.js --js_output_file=mayfest.js --compilation_level=SIMPLE_OPTIMIZATIONS
done