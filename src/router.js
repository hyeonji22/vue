import { createWebHistory, createRouter } from "vue-router";
import boardList from './components/BoardList.vue';
import BoardDetail from './components/BoardDetail.vue';
import BoardWriter from './components/BoardWriter.vue';

const routes = [
  {
    path: "/",
    component: boardList,
  },
  {
    path: "/board/:page",
    component: boardList,
  },
  {
    path: "/detail/:id/:page",
    component: BoardDetail,
  },
  {
    path: "/writer",
    component: BoardWriter,
  },
  {
    path: "/writer/:id",
    component: BoardWriter,
  }
  
  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 