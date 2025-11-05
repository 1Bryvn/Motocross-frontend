import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Homepage } from './pages/homepage/homepage';
import { Cruisers } from './pages/cruisers/cruisers';
import { SportBikes } from './pages/sport-bikes/sport-bikes';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component:MainLayout,
        children: [
            {path: '', component: Homepage},
            {path: 'cruisers', component: Cruisers},
            {path: 'sport-bikes', component: SportBikes},
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

