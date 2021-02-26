<template>
    <div id="mapview"></div>
</template>

<script>
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import gConfig from './../config/gConfig';

export default {
    name: 'MapView',
    props: {
        viewType: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            map: '',
        };
    },
    mounted() {
        this.handleCreateMap();
        this.handleCreateView();
    },
    methods: {
        handleCreateMap() {
            const basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: gConfig.basemap_url,
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });
            const map = new Map({
                basemap: basemap,
            });

            this.map = map;
        },
        handleCreateView() {
            let view = '';
            const zoom = 10;
            const center = [104.09028, 30.577999];

            if (this.viewType === '2d') {
                view = this.handleCreateMapView(zoom, center);
            } else if (this.viewType === '3d') {
                view = this.handleCreateSceneView(zoom, center);
            } else {
                view = this.handleCreateMapView(zoom, center);
            }

            this.$store.commit('setView', view);

            console.log(this.$store.getters.getView);
        },
        /**
         * 根据地图层级和地图中心点创建二维视图
         * @author  xuqw  20210226
         * @param {number} zoom  地图层级
         * @param {array} center  地图中心点
         */
        handleCreateMapView(zoom, center) {
            const view = new MapView({
                container: 'mapview',
                map: this.map,
                zoom,
                center,
            });

            view.ui.components = [];

            return view;
        },
        /**
         * 根据地图层级和地图中心点创建二维视图
         * @author  xuqw  20210226
         * @param {number} zoom  地图层级
         * @param {array} center  地图中心点
         */
        handleCreateSceneView(zoom, center) {
            const view = new SceneView({
                container: 'mapview',
                map: this.map,
            });

            view.ui.components = [];

            view.when(() => {
                view.goTo({
                    zoom,
                    center,
                });
            });

            return view;
        },
    },
};
</script>

<style scoped>
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
<style>
/*去除mapview拖动时的边框*/
.esri-view .esri-view-surface--inset-outline:focus::after {
    outline: auto 0px Highlight !important;
    outline: auto 0px -webkit-focus-ring-color !important;
}
</style>
