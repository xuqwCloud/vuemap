<template>
    <div id="app"></div>
</template>

<script>
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export default {
    name: 'App',
    components: {},
    mounted() {
        this.handleCreateMap();
    },
    methods: {
        handleCreateMap() {
            const map = new Map({
                basemap: 'osm',
            });

            const view = new MapView({
                container: 'app',
                map: map,
                zoom: 10,
            });

            console.log(view);
        },
    },
};
</script>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
    margin: 0 !important;
}
</style>
