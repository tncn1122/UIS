
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import DepartmentPage from "./pages/department";
import MajorPage from "./pages/major";
import RoomPage from "./pages/room";
import SubjectPage from "./pages/subject";
import StudentPage from "./pages/student";
import TeacherPage from "./pages/teacher";
import Profile from "./pages/profile";
import SubjectDetail from "./pages/subject/detail";
import RollCallPage from "./pages/rollcall";



function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/departments" component={DepartmentPage} />
          <Route exact path="/majors" component={MajorPage} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rooms" component={RoomPage} />
          <Route exact path="/subjects" component={SubjectPage} />
          <Route exact path="/students" component={StudentPage} />
          <Route exact path="/teachers" component={TeacherPage} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/user/:id" component={Profile} />
          <Route exact path="/subject/:id/:semester" component={SubjectDetail} />
          <Route exact path="/reports/:id/:semester/status" component={RollCallPage} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
