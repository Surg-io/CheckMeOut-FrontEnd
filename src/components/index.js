// src/components/index.js

/* 
src
|___components
    |___common
*/
export { default as Footer } from '@root/components/common/Footer';
export { default as Header } from '@root/components/common/Header';
export { default as Icon } from '@root/components/common/Icon';
export { default as Placeholder } from '@root/components/common/Placeholder';
export { default as DateOfBirthInput } from '@root/components/common/DOB'
/* 
    |___auth
*/
export { default as LoginForm } from '@root/components/auth/LoginForm'
export { default as RegisterForm } from '@root/components/auth/RegisterForm'

/* 
    |___home
*/
export { default as HomeMenu } from '@root/components/home/HomeMenu'

/* 
    |___dashboard
*/
export { default as DashboardMenu } from '@root/components/dashboard/DashboardMenu'
export { default as DashboardSider } from '@root/components/dashboard/DashboardSider'

/*
        |___reservation
*/
export { default as CombinedReservationMaker } from '@root/components/dashboard/reservation/CombinedReservationMaker'
export { default as LimitedDatePicker } from '@root/components/dashboard/reservation/LimitedDatePicker'
export { default as ScheduleDisplay } from '@root/components/dashboard/reservation/ScheduleDisplay'