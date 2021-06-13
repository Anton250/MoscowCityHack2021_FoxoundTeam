import Vuex from 'vuex'
// import http from './http'
import Axios from 'axios'
import Vue from 'vue'
import http from './http'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        redactorMode: false,
        lineDraw: false,
        circleDraw: false,
        lineObj: null,
        lineStyle: {
            lineWidth: 4,
            strokeColor: "rgba(55, 85, 170, 0.6)",
        },
        linePoints: [],
        items: [],
        deleteMode: false,
        loading: true,
        showHeatMap: false,
        showObjects: true,
        heatMapData: [],
        category: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        setRedactorMode(state, mode) {
            state.redactorMode = mode;
        },
        setLineDraw(state, draw) {
            state.lineDraw = draw;
        },
        setLineObj(state, obj) {
            state.lineObj = obj;
        },
        setLinePoints(state, points) {
            state.linePoints = points
        },
        setCircleDraw(state, draw) {
            state.circleDraw = draw;
        },
        setLineStyle(state, style) {
            state.lineStyle = style;
        },
        setItems(state, items) {
            state.items = items
        },
        addItem(state, item) {
            state.items.push(item);
        },
        removeItem(state, index) {
            Vue.delete(state.items, index);
        },
        setDeleteMode(state, mode) {
            state.deleteMode = mode;
        },
        undoLinePoint(state) {
            if (state.linePoints.length >= 1) {
                state.linePoints.pop();
            }
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setHeatMapData(state, data) {
            state.heatMapData = data
        },
        setShowHeatMap(state, value) {
            state.showHeatMap = value;
        },
        setShowObjects(state, value) {
            state.showObjects = value;
        },
        setCategory(state, category) {
            state.category = category;
        }
    },
    actions: {
        async getItems(context, filter = {}) {
            let data = (await http.getList('Items', filter, true)).data;
            context.commit('setItems', data);
        },
        async getHeatMap(context, filter = {}) {
            let data = (await http.getList('HeatMap', filter, true)).data;
            context.commit('setHeatMapData', data);
        },
        async login(context, creds) {
            var username = creds.username;
            var password = creds.password;
            var reg_exp_mail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            var login_info = {
                email: username,
                password: password
            }
            if (username.match(reg_exp_mail) != null) {
                login_info = {
                    email: username,
                    password: password
                }
            } else {
                login_info = {
                    username: username,
                    password: password
                }
            }
            var status = false;
            try {
                await (Axios.post("/api/auth/login/", login_info));
                status = true;
            } catch (error) {
                var data = error.response.data;
                if (data.non_field_errors) {
                    Vue.showErrorModal(data.non_field_errors);
                } else {
                    var result = '';
                    for (var k in data) {
                        result += `${k}: ${data[k]}\n`
                    }
                    Vue.showErrorModal(result);
                }
            }
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
            await context.dispatch('checkAuth');
            return status;
        },
        async logout(context) {
            await Axios.post("/api/auth/logout/");
            context.commit('setAuthenticated', false);
            context.commit('setUser', {});
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
        },
        async checkAuth(context) {
            try {
                var result = await Axios.get("/api/auth/user/");
                if (result.status != 200) {
                    context.commit('setUser', {});
                    return
                }
                context.commit('setAuthenticated', true);
                context.commit('setUser', result.data);
                Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
            } catch (e) {
                context.commit('setUser', {});
            }
        },
    }
})

export default store;
