import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// Login Section
import Login from "./Component/Login/index";
import Invoice from "./Component/Invoice/Invoice";
import LoginForm from "./Component/Admin/LoginForm/index";
import Subscriptions from "./Component/Admin/Subscriptions/index";
// Admin Section
import Header from "./Component/Admin/Header/index";
import SideBar from "./Component/Admin/Sidebar/index";
import ClientList from "./Component/Admin/ClientList/index";
import AddClient from "./Component/Admin/AddNewClient/index";
import ViewClient from "./Component/Admin/ViewClient/index";
import EditClient from "./Component/Admin/EditClient/index";
import Footer from "./Component/Admin/Footer/index";
import DNAForm from "./Component/Admin/DNAForm/index";
import EditDNAForm from "./Component/Admin/EditDNAForm/index";
import EditOtherForm from "./Component/Admin/EditOtherForm/index";
import InvoicesListView from "./Component/Admin/InvoicesListView/index";



// Customer Section
import CustomerForm from "./Component/Customer/CustomerForm/index";
import HomeScreen from "./Component/Customer/HomeScreen/index";



// CPUC Forms
import CpucOwnerEnrollment from "./Component/Customer/CpucOwnerEnrollment/index";
import TcpForm from "./Component/Customer/TcpForm/index";
import NewTcp from "./Component/Customer/NewTcp/index";
import TransferTCP from "./Component/Customer/TransferTCP/index";
import RenewalTCP from "./Component/Customer/RenewalTCP/index";
import DeficiencyLetter from "./Component/Customer/DeficiencyLetter/index";
import MoreAssistance from "./Component/Customer/MoreAssistance/index";


// DOT Forms

// import DotOwnerEnrollment from "./Component/Customer/DotOwnerEnrollment/index";
import DotOwnerEnrollment from "./Component/Customer/DotOwnerEnrollment/index";

import Acknowledgement from "./Component/Customer/Acknowledgement/index";

// DNA Forms
import DnaHome from "./Component/Customer/Dna/DnaHome/index"; 
import MaternityOther from "./Component/Customer/Dna/DnaHome/Maternity";
import Paternity from "./Component/Customer/Dna/Paternity/index";
import Immigration from "./Component/Customer/Dna/Immigration/index";
import Passport from "./Component/Customer/Dna/Passport/index";
import Infidelity from "./Component/Customer/Dna/Infidelity/index";
import DnaOther from "./Component/Customer/Dna/Others/DnaOther/index";
import Maternity from "./Component/Customer/Dna/Others/Maternity/index";
import Avuncular from "./Component/Customer/Dna/Others/Avuncular/index";
import Grandparentage from "./Component/Customer/Dna/Others/Grandparentage/index";
import Siblingship from "./Component/Customer/Dna/Others/Siblingship/index";
import Taxi from "./Component/Customer/Taxi/index";
import PersonalTest from "./Component/Customer/Personal/index";
import USCoastGuard from "./Component/Customer/USCG/index";
import Alc from "./Component/Customer/ALC/index";
import Lando from "./Component/Customer/Lando/index";

// PDF Link
import LandoPDF from "./Component/Customer/Lando/view-pdf";
import TaxiPDF from "./Component/Customer/Taxi/view-pdf";
import PersonalPDF from "./Component/Customer/Personal/view-pdf";
import USCGPDF from "./Component/Customer/USCG/view-pdf";
import ALCPDF from "./Component/Customer/ALC/view-pdf";
import CPUCPDF from "./Component/Customer/CpucOwnerEnrollment/view-pdf";
import DOTPDF from "./Component/Customer/DotOwnerEnrollment/view-pdf";
import DNAPDF from "./Component/Customer/Dna/DnaHomePDF/index";
import ACKPDF from "./Component/Customer/Acknowledgement/view-pdf";
import GrandParentageOther from "./Component/Customer/Dna/DnaHome/grandparentage";
import AvuncularOther from "./Component/Customer/Dna/DnaHome/avancular";
import ImmigrationOther from "./Component/Customer/Dna/DnaHome/immigration";
import SibblingShipOther from "./Component/Customer/Dna/DnaHome/sibblingship";
import InfidelityOther from "./Component/Customer/Dna/DnaHome/infidelity";
import PassportOther from "./Component/Customer/Dna/DnaHome/passport";


class App extends Component {
  render() {
    const Layout = ({ children }) => (
      <div className="container-fluid page-body-wrapper">
        <SideBar />
        <div className="main-panel">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            {/* <div className="backImage"> */}
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/" component={CustomerForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route path="/customer" component={HomeScreen} />
            <Route path="/invoice" component={Invoice} />
            <Route path="/cpuc-owner-enrollment" component={CpucOwnerEnrollment}/>
            <Route path="/tcp-form/:id" component={TcpForm} />
            <Route path="/new-tcp/:id" component={NewTcp} />
            <Route path="/transfer-tcp/:id" component={TransferTCP} />
            <Route path="/renewal-tcp/:id" component={RenewalTCP} />
            <Route path="/deficiency-letter" component={DeficiencyLetter} />
            <Route path="/more-assistance" component={MoreAssistance} />
            <Route path="/dot-owner-enrollment" component={DotOwnerEnrollment} />
            <Route path="/acknowledgement" component={Acknowledgement} />
            <Route path="/dna_home" component={DnaHome} />
            <Route path="/paternity" component={Paternity} />
            <Route path="/immigration" component={Immigration} />
            <Route path="/infidelity" component={Infidelity} />
            <Route path="/passport" component={Passport} />
            <Route path="/dnaother" component={DnaOther} />
            <Route path="/maternity" component={Maternity} />
            <Route path="/avuncular" component={Avuncular} />
            <Route path="/grandparentage" component={Grandparentage} />
            <Route path="/siblingship" component={Siblingship} />
            <Route path="/taxi" component={Taxi} />
            <Route path="/personal_test" component={PersonalTest} />
            <Route path="/uscg" component={USCoastGuard} />
            <Route path="/alc" component={Alc} />
            <Route path="/lando" component={Lando} />

            {/* PDF Link */}
            <Route exact path="/lando-pdf/:id" render={(props) => (<LandoPDF {...props} />)}/>
            <Route path="/taxi-pdf/:id" component={TaxiPDF} />
            <Route path="/personal-pdf/:id" component={PersonalPDF} />
            <Route path="/uscg-pdf/:id" component={USCGPDF} />
            <Route path="/alc-pdf/:id" component={ALCPDF} />
            <Route path="/cpuc-pdf/:id" component={CPUCPDF} />
            <Route path="/dot-pdf/:id" component={DOTPDF} />
            <Route path="/ack-pdf/:id" component={ACKPDF} />
            <Route path="/pdf/:subtype/:id" component={DNAPDF} />
            {/* </div> */}
            <Layout>
              <Route exact path="/admin" component={ClientList} />
              <Route exact path="/invoices-list-view" component={InvoicesListView} />
              <Route exact path="/invoices-list" component={InvoicesListView} />
              <Route path="/admin/view-invoice/:id" component={Invoice} />
              <Route path="/admin/edit-invoice/:id" component={Invoice} />
              <Route path="/admin/view-client/:id" component={ViewClient} />
              <Route path="/admin/edit-client/:id" component={EditClient} />
              <Route path="/admin/add-new-client" component={AddClient} />
              <Route path="/admin/dnaForm/:formSubtype/:id" component={DNAForm} />
              <Route path="/admin/editdnaForm/:formSubtype/:id" component={EditDNAForm} />
              <Route path="/admin/edit/:formType/:id" component={EditOtherForm} />
              <Route path="/maternityForm" component={MaternityOther} />
              <Route path="/grandparentage" component={GrandParentageOther} />
              <Route path="/avuncularOther" component={AvuncularOther} />
              <Route path="/immigrationOther" component={ImmigrationOther} />
              <Route path="/SibblingShipOther" component={SibblingShipOther} />
              <Route path="/InfidelityOther" component={InfidelityOther} />
              <Route path="/PassportOther" component={PassportOther} />
              <Route path="/subscriptions" component={Subscriptions} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
