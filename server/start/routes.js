'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.post('auth/register', 'UserController.register');
  Route.post('auth/login', 'UserController.login');

  Route.get('products', 'ProductController.index');
  Route.get('products/login', 'ProductController.indexAfterLogin').middleware('auth');
  Route.get('product/:id', 'ProductController.productById').middleware('auth');
  Route.post('product', 'ProductController.create').middleware('auth');
  Route.get('product/myproduct', 'ProductController.myProductIndex').middleware('auth');

  Route.get('basket','BasketController.index').middleware('auth');
  Route.get('basket/count','BasketController.countBasket').middleware('auth');
  Route.post('basket','BasketController.create').middleware('auth');
  Route.delete('basket/:id','BasketController.destroy').middleware('auth');

  Route.get('orders/count','OrderController.countOrders').middleware('auth');
  Route.get('orders/ready','OrderController.countReady').middleware('auth');
  Route.get('orders/orderstatus/group','OrderController.groupOrder').middleware('auth');
  Route.post('order','OrderController.createFromBasket').middleware('auth');
  Route.post('order/status','OrderController.changeStatus').middleware('auth');
  Route.get('orders','OrderController.index').middleware('auth');
  Route.get('order/:id','OrderController.detail').middleware('auth');
  Route.delete('order/:id','OrderController.destroy').middleware('auth');

  Route.get('province','ProvinceController.index').middleware('auth');
  Route.get('regency/:id','RegencyController.index').middleware('auth');
  Route.get('district/:id','DistrictController.index').middleware('auth');

  Route.get('profile','ProfileController.profileById').middleware('auth');
  Route.post('profile','ProfileController.create').middleware('auth');

  Route.get('order/:id','OrderController.orderById').middleware('auth');

  Route.get('projects', 'ProjectController.index').middleware('auth');
  Route.post('projects', 'ProjectController.create').middleware('auth');
  Route.delete('projects/:id', 'ProjectController.destroy').middleware('auth');
  Route.patch('projects/:id', 'ProjectController.update').middleware('auth');

  Route.get('projects/:id/tasks', 'TaskController.index').middleware('auth');
  Route.post('projects/:id/tasks', 'TaskController.create').middleware('auth');

  Route.delete('tasks/:id', 'TaskController.destroy').middleware('auth');
  Route.patch('tasks/:id', 'TaskController.update').middleware('auth');

  Route.get('accounts','AccountController.index').middleware('auth');
})
  .prefix('api');