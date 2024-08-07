import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import DocumentPage from '@/views/DocumentPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/document/:id', component: DocumentPage, props: true },
  { path: '/document/new', component: DocumentPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
