import { Typography, Button } from "@mui/material";
import React from "react";
import MockAccountSidebar from "../../components/MockAccountSidebar";
import paymentMethods from "../../imgs/paymentMethods.png";
import SideDrawer from "../../components/SideDrawer";
import "./SupportUs.css";

export default function SupportUs() {
  return (
    <>
      <SideDrawer />
      <div className="supportUsPage">
        <div className="supportUs">
          <Typography variant="h4" fontWeight={"bold"}>
            Support Us
          </Typography>

          <Typography variant="subtitle1" className="supportDescription">
            Like many Open Source Software projects, we rely heavily on the
            support and donations from users like yourself. If you found this
            software useful, or you received help from a volunteer/team member,
            please feel free to say thank you with a donation:
          </Typography>

          <div className="paymentButtonCluster">
            <Button className="paymentButtons">$5</Button>
            <Button className="paymentButtons">$10</Button>
            <Button className="paymentButtons">$15</Button>
            <Button className="paymentButtons">$50</Button>
            <Button className="paymentButtons">$100</Button>
          </div>
          <div className="donateButtonCluster">
            <Button className="paymentButtons">Other Amount</Button>

            <img src={paymentMethods} width="30%" />
          </div>
        </div>
      </div>
    </>
  );
}
