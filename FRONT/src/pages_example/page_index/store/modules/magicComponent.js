import Vue from 'vue';
let state = {
    dataList: [],
    currentId: "",
    currentData: {},
};
let getters = {
    // currentComponent(state) {
    //     const res = findById(state.dataList, state.currentId);
    // },
    kankanid:(state, getters, roosState)=> {
        console.log(state);
        console.log(getters);
        console.log(roosState);
        return state.currentId;
        // return state.currentId
    }
};
let mutations = {
    setDataList(state, dataList) {
        state.dataList = dataList;
        // const res = findById(state.dataList, state.currentId);
        // if (res) {
        //     state.currentData = res.me;
        // } else {
        //     state.currentData = null;
        //     state.currentId = "";
        // }
    },
    setCurrentId(state, id) {
        state.currentId = id;
        // const res = findById(state.dataList, state.currentId);
        // if (res) {
        //     state.currentData = res.me;
        // } else {
        //     state.currentData = null;
        //     state.currentId = "";
        // }
    },
    addItem(state, newItem) {
        if (!state.currentData.list) {
            // 这里必须用 this.$set 来新增属性，不然就会出现 "数据变化了，但是渲染没有更新" 的问题
            Vue.set(state.currentData, "list", []);
            // this.currentData.list = [];
        }
        state.currentData.list.push(newItem);
    },
    deleteItem(state) {
        const res = findById(state.dataList, state.currentId);
        if (res) {
            res.siblings.splice(res.index, 1);
        } else {
            // 没找到
        }
    },
};
let actions = {};

const findById = (list, id) => {
    if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (item.id === id) {
                return { me: item, siblings: list, index: i };
            }
            const res = findById(item.list, id);
            if (res) {
                return res;
            }
        }
        return false;
    } else {
        return false;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}