import { Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'student',
        component: StudentComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forgetpassword',
        component: ForgetpasswordComponent,
    }
];
