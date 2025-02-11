// src/components/index.js

/* 
src
|___components
    |___common
*/
export { default as Footer } from "components/common/Footer";
export { default as Header } from "components/common/Header";
export { default as Icon } from "components/common/Icon";
export { default as Placeholder } from "components/common/Placeholder";
export { default as DateOfBirthInput } from "components/common/DOB";
/* 
    |___auth
*/
export { default as LoginForm } from "components/auth/LoginForm";
export { default as RegisterForm } from "components/auth/RegisterForm";

/* 
    |___home
*/
export { default as HomeMenu } from "components/home/HomeMenu";

/* 
    |___dashboard
*/
export { default as DashboardMenu } from "components/dashboard/DashboardMenu";
export { default as DashboardSider } from "components/dashboard/DashboardSider";

/*
        |___reservation
*/
export { default as CombinedReservationMaker } from "components/dashboard/reservation/CombinedReservationMaker";
export { default as LimitedDatePicker } from "components/dashboard/reservation/LimitedDatePicker";
export { default as ScheduleDisplay } from "components/dashboard/reservation/ScheduleDisplay";

/*
    |___History.js
*/
export { default as History } from "components/dashboard/History";
