import VueRouter from 'vue-router';
import store from './store';
import { 
  HomePage, 
  DefaultPage,
  AccountPage,
  AmountPage,
  MovementPasswordPage,
  MovementResultPage,
  BalancePasswordPage,
  BalanceResultPage
} from './pages';

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  }, 
  {
    path: '/balance',
    component: DefaultPage,
    children: [
      {
        path: '',
        component: AccountPage,
        name: 'balance'
      },
      {
        path: ':account/password',
        component: BalancePasswordPage,
        name: 'balance_password'
      },
      {
        path: ':account/result',
        component: BalanceResultPage,
        name: 'balance_result'
      }
    ]
  },
  {
    path: '/withdrawal',
    component: DefaultPage,
    children: [
      {
        path: '',
        component: AccountPage,
        name: 'withdrawal'
      },
      {
        path: ':account/amount',
        component: AmountPage,
        name: 'withdrawal_amount'
      },
      {
        path: ':account/password',
        component: MovementPasswordPage,
        name: 'withdrawal_password'
      },
      {
        path: ':account/result',
        component: MovementResultPage,
        name: 'withdrawal_result'
      }
    ]
  },
  {
    path: '/deposit',
    component: DefaultPage,
    children: [
      {
        path: '',
        component: AccountPage,
        name: 'deposit'
      },
      {
        path: ':account/amount',
        component: AmountPage,
        name: 'deposit_amount'
      },
      {
        path: ':account/password',
        component: MovementPasswordPage,
        name: 'deposit_password'
      },
      {
        path: ':account/result',
        component: MovementResultPage,
        name: 'deposit_result'
      }
    ]
  },
  {
    path: '/*',
    redirect: '/'
  }
];

const routesName = [ 'balance', 'withdrawal', 'deposit', 'home' ];

const router = new VueRouter({
  routes,
  mode: 'history',
  linkExactActiveClass: 'active'
})

const alertMessage = `Você não finalizou a ação atual. Deseja cancelar?`;

const changeAction = (action) => {
  store.commit('changeAction', {
    action: action,
    started: false,
    finished: false
  });
}

router.beforeEach((to, from, next) => {
  const { action, started, finished } = store.state.currentAction;
  
  if (routesName.includes(to.name)) {
    if (started && !finished && (action !== to.name) && !confirm(alertMessage)) {
      return;
    }

    changeAction(to.name);
  }

  next();
});

export default router;