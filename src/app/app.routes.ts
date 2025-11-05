import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Homepage } from './pages/homepage/homepage';
import { Cruisers } from './pages/cruisers/cruisers';
import { SportBikes } from './pages/sport-bikes/sport-bikes';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NgModule } from '@angular/core';
import { Models } from './pages/models/models';
import { Buildandprice } from './pages/buildandprice/buildandprice';
import { Shoppingtools } from './pages/shoppingtools/shoppingtools';
import { Newandevents } from './pages/newandevents/newandevents';

export const routes: Routes = [
    {
        path: '',
        component:MainLayout,
        children: [
            {path: '', component: Homepage},
            {path: 'cruisers', component: Cruisers},
            {path: 'sport-bikes', component: SportBikes},
             {path: 'models', component: Models},
              {path: 'buildandprice', component: Buildandprice},
               {path: 'shoppingtools', component: Shoppingtools},
                {path: 'newandevents', component: Newandevents},
        ]
    },
    {path: 'login', component: Login},
    {path: 'register', component: Register},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

